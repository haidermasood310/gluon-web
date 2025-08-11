"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import supabase from "@/config/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { showError } from "@/hooks/useToastMessages";

export default function SuccessPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [first, setFirst] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const { user, setUser, selectedTier, setSelectedTier } = useAuthStore();

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/get-checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then(({ session, subscription }) => {
          setSession(session);
          setSubscription(subscription);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId]);

  const updateUser = async () => {
    const validUntilUnix = subscription.items.data[0]?.current_period_end;
    const validUntil = validUntilUnix
      ? new Date(validUntilUnix * 1000).toISOString()
      : null;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ tier: selectedTier?.id })
      .eq("id", user?.id);

    const { error: paymentError } = await supabase.from("payments").insert([
      {
        profile_id: user?.id,
        tier_id: selectedTier?.id,
        paid: true,
        transaction: session.subscription,
        valid_until: validUntil,
      },
    ]);

    if (updateError && !updateError.message.includes("duplicate")) {
      showError(updateError.message);
      return null;
    }

    if (paymentError) {
      showError(paymentError.message);
      return null;
    }

    if (!updateError && !paymentError) {
      setUser({ tier: selectedTier?.id });
      setSelectedTier(null);

      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  };

  useEffect(() => {
    if (session?.id && first) {
      setFirst(false);
      updateUser();
    }
  }, [session]);

  if (!session) return <Loader />;

  return (
    <div className={"flex flex-col text-center justify-center p-[24px]"}>
      <p className={"font-medium"}>Payment Successful!</p>
      <p className={"mt-[4px]"}>Redirecting...</p>
    </div>
  );
}
