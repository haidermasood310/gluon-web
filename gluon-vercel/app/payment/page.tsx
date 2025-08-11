"use client";

import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";
import { showError, showSuccess } from "@/hooks/useToastMessages";
import { Tier } from "@/lib/type";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/constants";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export default function PaymentPage() {
  const { selectedTier, setSelectedTier } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState<string | null>(null);
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>([]);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            { price: selectedTier?.price_id, quantity: 1 }, // Replace with your price ID
          ],
          ...(validPromo && promo && { promo: validPromo }),
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTiers = async () => {
    const { data, error } = await supabase
      .from("tiers")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      showError(error.message);
      return null;
    }

    if (data) setTiers(data);
  };

  const handleApplyPromo = async () => {
    setValidPromo(null);

    if (promo) {
      setLoadingPromo(true);

      const { data: promoCodes } = await stripe.promotionCodes.list({
        code: promo, // Filter by the promo code name
      });

      setLoadingPromo(false);

      if (promoCodes.length > 0) {
        const promoCode = promoCodes[0];
        console.log("Promo Code:", promoCode);
        setValidPromo(promoCode.id);
        showSuccess("Promo code applied!");
      } else {
        console.error("No valid promo code found for:", promo);
        setValidPromo(null);
        showError("Invalid promo code!");
      }
    } else {
      showError("Enter promo code!");
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchTiers().finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={"w-full h-full flex flex-col items-center gap-[24px] p-[24px]"}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <p className={"font-medium text-[24px]"}>
            Choose a plan to move forward
          </p>

          <p className={"text-[14px]"}>
            <a
              href={"https://www.getgluon.ai/pricing"}
              target={"_blank"}
              className={"underline text-content-accent-a"}
            >
              Click here
            </a>{" "}
            for more information about each plan.
          </p>

          <div
            className={
              "grid grid-cols-3 gap-[12px] w-full my-[36px] max-w-[1200px]"
            }
          >
            {tiers.map((tier, index) => (
              <div
                key={tier.id}
                onClick={() => {
                  if (index === 0) setSelectedTier(tier);
                }}
                className={cn(
                  "col-span-3 sm:col-span-1 border rounded-[10px] p-[12px] cursor-pointer w-full",
                  index > 0
                    ? "cursor-not-allowed opacity-50"
                    : selectedTier?.id === tier.id
                      ? "border-2 border-border-accent-a"
                      : "hover:border-background-accent-a-disabled",
                )}
              >
                <p className={"text-[18px] font-medium"}>{tier.name}</p>
                <p className={"mt-[12px]"}>
                  ${tier.price}{" "}
                  <span className={"text-[12px] text-black/50"}>/MONTH</span>
                </p>
              </div>
            ))}
          </div>

          <div
            className={"flex flex-col gap-[6px] items-center justify-center"}
          >
            <p>Got a promo code?</p>

            <div className={"flex gap-[6px] items-center justify-center"}>
              <Input value={promo} onChange={(e) => setPromo(e.target.value)} />

              <Button
                variant={"outline"}
                onClick={handleApplyPromo}
                loading={loadingPromo}
              >
                Apply
              </Button>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={!selectedTier?.id}
            className={"min-w-[300px] mt-[40px]"}
          >
            {loading ? "Redirecting..." : "Checkout"}
          </Button>
        </>
      )}
    </div>
  );
}
