"use client";

import MailFilledIcon from "@/components/icons/MailFilledIcon";
import { Button } from "@/components/ui/button";
import CampaignIcon from "@/components/icons/CampaignIcon";
import { useState } from "react";
import EmailMarketingModal from "@/components/EmailMarketingModal";
import Header from "@/components/Header";

export default function Home() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <>
      <Header showBack={false} showSearch={false} />

      <div className={"py-xl px-3xl"}>
        <p className={"font-medium text-[24px]"}>
          Welcome! Elevate Your Marketing with AI.
        </p>

        <div
          className={
            "mt-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-xl"
          }
        >
          <div
            onClick={() => setShowEmail(true)}
            className={
              "rounded-[8px] col-span-1 border border-border-secondary shadow-md cursor-pointer"
            }
          >
            <div
              className={
                "rounded-t-[8px] bg-background-accent-a-light py-lg px-3xl flex items-center justify-between"
              }
            >
              <div
                className={
                  "aspect-square w-fit flex justify-center items-center text-white rounded-full p-lg bg-background-accent-a-disabled"
                }
              >
                <MailFilledIcon />
              </div>

              <Button size={"sm"}>MVP</Button>
            </div>

            <div className={"rounded-b-[8px] bg-white py-lg px-3xl"}>
              <p className={"font-medium text-[20px]"}>
                AI Lifecycle/Email Marketer
              </p>
              <p className={"text-content-tertiary text-[16px] mt-sm"}>
                Build and optimize lifecycle campaigns with Gluon — your
                AI-powered teammate for every stage of the funnel.
              </p>
            </div>
          </div>
        </div>

        {showEmail && (
          <EmailMarketingModal handleClose={() => setShowEmail(false)} />
        )}
      </div>
    </>
  );
}
