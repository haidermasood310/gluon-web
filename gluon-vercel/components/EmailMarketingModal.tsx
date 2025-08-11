import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  handleClose: () => void;
};

export default function EmailMarketingModal({ handleClose }: Props) {
  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className={"p-0 min-w-[70%]"}>
        <div className={"px-3xl py-2xl border-b border-border-secondary"}>
          <p className={"font-medium text-[24px]"}>Lifecycle Email Marketing</p>
          <p className={"text-content-tertiary text-[16px] mt-sm"}>
            Your AI email marketer — built to own the funnel, not just the
            inbox.
          </p>
        </div>

        <div
          className={"px-3xl py-xl bg-background-secondary lg:min-h-[500px]"}
        >
          <p className={"font-medium text-[20px]"}>What’s This?</p>

          <p className={"text-content-tertiary text-[15px] mt-md"}>
            An AI teammate that plans, writes, and optimizes lifecycle campaigns
            across the funnel — from onboarding to activation to upsell — so you
            can scale without lifting a finger.
          </p>

          <p className={"font-medium text-[20px] mt-xl"}>Why It Works</p>

          <p className={"text-content-tertiary text-[15px] mt-md"}>
            <ul>
              <li className={"text-black"}>
                &#8226; Full-Funnel Focus{" "}
                <span className={"text-content-tertiary"}>
                  – Drives action at every stage, not just opens and clicks.
                </span>
              </li>

              <li className={"text-black"}>
                &#8226; Always On-Brand{" "}
                <span className={"text-content-tertiary"}>
                  – Messages that sound like you, every time.
                </span>
              </li>

              <li className={"text-black"}>
                &#8226; Zero to Lve in Minutes{" "}
                <span className={"text-content-tertiary"}>
                  – Skip the blank page and go straight to performance.
                </span>
              </li>

              <li className={"text-black"}>
                &#8226; Boost Your Conversions{" "}
                <span className={"text-content-tertiary"}>
                  – Guide your readers smoothly through your sales funnel,
                  turning curiosity into action—and action into loyal customers.
                </span>
              </li>
            </ul>
          </p>
        </div>

        <div
          className={
            "px-3xl py-xl border-t border-border-secondary flex justify-end gap-md"
          }
        >
          <Button variant={"outline"} onClick={handleClose}>
            Cancel
          </Button>

          <Link href={"/campaigns"}>
            <Button onClick={handleClose}>Use tool</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
