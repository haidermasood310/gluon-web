"use client";

import { Button } from "@/components/ui/button";
import ExportIcon from "@/components/icons/ExportIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import BoldIcon from "@/components/icons/BoldIcon";
import ItalicIcon from "@/components/icons/ItalicIcon";
import UnderlineIcon from "@/components/icons/UnderlineIcon";
import AlphabetIcon from "@/components/icons/AlphabetIcon";
import BoldLinkIcon from "@/components/icons/BoldLinkIcon";
import PaintIcon from "@/components/icons/PaintIcon";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Position from "@/app/editor/Position";
import Font from "@/app/editor/Font";
import { useEmailStore } from "@/store/useEmailStore";
import Editor from "@/components/Editor";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/loader";
import { showError, showSuccess } from "@/hooks/useToastMessages";

export default function NewProject() {
  const router = useRouter();
  const {
    email,
    setEmail,
    projectName,
    setProjectName,
    projectId,
    setProjectId,
    clearEmail,
  } = useEmailStore();
  const { setUser, user } = useAuthStore();
  const [showFont, setShowFont] = useState(false);
  const [showPosition, setShowPosition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (email === null) {
      router.replace("/new-email");
    }
    // return()=>{
    //   clearEmail();
    // }
  }, [email]);

  useEffect(() => {
    // Get the current user and then fetch email content
    const getCurrentUser = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User not authenticated", userError);
          return;
        }
        // uid = user.id;
        setUserId(user.id);
        setUser({ id: user.id });
        console.log("Current user ID:", user.id);

        // After getting the user ID, fetch the email content
        if (projectId) await fetchEmailContentFromSupabase(user.id);
      } catch (error) {
        console.error("Error getting current user:", error);
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [projectName]);

  const fetchEmailContentFromSupabase = async (userId: string) => {
    try {
      if (!userId || !projectName) {
        console.log("userid", userId, "projectName", projectName);
        console.error("Missing user ID or project name");
        setLoading(false);
        return;
      }

      // Fetch content using user ID and project name as identifiers
      const { data, error } = await supabase
        .from("projects")
        .select("html")
        .eq("profile_id", userId)
        .eq("project_name", projectName)
        .single();

      if (error) {
        console.error("Error fetching from Supabase:", error);
        setLoading(false);
        return;
      }

      if (data && data.html) {
        setEmail(data.html);
      }
    } catch (error) {
      console.error("Error in fetchEmailContentFromSupabase:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async () => {
    const projName = document.querySelector("#project-name")?.innerHTML;
    const emailContent = document.querySelector("#email")?.innerHTML;

    if (!emailContent) {
      showError("No content to save!");
      return;
    }
    if (!projName) {
      alert("No project name!");
      return;
    }
    setProjectName(projName);
    setEmail(emailContent);

    if (projectId) {
      try {
        setSaving(true);
        const { data, error } = await supabase
          .from("projects")
          .update({ html: emailContent, project_name: projName })
          .eq("profile_id", userId)
          .eq("project_id", projectId)
          .eq("project_name", projName);

        if (error) {
          showError(error.message);
        }

        showSuccess("Email content saved successfully!");

        await fetchEmailContentFromSupabase(userId as string);
      } catch (error) {
        console.error("Supabase save error:", error);
        alert("Failed to save email content.");
      } finally {
        setSaving(false);
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            profile_id: user?.id,
            project_name: projName,
            html: emailContent,
          },
        ])
        .select("project_id")
        .single();

      if (error) {
        showError(error.message);
      } else {
        console.log("data", data);
        setProjectId(data.project_id);
        showSuccess("Email content saved successfully!");
      }
    }
  };

  return (
    <div className={"w-full"}>
      <div
        className={
          "py-xl px-3xl flex items-center justify-between border-b border-border-secondary"
        }
      >
        <p
          className={"font-medium text-[24px] capitalize"}
          contentEditable={true}
          id={"project-name"}
        >
          {projectName}
        </p>
        <Button variant={"secondary"} loading={saving} onClick={saveToDatabase}>
          {!saving && <ExportIcon />}
          Save
        </Button>
      </div>

      <div
        className={
          "flex justify-center items-center gap-xl py-lg px-xl border-b border-border-secondary"
        }
      >
        <div
          onClick={() => {
            if (showPosition) setShowPosition(false);
            setShowFont((prev) => !prev);
          }}
          className={cn(
            "flex items-center border border-border-selected rounded-[8px] px-xl py-md min-w-[120px] cursor-pointer hover:border-border-accent-a",
            showFont ? "border-border-accent-a" : "",
          )}
        >
          Satoshi
        </div>

        <div className={"border-r h-[14px] border-border-selected"} />

        <div className={"flex h-full"}>
          <div
            className={
              "border border-border-secondary rounded-l-[8px] px-lg py-md flex items-center"
            }
          >
            <MinusIcon />
          </div>
          <div
            className={
              "border-t border-b border-border-secondary px-xl py-md text-content-disabled flex items-center"
            }
          >
            16
          </div>
          <div
            className={
              "border border-border-secondary rounded-r-[8px] px-lg py-md flex items-center"
            }
          >
            <PlusIcon />
          </div>
        </div>

        <div className={"border-r h-[14px] border-border-selected"} />

        <BoldIcon />
        <ItalicIcon />
        <UnderlineIcon />

        <div className={"border-r h-[14px] border-border-selected"} />

        <AlphabetIcon />
        <BoldLinkIcon />

        <div className={"border-r h-[14px] border-border-selected"} />

        <PaintIcon />
        <span className={"h-[12px] aspect-square rounded-full bg-black"} />
        <p className={"text-content-tertiary"}>#000000</p>

        <div className={"border-r h-[14px] border-border-selected"} />

        <div
          onClick={() => {
            if (showFont) setShowFont(false);
            setShowPosition((prev) => !prev);
          }}
          className={cn(
            "border border-border-secondary rounded-[8px] py-md px-lg cursor-pointer hover:border-border-accent-a",
            showPosition ? "border-border-accent-a" : "",
          )}
        >
          Position
        </div>
      </div>

      <div className={"grid grid-cols-4 h-full"}>
        {(showPosition || showFont) && (
          <div
            className={
              "p-xl w-full flex col-span-1 justify-center border-r border-border-secondary"
            }
          >
            {showPosition && <Position />}
            {showFont && <Font />}
          </div>
        )}

        <div
          className={cn(
            "p-3xl flex justify-center",
            showPosition || showFont ? "col-span-3" : "col-span-4",
          )}
        >
          <div className={"w-[500px]"}>
            <img src={"/project-header.svg"} alt={""} className={"w-full"} />

            {loading ? (
              <Loader />
            ) : (
              <div
                id={"email"}
                contentEditable={true}
                className={"py-lg px-xl justify-self-center"}
                dangerouslySetInnerHTML={{ __html: email as string }}
              >
                {/*<Editor value={email} setValue={setEmail} />*/}
              </div>
            )}

            <div
              className={
                "w-full rounded-b-[6px] font-medium leading-tight py-xl px-3xl text-[11px] pr-[60px]"
              }
              style={{
                background: "url(/project-footer.svg) center/cover no-repeat",
              }}
            >
              You're receiving this email because you opted in to hear about
              AI-powered marketing solutions. If you no longer wish to receive
              emails from us, you can unsubscribe here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
