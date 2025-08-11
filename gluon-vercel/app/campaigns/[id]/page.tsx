"use client";

import { useRouter } from "next/navigation";

type Project = {
  project_id: string;
  project_name: string;
  html: string;
  created_at: string;
};

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";
import Loader from "@/components/ui/loader";
import Header from "@/components/Header";
import PlusIcon from "@/components/icons/PlusIcon";
import { format } from "date-fns";
import NoData from "@/components/NoData";
import CreateNewEmailModal from "@/components/CreateNewEmailModal";
import { useEmailStore } from "@/store/useEmailStore";
import { useAuthStore } from "@/store/useAuthStore";
import DeleteCampaignModal from "@/components/DeleteCampaignModal";

export default function SingleCampaign({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setCampaign, setProjectId } = useEmailStore();
  const [campaignId, setCampaignId] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDelete, setShowDelete] = useState(false);

  const fetchCampaign = async () => {
    try {
      // Query projects table for projects that belong to the current user's profile and current campaign
      const { data, error } = await supabase
        .from("campaigns")
        .select(
          "id, name, created_at, brand_name, brand_tone, product_name, product_description, product_features",
        )
        .eq("profile_id", user?.id)
        .eq("id", campaignId)
        .single();

      if (error) {
        console.error("Error fetching campaign:", error);
      } else {
        setCampaign(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      // Query projects table for projects that belong to the current user's profile and current campaign
      const { data, error } = await supabase
        .from("projects")
        .select("project_id, html, project_name, created_at")
        .eq("profile_id", user?.id)
        .eq("campaign_id", campaignId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        console.log("Fetched projects:", data);
        setProjects(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      return id;
    };

    getParams().then((id: string) => {
      setCampaignId(id);
    });
  }, [params]);

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchProjects();
    }
  }, [campaignId]);

  return (
    <>
      <Header
        button={
          <Button onClick={() => setShowModal(true)}>
            <PlusIcon />
            New email
          </Button>
        }
      />
      <div className={"py-xl px-3xl h-full"}>
        <div className={"flex justify-between items-center gap-[24px]"}>
          <p className={"font-medium text-[24px]"}>
            Your Recent AI-Powered Projects.
          </p>

          <Button variant={"outline"} onClick={() => setShowDelete(true)}>
            Delete campaign
          </Button>
        </div>

        {loading ? (
          <Loader />
        ) : !!projects?.length ? (
          <div
            className={
              "mt-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-xl"
            }
          >
            {projects.map((project) => (
              <div
                key={project.project_id}
                className={
                  "rounded-[8px] col-span-1 border border-border-secondary shadow-md cursor-pointer"
                }
                onClick={() => {
                  setProjectId(project.project_id);
                  router.push(
                    `/campaigns/${campaignId}/email/${project.project_id}`,
                  );
                }}
              >
                <div className={"flex items-end justify-center pt-[26px]"}>
                  <div className={"w-[80%] shadow-purple"}>
                    <img
                      src={"/card-header.svg"}
                      alt={""}
                      className={"w-full"}
                    />
                    <div
                      className={
                        "py-md px-lg w-full h-[80px] overflow-y-hidden"
                      }
                      dangerouslySetInnerHTML={{ __html: project.html }}
                    ></div>
                  </div>
                </div>

                <div
                  className={
                    "rounded-b-[8px] bg-white py-xl px-3xl border-t border-border-secondary z-10 relative"
                  }
                >
                  <p className={"font-medium text-[16px] capitalize"}>
                    {project.project_name}
                  </p>
                  <p className={"text-content-tertiary text-[12px] mt-sm"}>
                    Created: {format(project.created_at, "PPp")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData>No projects to show</NoData>
        )}

        {showModal && (
          <CreateNewEmailModal handleClose={() => setShowModal(false)} />
        )}
      </div>

      {showDelete && (
        <DeleteCampaignModal
          id={campaignId as string}
          handleClose={() => {
            setShowDelete(false);
          }}
        />
      )}
    </>
  );
}
