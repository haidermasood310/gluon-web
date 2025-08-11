import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function MinusIcon(props: IconProps) {
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
        d="M3 8c0-.184.15-.333.333-.333h9.334a.333.333 0 0 1 0 .666H3.333A.333.333 0 0 1 3 8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
