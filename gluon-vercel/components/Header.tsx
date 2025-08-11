"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/SearchIcon";
import { useRouter } from "next/navigation";
import LeftIcon from "@/components/icons/LeftIcon";

export default function Header({
  showBack = true,
  showSearch = true,
  backTo,
  button,
}: {
  showBack?: boolean;
  showSearch?: boolean;
  backTo?: string;
  button?: ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      className={
        "px-3xl py-lg h-[60px] flex justify-between items-center border-b absolute top-0"
      }
      style={{ width: "-webkit-fill-available" }}
    >
      {showBack ? (
        <Button
          variant={"outline"}
          onClick={() => (backTo ? router.replace(backTo) : router.back())}
        >
          <LeftIcon />
          Back
        </Button>
      ) : (
        <p className={"text-[20px] text-content-secondary font-medium"}>
          Featured
        </p>
      )}

      <div className={"flex items-center gap-lg"}>
        {showSearch && (
          <div
            className={
              "hidden md:flex rounded-[6px] border py-md px-xl items-center gap-md shadow-sm"
            }
          >
            <SearchIcon className={"text-content-secondary"} />

            <Input
              className={"border-none h-fit p-0 bg-transparent shadow-none"}
              placeholder={"Search"}
            />
          </div>
        )}

        {button}
      </div>
    </div>
  );
}
