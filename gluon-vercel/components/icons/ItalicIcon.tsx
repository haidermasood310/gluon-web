import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function ItalicIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox={"0 0 16 16"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.296 4.002H8V2h5.334v2.002h-1.729l-4.613 7.996H8V14H2.667v-2.002h2.016l4.613-7.996Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
