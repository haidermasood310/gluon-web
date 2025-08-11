import os
import logging
import json
from typing import Optional, Dict, Any, Union
import stripe as stripe_lib
from fastapi import FastAPI, Request, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

# Set up detailed logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://gluon-website-f90f1.web.app",
        "http://app.getgluon.ai",
        "https://app.getgluon.ai",
        "https://www.getgluon.ai",
        "https://gluon-frontend-laiba.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Environment setup
# ---------------------------------------------------------------------------
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY")
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Log environment configuration (without sensitive values)
logger.info(f"STRIPE_API_KEY configured: {'Yes' if STRIPE_API_KEY else 'No'}")
logger.info(f"STRIPE_WEBHOOK_SECRET configured: {'Yes' if STRIPE_WEBHOOK_SECRET else 'No'}")
logger.info(f"SUPABASE_URL configured: {'Yes' if SUPABASE_URL else 'No'}")
logger.info(f"SUPABASE_KEY configured: {'Yes' if SUPABASE_KEY else 'No'}")

# Initialize clients
if STRIPE_API_KEY:
    stripe_lib.api_key = STRIPE_API_KEY
else:
    logger.error("STRIPE_API_KEY not set. Stripe functionality will not work.")

if not STRIPE_WEBHOOK_SECRET:
    logger.warning("STRIPE_WEBHOOK_SECRET not set. Webhook signature verification will be disabled.")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {str(e)}")
    supabase = None

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
def get_id_from_event_data(event_data):
    """Extract ID from event data safely."""
    if isinstance(event_data, dict):
        return event_data.get('id')
    return getattr(event_data, 'id', None)

def get_subscription_id_from_event_data(event_data):
    """Extract subscription ID from event data."""
    if isinstance(event_data, dict):
        return event_data.get('subscription')
    return getattr(event_data, 'subscription', None)

def get_checkout_session_id_from_event_data(event_data):
    """Try to extract checkout session ID from various locations in event data."""
    if not event_data:
        return None
        
    # For checkout.session.completed events
    if isinstance(event_data, dict):
        if event_data.get('object') == 'checkout.session':
            return event_data.get('id')
            
        # Try to find in metadata
        metadata = event_data.get('metadata', {})
        if metadata and isinstance(metadata, dict):
            return metadata.get('checkout_session_id')
            
        # Try to find in payment intent
        if 'payment_intent' in event_data:
            payment_intent = event_data.get('payment_intent', {})
            if isinstance(payment_intent, dict) and 'metadata' in payment_intent:
                return payment_intent.get('metadata', {}).get('checkout_session_id')
    
    return None

def determine_subscription_status(event_type, event_data):
    """Determine subscription status based on event type and data."""
    if event_type == 'customer.subscription.deleted':
        return 'inactive'
    
    # For updated events, check the actual status
    if event_type == 'customer.subscription.updated':
        status = event_data.get('status') if isinstance(event_data, dict) else getattr(event_data, 'status', '')
        return 'active' if status in ['active', 'trialing'] else 'inactive'
    
    if event_type == 'customer.subscription.paused':
        return 'paused'
    
    # Default for created, resumed, etc.
    return 'active'

def find_payment_by_subscription_id(subscription_id):
    """Find payment record by subscription ID."""
    if not subscription_id or not supabase:
        return None
    
    try:
        logger.info(f"Looking for payment record with transaction: {subscription_id}")
        response = supabase.table('payments').select('*') \
                          .eq('transaction', subscription_id) \
                          .execute()
        
        if response.data and len(response.data) > 0:
            logger.info(f"Found payment record with ID: {response.data[0].get('id')}")
            return response.data[0]
        
        return None
    except Exception as e:
        logger.error(f"Error finding payment by subscription ID: {str(e)}")
        return None

def find_payment_by_checkout_session_id(checkout_session_id):
    """Find payment record by checkout session ID."""
    if not checkout_session_id or not supabase:
        return None
    
    try:
        logger.info(f"Looking for payment record with checkout session ID: {checkout_session_id}")
        response = supabase.table('payments').select('*') \
                          .eq('transaction', checkout_session_id) \
                          .execute()
        
        if response.data and len(response.data) > 0:
            logger.info(f"Found payment record with ID: {response.data[0].get('id')}")
            return response.data[0]
        
        return None
    except Exception as e:
        logger.error(f"Error finding payment by checkout session ID: {str(e)}")
        return None

