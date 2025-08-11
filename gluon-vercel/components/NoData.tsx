export default function NoData({ children }: { children: string }) {
  return (
    <div
      className={
        "h-[300px] flex justify-center items-center text-content-tertiary"
      }
    >
      <p>{children}</p>
    </div>
  );
}
