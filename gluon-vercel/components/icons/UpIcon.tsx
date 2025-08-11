import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function UpIcon(props: IconProps) {
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
        fill="currentColor"
        fillRule="evenodd"
        d="M9.705 6.58a.417.417 0 0 1 .59 0l6.25 6.25a.417.417 0 1 1-.59.59L10 7.464 4.044 13.42a.417.417 0 0 1-.589-.59l6.25-6.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
