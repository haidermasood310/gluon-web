import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { STRIPE_SECRET_KEY } from "@/constants";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Missing amount or currency" },
        { status: 400 },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
