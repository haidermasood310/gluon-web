"use client";

import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";
import NoData from "@/components/NoData";
import Loader from "@/components/ui/loader";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEmailStore } from "@/store/useEmailStore";
import Header from "@/components/Header";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import CampaignModal from "@/components/CampaignModal";
import { useAuthStore } from "@/store/useAuthStore";

type Campaign = {
  id: string;
  name: string;
  created_at: string;
};

export default function Campaigns() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { clearEmail, setCampaign } = useEmailStore();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCampaign, setShowCampaign] = useState(false);

  useEffect(() => {
    clearEmail();
    setCampaign(null);
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Query projects table for projects that belong to the current user's profile
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, name, created_at")
        .eq("profile_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching campaigns:", error);
      } else {
        console.log("Fetched campaigns:", data);
        setCampaigns(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <>
      <Header
        button={
          <Button onClick={() => setShowCampaign(true)}>
            <PlusIcon />
            New campaign
          </Button>
        }
      />
      <div className={"py-xl px-3xl h-full"}>
        <p className={"font-medium text-[24px]"}>
          Your Recent AI-First Campaigns.
        </p>

        {loading ? (
          <Loader />
        ) : !!campaigns?.length ? (
          <div
            className={
              "mt-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-xl"
            }
          >
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={
                  "rounded-[8px] col-span-1 border border-border-secondary shadow-md cursor-pointer"
                }
                onClick={() => router.push(`/campaigns/${campaign.id}`)}
              >
                <div className={"relative h-[150px]"}>
                  <div
                    className={
                      "flex items-end justify-center pt-[26px] absolute right-0 left-[32px]"
                    }
                  >
                    <div
                      className={
                        "w-[80%] shadow-purple bg-white blur-[1px] rounded-[8px]"
                      }
                    >
                      <img
                        src={"/card-header.svg"}
                        alt={""}
                        className={"w-full"}
                      />
                      <div
                        className={
                          "py-md px-lg w-full h-[80px] overflow-y-hidden"
                        }
                      >
                        <p>{campaign.name}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      "flex items-end justify-center pt-[26px] absolute right-[16px] left-[16px] top-[16px]"
                    }
                  >
                    <div
                      className={
                        "w-[80%] shadow-purple bg-white blur-[1px] rounded-[8px]"
                      }
                    >
                      <img
                        src={"/card-header.svg"}
                        alt={""}
                        className={"w-full"}
                      />
                      <div
                        className={
                          "py-md px-lg w-full h-[80px] overflow-y-hidden"
                        }
                      >
                        <p>{campaign.name}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      "flex items-end justify-center pt-[26px] absolute right-[32px] left-0 top-[32px]"
                    }
                  >
                    <div
                      className={"w-[80%] shadow-purple bg-white rounded-[8px]"}
                    >
                      <img
                        src={"/card-header.svg"}
                        alt={""}
                        className={"w-full"}
                      />
                      <div
                        className={
                          "py-md px-lg w-full h-[80px] overflow-y-hidden"
                        }
                      >
                        <p className={"text-content-tertiary"}>
                          Campaigns for {campaign.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    "rounded-b-[8px] bg-white py-xl px-3xl border-t border-border-secondary z-10 relative"
                  }
                >
                  <p className={"font-medium text-[16px] capitalize"}>
                    {campaign.name}
                  </p>
                  <p className={"text-content-tertiary text-[12px] mt-sm"}>
                    Created: {format(campaign.created_at, "PPp")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData>No campaigns to show</NoData>
        )}
      </div>

      {showCampaign && (
        <CampaignModal handleClose={() => setShowCampaign(false)} />
      )}
    </>
  );
}
