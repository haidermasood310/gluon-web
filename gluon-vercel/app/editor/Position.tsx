"use client";

import RightPositionIcon from "@/components/icons/RightPositionIcon";
import BottomIcon from "@/components/icons/BottomIcon";
import CenterIcon from "@/components/icons/CenterIcon";
import MiddleIcon from "@/components/icons/MiddleIcon";
import LeftPositionIcon from "@/components/icons/LeftPositionIcon";
import TopIcon from "@/components/icons/TopIcon";
import ToBackIcon from "@/components/icons/ToBackIcon";
import ToFrontIcon from "@/components/icons/ToFrontIcon";
import BackwardIcon from "@/components/icons/BackwardIcon";
import ForwardIcon from "@/components/icons/ForwardIcon";

export default function Position() {
  const listItemClassName =
    "col-span-1 border border-border-secondary flex gap-md items-center px-lg py-md rounded-[8px] cursor-pointer hover:border-border-primary";

  return (
    <div className={"w-full h-fit border border-border-primary rounded-[8px]"}>
      <div
        className={
          "bg-background-accent-a-light p-xl rounded-t-[8px] text-[20px] font-medium"
        }
      >
        Position
      </div>

      <div className={"p-xl"}>
        <div
          className={
            "grid grid-cols-2 gap-md text-content-tertiary font-medium"
          }
        >
          <div className={listItemClassName}>
            <ForwardIcon />
            Forward
          </div>

          <div className={listItemClassName}>
            <BackwardIcon />
            Backward
          </div>

          <div className={listItemClassName}>
            <ToFrontIcon />
            To Front
          </div>

          <div className={listItemClassName}>
            <ToBackIcon />
            To Back
          </div>
        </div>

        <p className={"text-[16px] font-medium mt-3xl mb-lg"}>Align</p>

        <div
          className={
            "grid grid-cols-2 gap-md text-content-tertiary font-medium"
          }
        >
          <div className={listItemClassName}>
            <TopIcon />
            Top
          </div>

          <div className={listItemClassName}>
            <LeftPositionIcon />
            Left
          </div>

          <div className={listItemClassName}>
            <MiddleIcon />
            Middle
          </div>

          <div className={listItemClassName}>
            <CenterIcon />
            Center
          </div>

          <div className={listItemClassName}>
            <BottomIcon />
            Bottom
          </div>

          <div className={listItemClassName}>
            <RightPositionIcon />
            Right
          </div>
        </div>
      </div>
    </div>
  );
}
