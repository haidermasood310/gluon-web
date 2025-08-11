"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { showError } from "@/hooks/useToastMessages";
import supabase from "@/config/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  handleClose: () => void;
};

export default function DeleteCampaignModal({ id, handleClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from("campaigns").delete().eq("id", id);

      if (error) {
        showError(error.message);
      } else {
        handleClose();
        router.replace("/campaigns");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className={"p-0 min-w-[30%]"}>
        <div className={"px-3xl py-2xl "}>
          <p className={"font-medium text-[24px]"}>Delete Campaign</p>
          <p className={"text-content-tertiary text-[16px] mt-sm"}>
            Are you sure you want to delete this campaign? All associated emails
            will be deleted as well.
          </p>
        </div>

        <div className={"px-3xl py-xl flex justify-end gap-md"}>
          <Button variant={"outline"} onClick={handleClose}>
            Cancel
          </Button>

          <Link href={"/campaigns"}>
            <Button onClick={handleDelete} loading={loading}>
              Delete
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
