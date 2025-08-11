import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function SaveIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox={"0 0 24 24"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.5 5.005a4.75 4.75 0 0 0-4.668 5.633.5.5 0 0 1-.335.567 4.002 4.002 0 0 0 1.253 7.8H18a3.25 3.25 0 0 0 1.154-6.29.5.5 0 0 1-.294-.632 2.5 2.5 0 0 0-3.132-3.206.5.5 0 0 1-.637-.348A4.752 4.752 0 0 0 10.5 5.005Zm-5.75 4.75a5.75 5.75 0 0 1 11.16-1.95 3.5 3.5 0 0 1 4.017 4.162A4.25 4.25 0 0 1 18 20.005H6.751a5 5 0 0 1-1.964-9.6 5.805 5.805 0 0 1-.036-.651Zm6.896-.354a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.707L12.5 10.962v5.543a.5.5 0 0 1-1 0v-5.543l-2.146 2.146a.5.5 0 1 1-.708-.707l3-3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
