"use client";

import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";
import NoData from "@/components/NoData";
import Loader from "@/components/ui/loader";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEmailStore } from "@/store/useEmailStore";

type Project = {
  project_id: string;
  project_name: string;
  html: string;
  created_at: string;
};

export default function Recents() {
  const router = useRouter();
  const { clearEmail } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    clearEmail();
  }, []);

  const fetchProjects = async () => {
    try {
      // First, get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not authenticated", userError);
        setLoading(false);
        return;
      }

      console.log("Current user ID:", user.id);
      sessionStorage.clear(); // Log the user ID for debugging

      // Query projects table for projects that belong to the current user's profile
      const { data, error } = await supabase
        .from("projects")
        .select("project_id, html, project_name, created_at")
        .eq("profile_id", user.id)
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
    fetchProjects();
  }, []);

  return (
    <div className={"py-xl px-3xl"}>
      <p className={"font-medium text-[24px]"}>
        Your Recent AI-Powered Projects.
      </p>

      {loading ? (
        <Loader />
      ) : !!projects?.length ? (
        <div className={"mt-xl grid grid-cols-3 gap-xl"}>
          {projects.map((project) => (
            <div
              key={project.project_id}
              className={
                "rounded-[8px] col-span-1 border border-border-secondary shadow-md cursor-pointer"
              }
              onClick={() => router.push(`/editor/${project.project_id}`)}
            >
              <div className={"flex items-end justify-center pt-[26px]"}>
                <div className={"w-[80%] shadow-purple"}>
                  <img src={"/card-header.svg"} alt={""} className={"w-full"} />
                  <div
                    className={"py-md px-lg w-full h-[80px] overflow-y-hidden"}
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
    </div>
  );
}
