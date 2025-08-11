"use client";

import { Button } from "@/components/ui/button";
import ExportIcon from "@/components/icons/ExportIcon";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useEmailStore } from "@/store/useEmailStore";
import supabase from "@/config/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/loader";
import { showError, showSuccess } from "@/hooks/useToastMessages";
import Editor from "@/components/Editor";
import SaveIcon from "@/components/icons/SaveIcon";
import Header from "@/components/Header";
import DeleteEmailModal from "@/components/DeleteEmailModal";
import { useRouter } from "next/navigation";

export default function EditProject({
  params,
}: {
  params: Promise<{ projId: string }>;
}) {
  const {
    email,
    setEmail,
    projectName,
    setProjectName,
    projectId,
    setProjectId,
    campaign,
  } = useEmailStore();
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const getParams = async () => {
      const { projId } = await params;
      return projId;
    };

    getParams().then((id: string) => setProjectId(id));
  }, [params]);

  useEffect(() => {
    if (projectId) fetchEmailContentFromSupabase();
  }, [projectId]);

  const fetchEmailContentFromSupabase = async () => {
    try {
      if (!user?.id || !projectId) {
        setLoading(false);
        return;
      }

      // Fetch content using user ID and project name as identifiers
      const { data, error } = await supabase
        .from("projects")
        .select("html, project_name")
        .eq("profile_id", user?.id)
        .eq("project_id", projectId)
        .single();

      if (error) {
        console.error("Error fetching from Supabase:", error);
        setLoading(false);
        return;
      }

      if (data) {
        console.log("data", data);
        setEmail(data.html);
        setProjectName(data.project_name);
      }
    } catch (error) {
      console.error("Error in fetchEmailContentFromSupabase:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async () => {
    const projName = document.querySelector("#project-name")?.innerHTML;

    if (!projName) {
      showError("Add a project name!");
      return;
    }
    setProjectName(projName);

    if (projectId) {
      try {
        setSaving(true);

        const { error } = await supabase
          .from("projects")
          .update({ html: email, project_name: projName })
          .eq("profile_id", user?.id)
          .eq("project_id", projectId);

        if (error) {
          showError(error.message);
        }

        showSuccess("Email content saved successfully!");

        await fetchEmailContentFromSupabase();
      } catch (error) {
        console.error("Supabase save error:", error);
        alert("Failed to save email content.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleExport = async () => {
    if (email) {
      const blob = new Blob([email], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", `${projectName}.html`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className={"w-full h-full"}>
      <Header
        showSearch={false}
        backTo={`/campaigns/${campaign?.id}`}
        // button={
        //   <Link href={`/campaigns/${campaign?.id}/new-email`}>
        //     <Button>
        //       <PlusIcon />
        //       Create another email
        //     </Button>
        //   </Link>
        // }
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={
              "p-xl md:px-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-[12px] border-b border-border-secondary"
            }
          >
            <p
              className={"font-medium text-[24px] capitalize"}
              contentEditable={true}
              id={"project-name"}
            >
              {projectName}
            </p>

            <div
              className={"flex justify-end items-center gap-[12px] flex-wrap"}
            >
              <Button variant={"outline"} onClick={() => setShowDelete(true)}>
                Delete project
              </Button>

              <Button variant={"outline"} onClick={handleExport}>
                <ExportIcon />
                Export HTML
              </Button>

              <Button
                variant={"secondary"}
                loading={saving}
                onClick={saveToDatabase}
              >
                {!saving && <SaveIcon />}
                Save
              </Button>
            </div>
          </div>

          <div className={cn("flex justify-center h-full w-full")}>
            <div className={"w-full"}>
              <Editor value={email} setValue={setEmail} />
            </div>
          </div>
        </>
      )}

      {showDelete && (
        <DeleteEmailModal
          id={projectId as string}
          handleClose={() => {
            setShowDelete(false);
            router.replace(`/campaigns/${campaign?.id}`);
          }}
        />
      )}
    </div>
  );
}