def find_payment_by_customer_id(customer_id):
    """Find payment record by customer email from Stripe customer data."""
    if not customer_id or not supabase:
        return None
    
    try:
        # Since we don't have stripe_customer_id in profiles,
        # we need to get the customer details from Stripe first
        logger.info(f"Looking up Stripe customer: {customer_id}")
        try:
            customer = stripe_lib.Customer.retrieve(customer_id)
            customer_email = customer.get('email')
            
            if not customer_email:
                logger.warning(f"No email found for Stripe customer: {customer_id}")
                return None
                
            logger.info(f"Found customer email: {customer_email}")
        except Exception as e:
            logger.error(f"Error retrieving Stripe customer: {str(e)}")
            return None
        
        # Now look up profile by email
        logger.info(f"Looking for profile with email: {customer_email}")
        response = supabase.table('profiles').select('id') \
                          .eq('email', customer_email) \
                          .execute()
        
        if not response.data or len(response.data) == 0:
            logger.warning(f"No profile found with email: {customer_email}")
            return None
            
        profile_id = response.data[0].get('id')
        logger.info(f"Found profile with ID: {profile_id}")
        
        # Get the most recent payment for this profile
        payment_response = supabase.table('payments').select('*') \
                                  .eq('profile_id', profile_id) \
                                  .order('created_at', desc=True) \
                                  .limit(1) \
                                  .execute()
                                  
        if payment_response.data and len(payment_response.data) > 0:
            logger.info(f"Found payment record with ID: {payment_response.data[0].get('id')}")
            return payment_response.data[0]
            
        logger.warning(f"No payment records found for profile: {profile_id}")
        return None
    except Exception as e:
        logger.error(f"Error finding payment by customer ID: {str(e)}")
        return None

def update_payment_with_subscription_id(payment_id, subscription_id):
    """Update payment record to store subscription ID."""
    if not payment_id or not subscription_id or not supabase:
        return False
        
    try:
        logger.info(f"Updating payment {payment_id} with subscription ID {subscription_id}")
        response = supabase.table('payments').update({
            'transaction': subscription_id
        }).eq('id', payment_id).execute()
        
        if response.data and len(response.data) > 0:
            logger.info(f"Successfully updated payment with subscription ID")
            return True
            
        logger.warning(f"Update operation did not return data")
        return False
    except Exception as e:
        logger.error(f"Error updating payment with subscription ID: {str(e)}")
        return False

def update_subscription_status(payment_id, profile_id, status, tier_id=None):
    """Update the subscription status in the database."""
    if not supabase:
        logger.error("Supabase client not initialized")
        return False
    
    try:
        # Convert status to paid boolean
        is_paid = status in ['active', 'trialing']
        
        logger.info(f"Updating payment {payment_id} for profile {profile_id} to paid={is_paid}")
        
        # Update the payment record
        update_response = supabase.table('payments').update({
            'paid': is_paid
        }).eq('id', payment_id).execute()
        
        if update_response.data:
            logger.info(f"Successfully updated payment record: {update_response.data}")
        else:
            logger.warning(f"Payment update returned no data: {update_response}")
        
        # Optionally update the profile tier if needed
        if not is_paid and tier_id:
            # Find the free tier if you have one
            free_tier_response = supabase.table('tiers').select('id') \
                                        .eq('name', 'Free') \
                                        .execute()
            
            free_tier_id = None
            if free_tier_response.data and len(free_tier_response.data) > 0:
                free_tier_id = free_tier_response.data[0]['id']
                logger.info(f"Found free tier: {free_tier_id}")
            
            # Update the profile with free tier if available
            if free_tier_id:
                logger.info(f"Downgrading profile {profile_id} to free tier {free_tier_id}")
                profile_update_response = supabase.table('profiles').update({
                    'tier': free_tier_id
                }).eq('id', profile_id).execute()
                
                if profile_update_response.data:
                    logger.info(f"Successfully updated profile tier: {profile_update_response.data}")
                else:
                    logger.warning(f"Profile tier update returned no data: {profile_update_response}")
        
        return True
    except Exception as e:
        logger.error(f"Error updating subscription status: {str(e)}")
        return False

