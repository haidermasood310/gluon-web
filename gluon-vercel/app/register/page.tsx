"use client";

import { Input } from "@/components/ui/input";
import MailIcon from "@/components/icons/MailIcon";
import LockIcon from "@/components/icons/LockIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import UserIcon from "@/components/icons/UserIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import supabase from "@/config/supabaseClient";
import { showError, showSuccess } from "@/hooks/useToastMessages";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (name && email && password) {
      setLoading(true);

      // Call Supabase's signUp method with email and password.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // Optionally include additional user metadata:
        options: {
          data: { name },
        },
      });

      if (error) {
        showError(error.message);
      } else {
        // If email confirmations are enabled, user may need to verify their email.
        showSuccess("Sign up successful!");
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      }
      setLoading(false);
    } else showError("Please fill all fields!");
  };

  // Handle Google sign-in via OAuth
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://app.getgluon.ai/`, // Custom redirect after sign-in
        queryParams: { prompt: "select_account" }, // Force the account chooser to appear
      },
    });
    if (error) {
      showError(error.message);
    }
  };

  return (
    <div
      className={
        "w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-y-scroll"
      }
    >
      <div
        className={
          "hidden lg:flex col-span-1 w-full h-full justify-center items-center p-[48px] leading-tight"
        }
        style={{
          background: `url(./auth-bg.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className={"flex flex-col justify-between gap-[300px]"}>
          <div>
            <p className={"text-[56px] font-semibold"}>
              Campaigns don’t write themselves — but your AI marketer does.
            </p>

            <p className={"text-[30px] font-medium mt-[24px]"}>
              Meet your agentic marketing workforce: ready in under 60 seconds.
            </p>
          </div>

          <p className={"text-[30px] font-semibold "}>
            Lifecycle, retention, optimization, conversion — done.
          </p>
        </div>
      </div>
      <div
        className={
          "col-span-1 h-full w-full flex justify-center items-center p-[30px]"
        }
        style={{
          background: `#EB5DAB1C`,
          backgroundImage: `url(./auth-right-bg.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={
            "h-[100%] w-[100%] md:w-[70%] max-w-[100%] bg-white rounded-[8px] border border-border-secondary flex flex-col items-center gap-3xl p-3xl"
          }
          style={{
            boxShadow: "-8px 4px 48px -16px rgba(0, 0, 0, 0.20)",
          }}
        >
          <img src={"/logo.svg"} alt={""} className={"h-[48px]"} />

          <div className={"flex flex-col gap-[4px] items-center w-full"}>
            <p className={"font-satoshi font-medium text-[24px]"}>
              Hey there! Welcome to Gluon
            </p>

            <p className={"text-content-secondary"}>
              Create your Gluon account and get started!
            </p>

            <div className={"flex flex-col items-center mt-[24px] w-full"}>
              <div
                className={
                  "rounded-[6px] border border-border-primary h-[36px] flex items-center w-full"
                }
              >
                <div
                  className={
                    "h-full aspect-square border-r flex justify-center items-center bg-background-tertiary rounded-l-[6px]"
                  }
                >
                  <UserIcon className={"text-content-secondary h-[20px]"} />
                </div>

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={"border-none bg-transparent h-fit py-0"}
                  placeholder={"Name"}
                />
              </div>

              <div
                className={
                  "rounded-[6px] border border-border-primary h-[36px] flex items-center w-full mt-lg"
                }
              >
                <div
                  className={
                    "h-full aspect-square border-r flex justify-center items-center bg-background-tertiary rounded-l-[6px]"
                  }
                >
                  <MailIcon className={"text-content-secondary h-[20px]"} />
                </div>

                <div className={"w-full"}>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={"border-none bg-transparent h-fit py-0 w-full"}
                    placeholder={"Email"}
                  />
                </div>
              </div>

              <div
                className={
                  "rounded-[6px] border border-border-primary h-[36px] flex items-center w-full mt-lg"
                }
              >
                <div
                  className={
                    "h-full aspect-square border-r flex justify-center items-center bg-background-tertiary rounded-l-[6px]"
                  }
                >
                  <LockIcon className={"text-content-secondary h-[20px]"} />
                </div>

                <div
                  className={
                    "flex items-center justify-between w-full pr-[8px]"
                  }
                >
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className={"border-none bg-transparent flex-1  h-fit py-0"}
                    placeholder={"Password"}
                  />

                  <EyeIcon
                    className={"text-content-secondary h-[20px] cursor-pointer"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>

              <Button
                className={"w-full my-2xl"}
                onClick={handleSignUp}
                loading={loading}
              >
                Sign up
              </Button>

              <div
                className={
                  "flex items-center justify-center text-content-accent-a w-full"
                }
              >
                <Link href={"/login"}>
                  <p>Already a user? Login</p>
                </Link>
              </div>

              <div
                className={
                  "flex items-center justify-between text-content-tertiary text-[12px] gap-xl my-3xl w-full"
                }
              >
                <span className={"flex-1 border-b"} />

                <p>OR</p>

                <span className={"flex-1 border-b"} />
              </div>

              <Button
                className={"w-full"}
                variant={"outline"}
                onClick={handleGoogleSignIn}
              >
                <img src={"/google.svg"} alt={""} />
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
