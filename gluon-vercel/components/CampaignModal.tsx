"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { showError, showSuccess } from "@/hooks/useToastMessages";
import supabase from "@/config/supabaseClient";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEmailStore } from "@/store/useEmailStore";

type Props = {
  handleClose: () => void;
};

export default function CampaignModal({ handleClose }: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setCampaign } = useEmailStore();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (name) {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("campaigns")
          .insert([
            {
              profile_id: user?.id,
              name,
            },
          ])
          .select("id, name, created_at")
          .single();

        if (error) {
          showError(error.message);
        }

        if (data) {
          showSuccess("Campaign created successfully!");
          setCampaign(data);

          handleClose();
          router.push(`/campaigns/${data?.id}`);
        }
      } catch (error) {
        console.error("Supabase save error:", error);
        alert("Failed to save email content.");
      } finally {
        setLoading(false);
      }
    } else {
      showError("Please enter a name!");
    }
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className={"p-0 min-w-[30%]"}>
        <div className={"px-3xl py-2xl "}>
          <p className={"font-medium text-[24px]"}>Create a New Campaign</p>
          <p className={"text-content-tertiary text-[16px] mt-sm"}>
            Give your campaign a name to easily manage and track it.
          </p>

          <div className={"mt-[36px] flex flex-col gap-md"}>
            <p className={"text-[14px] font-medium text-content-tertiary"}>
              Campaign name
            </p>

            <Input
              className={"h-[40px]"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className={"px-3xl py-xl flex justify-end gap-md"}>
          <Button variant={"outline"} onClick={handleClose}>
            Cancel
          </Button>

          <Link href={"/campaigns"}>
            <Button onClick={handleCreate} loading={loading} disabled={!name}>
              Create
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
