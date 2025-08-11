"use client";

import { useAppStore } from "@/store/useAppStore";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import queryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/loader";
import supabase from "@/config/supabaseClient";
import { showError } from "@/hooks/useToastMessages";
import { isBefore } from "date-fns";
import useUser from "@/hooks/useUser";

export default function Content({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { sidebarOpen } = useAppStore();
  const { user, token, setAccessToken, setUser, setUserTier } = useAuthStore();
  const { logout } = useUser();
  const pathname = usePathname();
  const isAuth = ["/login", "/register"].includes(pathname);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setAccessToken(storedToken ?? null);

    if (!isAuth && !storedToken) {
      router.replace("/login");
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not authenticated", userError);
        logout();
        return;
      }

      console.log("Current user ID:", user.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileError) {
        showError(profileError.message);
        return null;
      }

      setUser(profile);

      if (profile?.tier) {
        const { data: currentTier, error: tierError } = await supabase
          .from("tiers")
          .select("*")
          .eq("id", profile?.tier)
          .single();

        if (tierError) {
          showError(tierError.message);
          return null;
        }

        setUserTier(currentTier);
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();

      if (isAuth) {
        router.replace("/");
      }
    }
  }, [token]);

  const checkUserPayment = async () => {
    const { data: lastPayment, error } = await supabase
      .from("payments")
      .select("*")
      .eq("profile_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const isValid =
      !!lastPayment &&
      lastPayment.paid &&
      isBefore(new Date(), new Date(lastPayment.valid_until));

    if ((!isValid || error) && !pathname.includes("payment")) {
      router.replace("/payment");
    } else if (pathname.includes("payment") && !error && isValid) {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (token && user?.id) {
      if (!user.tier && !pathname.includes("payment/success")) {
        router.replace("/payment");
      } else {
        checkUserPayment();
      }
    }
  }, [user]);

  if (!token && !isAuth) {
    return (
      <div className={"flex h-[100vh] w-full"}>
        <Loader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={"flex h-[100vh]"}>
        {!isAuth && (
          <div className={sidebarOpen ? "absolute z-10" : ""}>
            <Sidebar />
          </div>
        )}

        {isAuth ? (
          <div className={"flex h-full w-full"}>{children}</div>
        ) : (
          <div
            className={cn(
              "overflow-y-scroll flex flex-col w-content lg:w-content-lg scroll-container",
              sidebarOpen ? "pointer-events-none blur-sm transition-all" : "",
            )}
          >
            <div
              className={
                "w-full h-full overflow-y-scroll scroll-container mt-[60px]"
              }
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
