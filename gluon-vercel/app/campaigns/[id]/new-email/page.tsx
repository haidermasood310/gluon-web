"use client";

import { Button } from "@/components/ui/button";
import UpIcon from "@/components/icons/UpIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploadIcon from "@/components/icons/FileUploadIcon";
import Radio from "@/components/Radio";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { showError } from "@/hooks/useToastMessages";
import { generateEmailDesign, generateOptions } from "@/api/email";
import { useEmailStore } from "@/store/useEmailStore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DownIcon from "@/components/icons/DownIcon";
import NoData from "@/components/NoData";
import supabase from "@/config/supabaseClient";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/useAuthStore";

const BUCKET_NAME = "brand-assets"; // Change this to your actual bucket name

export default function NewEmail() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setEmail, setProjectName, setProjectId, projectName, campaign } =
    useEmailStore();

  const [optionsLoading, setOptionsLoading] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [brandName, setBrandName] = useState<string>(
    campaign?.brand_name ?? "",
  );
  const [brandTone, setBrandTone] = useState<string>(
    campaign?.brand_tone ?? "",
  );
  const [productName, setProductName] = useState<string>(
    campaign?.product_name ?? "",
  );
  const [productDescription, setProductDescription] = useState<string>(
    campaign?.product_description ?? "",
  );
  const [productFeatures, setProductFeatures] = useState<string>(
    campaign?.product_features?.join("\n") ?? "",
  );
  const [meetingNotes, setMeetingNotes] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [introOptions, setIntroOptions] = useState<string[]>([]);
  const [bodyOptions, setBodyOptions] = useState<string[]>([]);
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [selectedIntro, setSelectedIntro] = useState<string>();
  const [selectedBody, setSelectedBody] = useState<string>();
  const [selectedAction, setSelectedAction] = useState<string>();

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [productUrl, setProductUrl] = useState<string>("");
  const [logoUrls, setLogoUrls] = useState<any[]>([]);
  const [productUrls, setProductUrls] = useState<any[]>([]);
  const [logoFiles, setLogoFiles] = useState<any[]>([]);
  const [productFiles, setProductFiles] = useState<any[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const logoFileInputRef = useRef(null);
  const productFileInputRef = useRef(null);

  const handleGenerateOptions = () => {
    if (
      brandName &&
      brandTone &&
      productName &&
      productFeatures &&
      productDescription
    ) {
      setOptionsLoading(true);

      let params = `brand_name=${brandName}&brand_tone=${brandTone}&product_information=${productName}&product_description=${productDescription}&product_features=${productFeatures}&User_Id=${user?.id}&Campaign_Id=${campaign?.id}`;

      if (meetingNotes) {
        params += `&Meeting_Notes=${meetingNotes}`;
      }
      if (context) {
        params += `&Context=${context}`;
      }

      generateOptions(params)
        .then((res) => {
          setSubjectOptions(res.Email_Subject_Line);
          setIntroOptions(res.Email_Introduction_Line);
          setBodyOptions(res.Email_Body_Text);
          setActionOptions(res.Call_To_Actions);
        })
        .catch(() => showError("Something went wrong! Please try again"))
        .finally(() => {
          setOptionsLoading(false);
        });
    } else {
      showError("Please fill all fields!");
    }
  };

  const patchCampaign = async () => {
    try {
      const { error } = await supabase
        .from("campaigns")
        .update({
          brand_name: brandName,
          brand_tone: brandTone,
          product_name: productName,
          product_description: productDescription,
          product_features: productFeatures?.split("\n"),
        })
        .eq("id", campaign?.id);

      if (error) showError(error.message);
    } catch (err) {
      console.log("err patching campaign", err);
      showError("Something went wrong! Please try again");
    }
  };

  const createEmail = async (html: string) => {
    const projName = document.querySelector("#project-name")?.innerHTML;

    if (!projName) {
      showError("Add a project name!");
      return;
    }
    setProjectName(projName);

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            profile_id: user?.id,
            campaign_id: campaign?.id,
            project_name: projName,
            html,
          },
        ])
        .select("project_id")
        .single();

      if (error) showError(error.message);

      return data?.project_id;
    } catch (err) {
      console.log("err creating email", err);
      showError("Something went wrong! Please try again");
    }
  };

  const handleGenerate = () => {
    if (
      selectedSubject &&
      selectedIntro &&
      selectedBody &&
      selectedAction &&
      brandName &&
      brandTone &&
      productName
    ) {
      setEmailLoading(true);

      const allImageUrls = [...logoUrls, ...productUrls];
      if (logoUrl) allImageUrls.push(logoUrl);
      if (productUrl) allImageUrls.push(productUrl);

      let params = `Brand_Name=${brandName}&Brand_Tone=${brandTone}&Product_Name=${productName}&Target_Audience=everyone&Email_Subject_Line=${selectedSubject}&Email_Introduction_Line=${selectedIntro}&Email_Body_Text=${selectedBody}&Call_To_Actions=${selectedAction}`;

      allImageUrls.forEach((url) => {
        params += `&images_list=${url}`;
      });

      patchCampaign().then(() => {
        generateEmailDesign(params)
          .then((res) => {
            setEmail(res.toString());

            createEmail(res.toString()).then((projectId) => {
              setProjectId(projectId);
              router.push(`/campaigns/${campaign?.id}/email/${projectId}`);
            });
          })
          .catch(() => showError("Something went wrong! Please try again"))
          .finally(() => {
            setEmailLoading(false);
          });
      });
    } else {
      showError("Please fill all fields!");
    }
  };

  const ensureBucketExists = async () => {
    try {
      // First check if bucket exists
      const { data: buckets, error } = await supabase.storage.listBuckets();

      if (error) {
        console.error("Error checking buckets:", error);
        return false;
      }

      const bucketExists = buckets.some(
        (bucket) => bucket.name === BUCKET_NAME,
      );

      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        const { error: createError } = await supabase.storage.createBucket(
          BUCKET_NAME,
          {
            public: true, // Make files publicly accessible by default
          },
        );

        if (createError) {
          console.error("Error creating bucket:", createError);
          return false;
        }

        console.log(`Bucket ${BUCKET_NAME} created successfully`);
      }

      return true;
    } catch (error) {
      console.error("Unexpected error checking/creating bucket:", error);
      return false;
    }
  };

  const handleLogoUpload = async (e: any) => {
    try {
      const files: any[] = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadingLogo(true);

      // Ensure bucket exists
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        showError("Error accessing storage bucket. Please try again later.");
        setUploadingLogo(false);
        return;
      }

      const uploadedFiles: any[] = [];

      for (const file of files) {
        // Generate unique filename
        // @ts-ignore
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `logos/${fileName}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading logo:", error);
          showError(`Error uploading ${file.name}: ${error.message}`);
        } else {
          // ✅ Ensure public URL is retrieved correctly
          const { data: urlData } = await supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

          const publicUrl = urlData?.publicUrl; // ✅ Safely extract the URL

          if (!publicUrl) {
            console.error("Failed to retrieve public URL for:", filePath);
          } else {
            console.log("Uploaded logo URL:", publicUrl); // ✅ Log correct URL
          }

          uploadedFiles.push({
            name: file.name,
            path: filePath,
            url: publicUrl || "",
            file: file,
          });
        }
      }

      setLogoFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

      const logoUrls = uploadedFiles.map((file) => file.url).filter(Boolean); // ✅ Remove null values
      setLogoUrls((prev) => [...(prev || []), ...logoUrls]);
    } catch (error) {
      console.error("Unexpected error during logo upload:", error);
      showError("An unexpected error occurred during upload");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleProductUpload = async (e: any) => {
    try {
      const files: any[] = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadingProduct(true);

      // Ensure bucket exists
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        showError("Error accessing storage bucket. Please try again later.");
        setUploadingProduct(false);
        return;
      }

      const uploadedFiles: any[] = [];

      for (const file of files) {
        // Generate a unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading product image:", error);
          showError(`Error uploading ${file.name}: ${error.message}`);
        } else {
          // ✅ Ensure public URL is retrieved correctly
          const { data: urlData } = await supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

          const publicUrl = urlData?.publicUrl; // ✅ Safely extract the URL

          if (!publicUrl) {
            console.error("Failed to retrieve public URL for:", filePath);
          } else {
            console.log("Uploaded product image URL:", publicUrl); // ✅ Log correct URL
          }

          uploadedFiles.push({
            name: file.name,
            path: filePath,
            url: publicUrl || "", // ✅ Prevent null issues
            file: file,
          });
        }
      }

      setProductFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

      const productImageUrls = uploadedFiles
        .map((file) => file.url)
        .filter(Boolean);
      setProductUrls((prev) => [...(prev || []), ...productImageUrls]);
    } catch (error) {
      console.error("Unexpected error during product image upload:", error);
      showError("An unexpected error occurred during upload");
    } finally {
      setUploadingProduct(false);
    }
  };

  const removeFile = async (
    setFiles: Dispatch<SetStateAction<any[]>>,
    files: any[],
    index: number,
    isLogo = true,
  ) => {
    try {
      const fileToRemove = files[index];

      // If it's a file we uploaded (has a path), delete it from Supabase
      if (fileToRemove.path) {
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([fileToRemove.path]);

        if (error) {
          console.error("Error removing file from storage:", error);
        }
      }

      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);

      if (isLogo) {
        const newUrls = logoUrls.filter((url) => url !== fileToRemove.url);

        setLogoUrls(newUrls);
      } else {
        const newUrls = productUrls.filter((url) => url !== fileToRemove.url);

        setProductUrls(newUrls);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const triggerFileInput = (ref: any) => {
    ref.current.click();
  };

  const ProjectName = () => (
    <>
      <p
        className={"font-medium text-[20px] lg:text-[24px] capitalize"}
        contentEditable={true}
        id={"project-name"}
      >
        {projectName}
      </p>

      <p className={"text-content-tertiary text-[16px] lg:text-[18px]"}>
        {campaign?.name}
      </p>
    </>
  );

  const AIGeneratedContentTitle = () => (
    <p className={"font-medium text-[20px] lg:text-[24px]"}>
      AI Generated Content
    </p>
  );

  const Inputs = () => (
    <>
      <ToggleContainer title={"Branding & Communication"}>
        <p>Brand Name</p>

        <Input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          tooltip={"Enter your brand name here"}
        />

        <p>Brand Tone</p>

        <Textarea
          value={brandTone}
          onChange={(e) => setBrandTone(e.target.value)}
          tooltip={
            "This is how your brand “sounds” when it communicates. Think of it like your brand’s personality in words. Be as detailed as possible! For example; friendly and casual."
          }
        />

        {/*<div className={"flex gap-md"}>*/}
        {/*  <Button variant={"secondary"} className={"flex-1"}>*/}
        {/*    <FileUploadIcon />*/}
        {/*    Upload File*/}
        {/*  </Button>*/}
        {/*  <Button variant={"secondary"} className={"flex-1"}>*/}
        {/*    <LinkIcon />*/}
        {/*    Enter URL*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </ToggleContainer>

      <ToggleContainer title={"Product Information"}>
        <p>Product Name</p>

        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          tooltip={"Enter your product name here."}
        />

        <p>Product Description</p>

        <Textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          tooltip={
            <p>
              Tell us what you're selling so Gluon can write better emails for
              you.
              <br />
              Include key details like:
              <br />
              &#8226; What the product is
              <br />
              &#8226; Who it's for
              <br />
              &#8226; Key benefits or features
              <br />
              &#8226; Anything that makes it unique
              <br />
              Example: “A smart water bottle that tracks hydration and reminds
              users to drink water throughout the day. Ideal for fitness
              enthusiasts and office workers.”
            </p>
          }
        />

        <p>Product Features</p>

        <Textarea
          value={productFeatures}
          onChange={(e) => setProductFeatures(e.target.value)}
          tooltip={
            <p>
              List the key things your product does or offers. These help Gluon
              write persuasive, benefit-driven emails.
              <br />
              Include things like:
              <br />
              &#8226; Technical specs
              <br />
              &#8226; Standout functions
              <br />
              &#8226; Materials or design highlights
              <br />
              &#8226; Integrations or extras
              <br />
              Example: “Lasts 48 hours on one charge”
            </p>
          }
        />

        {/*<div className={"mt-2xl flex flex-col gap-xl"}>*/}
        {/*  <p className={"text-black font-medium text-[16px]"}>Variants</p>*/}

        {/*  <div className={"flex gap-md"}>*/}
        {/*    <div className={"flex-1 flex flex-col gap-md"}>*/}
        {/*      <p>Key</p>*/}
        {/*      <Input />*/}
        {/*    </div>*/}

        {/*    <div className={"flex-1 flex flex-col gap-md"}>*/}
        {/*      <p>Value</p>*/}
        {/*      <Input />*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <Button*/}
        {/*    variant={"secondary"}*/}
        {/*    className={"w-fit place-self-end text-content-secondary"}*/}
        {/*  >*/}
        {/*    <PlusIcon />*/}
        {/*    Add another variant*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </ToggleContainer>

      <ToggleContainer title={"Images"}>
        <p className={"text-black font-medium text-[16px]"}>Logo</p>

        <p>Enter a URL</p>

        <Input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          tooltip={
            "Add images of your brands’ logo. You can upload a URL or JPEG/PNG files."
          }
        />

        <p className={"place-self-center"}>OR</p>

        <Button
          loading={uploadingLogo}
          variant={"secondary"}
          className={"text-content-secondary"}
          onClick={() => triggerFileInput(logoFileInputRef)}
        >
          {!uploadingLogo && <FileUploadIcon />}
          Upload File
        </Button>

        <input
          type="file"
          ref={logoFileInputRef}
          onChange={handleLogoUpload}
          style={{ display: "none" }}
          accept="image/*"
          multiple
        />

        {logoFiles.length > 0 && (
          <div className={"flex flex-col gap-[6px]"}>
            {logoFiles.map((file, index) => (
              <div key={index} className={"flex justify-between items-center"}>
                <span>{file.name.slice(0, 20) + "..."}</span>

                <Button
                  variant={"outline"}
                  className={"py-0 px-0 w-[20px] h-[20px]"}
                  onClick={() =>
                    removeFile(setLogoFiles, logoFiles, index, true)
                  }
                  disabled={uploadingLogo}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className={"text-black font-medium text-[16px] mt-xl"}>Product</p>

        <p>Enter a URL</p>

        <Input
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
          tooltip={
            "Add images of your product. The more, the better! You can upload a URL or JPEG/PNG files. "
          }
        />

        <p className={"place-self-center"}>OR</p>

        <Button
          variant={"secondary"}
          className={"text-content-secondary"}
          onClick={() => triggerFileInput(productFileInputRef)}
          loading={uploadingProduct}
        >
          {!uploadingProduct && <FileUploadIcon />}
          Upload File
        </Button>

        <input
          type="file"
          ref={productFileInputRef}
          onChange={handleProductUpload}
          style={{ display: "none" }}
          accept="image/*"
          multiple
        />

        {productFiles.length > 0 && (
          <div className={"flex flex-col gap-[6px]"}>
            {productFiles.map((file, index) => (
              <div key={index} className={"flex justify-between items-center"}>
                <span>{file.name.slice(0, 20) + "..."}</span>

                <Button
                  variant={"outline"}
                  className={"py-0 px-0 w-[20px] h-[20px]"}
                  onClick={() =>
                    removeFile(setProductFiles, productFiles, index, false)
                  }
                  disabled={uploadingProduct}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </ToggleContainer>

      <ToggleContainer title={"Briefing & Context"}>
        <p className={"italic font-light mb-sm"}>
          This information is not mandatory. However, it can help the AI
          generate a better output.
        </p>

        <p>Meeting Notes</p>
        <Textarea
          value={meetingNotes}
          onChange={(e) => setMeetingNotes(e.target.value)}
          tooltip={
            "Paste any internal notes from stakeholder meetings or calls that could help the AI understand context, goals, or tone."
          }
        />

        <p>Context Window</p>

        <Textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          tooltip={
            "Describe any ongoing campaigns, brand situations, or background info you want the AI to keep in memory when generating results."
          }
        />
      </ToggleContainer>
    </>
  );

  const GeneratedOptions = () =>
    !!subjectOptions.length ? (
      <div className={"w-full lg:p-xl flex flex-col gap-xl"}>
        <ToggleContainer title={"Subject Line"} icon={false}>
          {subjectOptions.map((value, index) => (
            <div
              key={value.slice(0, 6) + index.toString()}
              className={
                "rounded-[6px] lg:py-md lg:px-xl flex gap-md lg:border border-border-tertiary"
              }
            >
              <Radio
                selected={selectedSubject === value}
                setSelected={() => setSelectedSubject(value)}
              >
                {value}
              </Radio>
            </div>
          ))}
        </ToggleContainer>

        <ToggleContainer title={"Introduction"} icon={false}>
          {introOptions.map((value, index) => (
            <div
              key={value.slice(0, 6) + index.toString()}
              className={
                "rounded-[6px] lg:py-md lg:px-xl flex gap-md lg:border border-border-tertiary"
              }
            >
              <Radio
                selected={selectedIntro === value}
                setSelected={() => setSelectedIntro(value)}
              >
                {value}
              </Radio>
            </div>
          ))}
        </ToggleContainer>

        <ToggleContainer title={"Body"} icon={false}>
          {bodyOptions.map((value, index) => (
            <div
              key={value.slice(0, 6) + index.toString()}
              className={
                "rounded-[6px] lg:py-md lg:px-xl flex gap-md lg:border border-border-tertiary"
              }
            >
              <Radio
                selected={selectedBody === value}
                setSelected={() => setSelectedBody(value)}
              >
                {value}
              </Radio>
            </div>
          ))}
        </ToggleContainer>

        <ToggleContainer title={"Call-to-Actions"} icon={false}>
          {actionOptions.map((value, index) => (
            <div
              key={value.slice(0, 6) + index.toString()}
              className={
                "rounded-[6px] lg:py-md lg:px-xl flex gap-md lg:border border-border-tertiary"
              }
            >
              <Radio
                selected={selectedAction === value}
                setSelected={() => setSelectedAction(value)}
              >
                {value}
              </Radio>
            </div>
          ))}
        </ToggleContainer>
      </div>
    ) : (
      <NoData>Enter details to generate</NoData>
    );

  const GenerateAISuggestionsButton = () => (
    <Button
      className={"h-[44px]"}
      onClick={handleGenerateOptions}
      loading={optionsLoading}
    >
      Generate AI written suggestions
    </Button>
  );

  const GenerateDesignButton = () =>
    !!subjectOptions.length && (
      <Button
        className={"h-[44px]"}
        onClick={handleGenerate}
        loading={emailLoading}
      >
        Generate Design
      </Button>
    );

  return (
    <div className={"h-full w-full"}>
      <Header showSearch={false} />

      <div className={"grid grid-cols-3 h-full"}>
        <div
          className={
            "col-span-3 grid grid-cols-3 border-b border-border-secondary"
          }
        >
          <div
            className={
              "col-span-3 lg:col-span-1 border-r py-xl px-3xl h-[100px] flex flex-col justify-center"
            }
          >
            <ProjectName />
          </div>

          <div
            className={
              "hidden col-span-2 border-r py-xl px-3xl h-full lg:flex items-center"
            }
          >
            <AIGeneratedContentTitle />
          </div>
        </div>

        <div
          className={
            "col-span-3 grid grid-cols-3 h-max lg:min-h-new-email-content"
          }
          style={{
            opacity: optionsLoading || emailLoading ? 0.3 : 1,
            pointerEvents: optionsLoading || emailLoading ? "none" : "unset",
          }}
        >
          <div
            className={
              "col-span-3 lg:col-span-1 border-r flex flex-col p-xl gap-xl"
            }
          >
            <Inputs />
          </div>

          <div className={"hidden lg:block col-span-2 h-full"}>
            <GeneratedOptions />
          </div>
        </div>

        <div
          className={
            "col-span-3 grid grid-cols-3 border-t border-b border-border-secondary"
          }
        >
          <div
            className={
              "col-span-3 lg:col-span-1 flex justify-center border-r py-md px-xl"
            }
          >
            <GenerateAISuggestionsButton />
          </div>

          <div
            className={
              "hidden col-span-2 lg:flex justify-end items-center border-r py-md px-xl"
            }
          >
            <GenerateDesignButton />
          </div>
        </div>

        {/*second column responsive*/}
        {!!subjectOptions.length && (
          <>
            <div
              className={
                "lg:hidden col-span-3 border-b border-border-secondary"
              }
            >
              <div
                className={
                  "w-full border-r py-xl px-3xl h-[80px] flex flex-col justify-center"
                }
              >
                <AIGeneratedContentTitle />
              </div>
            </div>

            <div
              className={
                "lg:hidden col-span-3 h-max lg:min-h-new-email-content"
              }
              style={{
                opacity: optionsLoading || emailLoading ? 0.3 : 1,
                pointerEvents:
                  optionsLoading || emailLoading ? "none" : "unset",
              }}
            >
              <div className={"w-full border-r flex flex-col p-xl gap-xl"}>
                <GeneratedOptions />
              </div>
            </div>

            <div
              className={
                "lg:hidden col-span-3 border-t border-border-secondary"
              }
            >
              <div
                className={"w-full flex justify-center border-r py-md px-xl"}
              >
                <GenerateDesignButton />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ToggleContainer({
  title,
  children,
  icon = true,
}: {
  icon?: boolean;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className={"rounded-[9px] border border-border-primary w-full"}>
      <div
        className={cn(
          "p-xl flex justify-between items-center bg-background-accent-a-light cursor-pointer",
          open ? "rounded-t-[8px]" : "rounded-[8px]",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={"flex gap-md items-center"}>
          {icon && (
            <span
              className={
                "h-[16px] w-[16px] rounded-full border border-dashed border-black"
              }
            />
          )}
          <p className={"font-medium text-[18px] lg:text-[20px]"}>{title}</p>
        </div>

        {open ? <UpIcon /> : <DownIcon className={"w-[20px] h-[20px]"} />}
      </div>

      {open && (
        <div className={"p-xl flex flex-col gap-md text-content-tertiary"}>
          {children}
        </div>
      )}
    </div>
  );
}
