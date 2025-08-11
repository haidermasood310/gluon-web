import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { STRIPE_SECRET_KEY } from "@/constants";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    let subscription = null;
    if (session.subscription) {
      subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
    }

    return NextResponse.json({ session, subscription });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
