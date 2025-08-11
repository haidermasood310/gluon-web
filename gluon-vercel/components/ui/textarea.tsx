"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tooltip?: string | ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tooltip, ...props }, ref) => {
    const [hover, setHover] = useState(false);

    return (
      <div className={"relative"}>
        <textarea
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={cn(
            "flex min-h-[80px] border-border-primary shadow-sm font-satoshi w-full rounded-md border bg-background px-3 py-2 text-sm md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-content-disabled focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />

        {hover && tooltip && (
          <div
            className={
              "border-2 border-background-accent-a-disabled rounded-[8px] text-content-tertiary py-[20px] px-[24px] absolute top-[50%] -translate-y-[50%] bg-white w-max max-w-[300px]"
            }
            style={{
              left: "calc(100% + 12px)",
            }}
          >
            {tooltip}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
