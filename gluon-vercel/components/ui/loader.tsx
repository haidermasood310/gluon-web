import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div
      className={
        "flex h-full p-6 justify-center items-center w-full animate-spin text-content-accent-a"
      }
    >
      <LoaderCircle />
    </div>
  );
}
