"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import HomeIcon from "@/components/icons/HomeIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import MailFilledIcon from "@/components/icons/MailFilledIcon";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

type Tab = "Home" | "Emails";

const tabs: {
  to?: string;
  label: Tab;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  { label: "Home", icon: <HomeIcon />, to: "/" },
  {
    label: "Emails",
    icon: <MailFilledIcon className={"h-[20px] w-[20px]"} />,
    to: "/campaigns",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<Tab | "">("Home");
  const { user } = useAuthStore();
  const { sidebarOpen } = useAppStore();
  const { logout } = useUser();

  return (
    <div
      className={cn(
        "flex bg-purple-200 w-fit h-[100vh] overflow-y-scroll scroll-container flex-col justify-between gap-[20px] border-r",
        sidebarOpen ? "flex" : "",
      )}
    >
      <div className={"flex flex-col gap-xl h-full"}>
        <MenuIcon className={"m-lg"} />

        <div
          className={
            "flex flex-col justify-between items-center flex-1 gap-xl pb-xl"
          }
        >
          {!pathname.includes("/payment") ? (
            <div className={"flex flex-col items-center flex-1 gap-sm"}>
              {tabs.map((item) => (
                <Link key={item.label} href={item.to ?? "/"}>
                  <button
                    disabled={item.disabled}
                    onClick={() => setSelected(item.label)}
                    className={cn(
                      "w-full p-lg text-[14px] rounded-[8px] flex items-center text-content-secondary hover:opacity-70 disabled:hover:text-gray-100 disabled:hover:cursor-not-allowed",
                    )}
                  >
                    {item.icon}
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <div />
          )}

          <LogoutIcon
            className={"h-[20px] w-[20px] cursor-pointer"}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}
