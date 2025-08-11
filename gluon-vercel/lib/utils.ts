import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { showError, showSuccess } from "@/hooks/useToastMessages";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopy = (text: string | undefined) => {
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("toast");
        showSuccess("Copied!");
      })
      .catch(() => {
        showError("Error copying link.");
      });
  }
};
