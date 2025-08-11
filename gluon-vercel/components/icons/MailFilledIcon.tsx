import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function MailFilledIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox={"0 0 32 32"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2 11.559V23a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V11.559l-11.904 7.325a4 4 0 0 1-4.192 0L2 11.56Z"
      />
      <path
        fill="currentColor"
        d="M30 9.21V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v.21l12.952 7.97a2 2 0 0 0 2.096 0L30 9.21Z"
      />
    </svg>
  );
}
