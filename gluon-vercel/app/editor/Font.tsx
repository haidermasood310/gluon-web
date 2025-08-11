"use client";

export default function Font() {
  const listItemClassName =
    "border border-border-secondary flex items-center px-lg py-md rounded-[8px] cursor-pointer hover:border-border-primary font-medium";

  return (
    <div className={"w-full h-fit border border-border-primary rounded-[8px]"}>
      <div
        className={
          "bg-background-accent-a-light p-xl rounded-t-[8px] text-[20px] font-medium"
        }
      >
        Font
      </div>

      <div
        className={
          "p-xl flex flex-col gap-md text-content-tertiary font-medium"
        }
      >
        <div className={listItemClassName}>Satoshi</div>

        <div className={listItemClassName} style={{ fontFamily: "Salsa" }}>
          Salsa
        </div>

        <div className={listItemClassName} style={{ fontFamily: "Rockwell" }}>
          Rockwell
        </div>

        <div className={listItemClassName} style={{ fontFamily: "Almarai" }}>
          Almarai
        </div>
      </div>
    </div>
  );
}