# ---------------------------------------------------------------------------
# Webhook handler
# ---------------------------------------------------------------------------
@app.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: Optional[str] = Header(None)):
    """
    Handle Stripe webhook events, particularly subscription lifecycle events.
    """
    # Get the request body
    payload = await request.body()
    payload_str = payload.decode("utf-8")
    
    # Log the raw payload for debugging (truncated to avoid huge logs)
    truncated_payload = payload_str[:500] + "..." if len(payload_str) > 500 else payload_str
    logger.info(f"Received webhook payload: {truncated_payload}")
    
    # Verify webhook signature if secret is configured
    event = None
    if STRIPE_WEBHOOK_SECRET and stripe_signature:
        try:
            event = stripe_lib.Webhook.construct_event(
                payload=payload_str,
                sig_header=stripe_signature,
                secret=STRIPE_WEBHOOK_SECRET
            )
            logger.info(f"Signature verified for event: {event.type}")
        except Exception as e:
            logger.error(f"Webhook signature verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid signature")
    else:
        # If no secret is configured, parse the event without verification
        try:
            event = json.loads(payload_str)
            logger.info(f"Parsed event without verification: {event.get('type')}")
        except json.JSONDecodeError:
            logger.error("Invalid JSON payload")
            raise HTTPException(status_code=400, detail="Invalid payload")
    
    # Extract event type and data
    if isinstance(event, dict):
        event_type = event.get('type')
        event_data = event.get('data', {}).get('object', {})
    else:
        event_type = event.type
        event_data = event.data.object
    
    logger.info(f"Processing Stripe webhook event: {event_type}")
    logger.info(f"Event data object ID: {get_id_from_event_data(event_data)}")
    
    # Extract status if available
    status = None
    if isinstance(event_data, dict) and 'status' in event_data:
        status = event_data.get('status')
    elif hasattr(event_data, 'status'):
        status = event_data.status
    logger.info(f"Event data object status: {status}")
    
    # CHECKOUT SESSION COMPLETED - Map checkout session to subscription
    if event_type == 'checkout.session.completed':
        session_id = get_id_from_event_data(event_data)
        subscription_id = get_subscription_id_from_event_data(event_data)
        
        if session_id and subscription_id:
            logger.info(f"Checkout session completed: session={session_id}, subscription={subscription_id}")
            # Find the payment with checkout session ID
            payment = find_payment_by_checkout_session_id(session_id)
            
            if payment:
                payment_id = payment.get('id')
                # Update it with subscription ID
                updated = update_payment_with_subscription_id(payment_id, subscription_id)
                if updated:
                    logger.info(f"Successfully updated payment {payment_id} with subscription ID {subscription_id}")
                else:
                    logger.error(f"Failed to update payment with subscription ID")
            else:
                logger.warning(f"No payment found with checkout session ID {session_id}")
    
    # SUBSCRIPTION EVENTS - Handle status changes
    elif event_type in [
        'customer.subscription.deleted',
        'customer.subscription.updated',
        'customer.subscription.created',
        'customer.subscription.paused',
        'customer.subscription.resumed',
        'customer.subscription.trial_will_end'
    ]:
        subscription_id = get_id_from_event_data(event_data)
        logger.info(f"Processing subscription event for subscription ID: {subscription_id}")
        
        # Try to find payment by subscription ID
        payment_record = find_payment_by_subscription_id(subscription_id)
        
        # If not found, try to find by checkout session in expanded data or metadata
        if not payment_record:
            checkout_session_id = get_checkout_session_id_from_event_data(event_data)
            if checkout_session_id:
                logger.info(f"Found checkout session ID in event: {checkout_session_id}")
                payment_record = find_payment_by_checkout_session_id(checkout_session_id)
        
        # If still not found, try by customer ID
        if not payment_record and isinstance(event_data, dict) and 'customer' in event_data:
            customer_id = event_data.get('customer')
            logger.info(f"Trying to find payment by customer ID: {customer_id}")
            payment_record = find_payment_by_customer_id(customer_id)
        
        # If payment record found, update its status
        if payment_record:
            profile_id = payment_record.get('profile_id')
            payment_id = payment_record.get('id')
            tier_id = payment_record.get('tier_id')
            
            logger.info(f"Found payment record: ID={payment_id}, profile_id={profile_id}, tier_id={tier_id}")
            
            # Determine new status
            new_status = determine_subscription_status(event_type, event_data)
            logger.info(f"Determined status: {new_status}")
            
            # Update the database
            success = update_subscription_status(payment_id, profile_id, new_status, tier_id)
            if success:
                logger.info(f"Updated subscription status to {new_status} for profile {profile_id}")
                
                # Also update transaction field if it's not already the subscription ID
                if payment_record.get('transaction') != subscription_id:
                    updated = update_payment_with_subscription_id(payment_id, subscription_id)
                    if updated:
                        logger.info(f"Updated transaction field to subscription ID")
            else:
                logger.error(f"Failed to update subscription status for profile {profile_id}")
        else:
            logger.error(f"No payment record found for subscription {subscription_id}")
    
    # INVOICE EVENTS - Handle payment outcomes
    elif event_type in ['invoice.payment_failed', 'invoice.payment_succeeded']:
        # Extract subscription ID from invoice
        subscription_id = get_subscription_id_from_event_data(event_data)
        billing_reason = None
        
        if isinstance(event_data, dict):
            billing_reason = event_data.get('billing_reason')
        elif hasattr(event_data, 'billing_reason'):
            billing_reason = event_data.billing_reason
            
        logger.info(f"Processing invoice event: type={event_type}, subscription_id={subscription_id}, billing_reason={billing_reason}")
        
        if subscription_id:
            # Find payment record by subscription ID
            payment_record = find_payment_by_subscription_id(subscription_id)
            
            if payment_record:
                profile_id = payment_record.get('profile_id')
                payment_id = payment_record.get('id')
                tier_id = payment_record.get('tier_id')
                
                logger.info(f"Found payment record: ID={payment_id}, profile_id={profile_id}")
                
                # Update based on event type
                if event_type == 'invoice.payment_failed':
                    # Only mark as inactive if it's a recurring payment (not the first one)
                    if billing_reason == 'subscription_cycle':
                        status = 'inactive'
                        success = update_subscription_status(payment_id, profile_id, status, tier_id)
                        if success:
                            logger.info(f"Marked subscription as inactive (paid=false) for profile {profile_id} due to payment failure")
                        else:
                            logger.error(f"Failed to update subscription status for profile {profile_id}")
                
                elif event_type == 'invoice.payment_succeeded':
                    # If payment succeeded, make sure status is active
                    status = 'active'
                    success = update_subscription_status(payment_id, profile_id, status, tier_id)
                    if success:
                        logger.info(f"Confirmed active status (paid=true) for subscription of profile {profile_id}")
            else:
                logger.warning(f"No payment record found for subscription {subscription_id}")
        else:
            logger.info(f"Invoice not related to a subscription")
    
    # Other event types
    else:
        logger.info(f"Event type {event_type} not specifically handled by this webhook")
    
    return {"status": "success"}

