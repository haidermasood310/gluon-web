import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  selected: boolean;
  setSelected: (selected: boolean) => void;
};

export default function Radio({ children, selected, setSelected }: Props) {
  return (
    <div
      onClick={() => setSelected(!selected)}
      className={"cursor-pointer flex gap-md items-center group"}
    >
      <span
        className={"h-[18px] flex aspect-square border rounded-full p-[2px]"}
      >
        <span
          className={cn(
            "h-full w-full aspect-square rounded-full",
            selected
              ? "bg-[#D8BFF3]/70"
              : "bg-transparent group-hover:bg-[#D8BFF3]/30",
          )}
        />
      </span>
      {children}
    </div>
  );
}
