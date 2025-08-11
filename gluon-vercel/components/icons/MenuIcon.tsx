import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox={"0 0 20 20"}
      fill="none"
      {...props}
    >
      <path
        fill="#374151"
        fillRule="evenodd"
        d="M2.708 5.625c0-.23.187-.417.417-.417h13.75a.417.417 0 0 1 0 .834H3.125a.417.417 0 0 1-.417-.417Zm0 4.375c0-.23.187-.417.417-.417h13.75a.417.417 0 0 1 0 .834H3.125A.417.417 0 0 1 2.708 10Zm0 4.375c0-.23.187-.417.417-.417H10a.417.417 0 1 1 0 .834H3.125a.417.417 0 0 1-.417-.417Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
