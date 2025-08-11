import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { APP_URL, STRIPE_SECRET_KEY } from "@/constants";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { items, promo } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: { price: string; quantity: number }) => ({
        price: item.price,
        quantity: item.quantity,
      })),
      mode: "subscription",
      success_url: `${APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/payment/cancel`,
      ...(promo && { discounts: [{ promotion_code: promo }] }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
