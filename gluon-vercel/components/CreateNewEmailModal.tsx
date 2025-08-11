"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailStore } from "@/store/useEmailStore";
import { showError } from "@/hooks/useToastMessages";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import supabase from "@/config/supabaseClient";
import Loader from "@/components/ui/loader";

type Props = {
  handleClose: () => void;
};

export default function CreateNewEmailModal({ handleClose }: Props) {
  const router = useRouter();
  const { campaign, projectName, setProjectName } = useEmailStore();
  const { user, userTier } = useAuthStore();
  const [canCreateEmail, setCanCreateEmail] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleCreate = () => {
    if (projectName) {
      handleClose();
      router.push(`/campaigns/${campaign?.id}/new-email`);
    } else {
      showError("Please enter a name!");
    }
  };

  const checkEmailsCreated = async () => {
    const now = new Date();
    const startOfThisMonth = startOfMonth(now).toISOString();
    const endOfThisMonth = endOfMonth(now).toISOString();

    const { error, count } = await supabase
      .from("projects")
      .select("*", { count: "exact" }) // Include the count of matching rows
      .eq("profile_id", user?.id)
      .gte("created_at", startOfThisMonth)
      .lte("created_at", endOfThisMonth);

    if (error) {
      console.error("Error fetching project count:", error.message);
      return null;
    }

    setLoading(false);
    if (count) {
      setCanCreateEmail(
        userTier?.emails_allowed ? count < userTier?.emails_allowed : true,
      );
    } else {
      setCanCreateEmail(true);
    }
  };

  useEffect(() => {
    checkEmailsCreated();
  }, []);

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className={"p-0 min-w-[30%]"}>
        {loading ? (
          <Loader />
        ) : canCreateEmail ? (
          <>
            <div className={"px-3xl py-2xl"}>
              <p className={"font-medium text-[24px]"}>Create a New Email</p>
              <p className={"text-content-tertiary text-[16px] mt-sm"}>
                Give your email a clear name to help you stay organized.
              </p>

              <div className={"mt-[36px] flex flex-col gap-md"}>
                <p className={"text-[14px] font-medium text-content-tertiary"}>
                  Email name
                </p>

                <Input
                  className={"h-[40px]"}
                  value={projectName ?? ""}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className={"mt-2xl flex flex-col gap-md"}>
                <p className={"text-[14px] font-medium text-content-tertiary"}>
                  Campaign name
                </p>

                <p className={"text-[14px] text-[#9CA3AF]"}>{campaign?.name}</p>
              </div>
            </div>

            <div className={"px-3xl py-xl flex justify-end gap-md"}>
              <Button variant={"outline"} onClick={handleClose}>
                Cancel
              </Button>

              <Button onClick={handleCreate} disabled={!projectName}>
                Create
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={"px-3xl py-2xl"}>
              <p className={"font-medium text-[24px]"}>Cannot create email!</p>
              <p className={"text-content-tertiary text-[16px] mt-sm"}>
                You have reached the maximum number of allowed emails in a
                month!
              </p>
            </div>

            <div className={"px-3xl py-xl flex justify-end gap-md"}>
              <Button variant={"outline"} onClick={handleClose}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