# ---------------------------------------------------------------------------
# Simplified test webhook for direct database updates
# ---------------------------------------------------------------------------
@app.post("/webhook-test")
async def test_webhook(request: Request):
    """Simplified webhook handler for testing that directly updates the database."""
    try:
        # Get the request body
        payload = await request.body()
        payload_str = payload.decode("utf-8")
        
        # Log the payload
        logger.info(f"Received test webhook: {payload_str}")
        
        # Parse the event
        event = json.loads(payload_str)
        
        # Extract the transaction ID - handle different possible formats
        transaction_id = None
        if 'data' in event and 'object' in event['data']:
            transaction_id = event['data']['object'].get('id')
        elif 'id' in event:
            transaction_id = event.get('id')
        
        logger.info(f"Extracted transaction ID: {transaction_id}")
        
        if not transaction_id:
            return {"status": "error", "message": "No transaction ID found in payload"}
        
        # Find the payment record
        payment_record = find_payment_by_checkout_session_id(transaction_id)
        if not payment_record:
            payment_record = find_payment_by_subscription_id(transaction_id)
            
        if not payment_record:
            return {"status": "error", "message": f"No payment record found for transaction {transaction_id}"}
        
        payment_id = payment_record.get('id')
        profile_id = payment_record.get('profile_id')
        tier_id = payment_record.get('tier_id')
        
        logger.info(f"Found payment record: ID={payment_id}, profile_id={profile_id}")
        
        # Direct database update - set paid to false
        if supabase:
            update_response = supabase.table('payments').update({
                'paid': False
            }).eq('id', payment_id).execute()
            
            logger.info(f"Update response: {update_response}")
            
            return {
                "status": "success", 
                "message": "Payment updated to inactive",
                "payment_id": payment_id,
                "profile_id": profile_id
            }
        else:
            return {"status": "error", "message": "Supabase client not initialized"}
            
    except json.JSONDecodeError:
        logger.error("Invalid JSON in webhook test payload")
        return {"status": "error", "message": "Invalid JSON payload"}
    except Exception as e:
        logger.error(f"Error in test webhook: {str(e)}")
        return {"status": "error", "message": str(e)}

# ---------------------------------------------------------------------------
# Health check and info endpoints
# ---------------------------------------------------------------------------
@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    stripe_status = "available" if STRIPE_API_KEY else "not configured"
    supabase_status = "available" if supabase else "not connected"
    
    return {
        "status": "healthy",
        "services": {
            "stripe": stripe_status,
            "supabase": supabase_status
        }
    }

@app.get("/debug-info")
async def debug_info():
    """Provide debugging information about the environment."""
    return {
        "stripe_configured": bool(STRIPE_API_KEY),
        "webhook_secret_configured": bool(STRIPE_WEBHOOK_SECRET),
        "supabase_configured": bool(SUPABASE_URL and SUPABASE_KEY),
        "supabase_connected": supabase is not None
    }

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    
    # Use PORT environment variable if available, otherwise default to 8081
    port = int(os.getenv("PORT", 8081))
    logger.info(f"Starting webhook server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)