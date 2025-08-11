import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function PlusIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      viewBox={"0 0 17 16"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.5 2.667c.184 0 .333.149.333.333v4.667H13.5a.333.333 0 1 1 0 .666H8.833V13a.333.333 0 0 1-.667 0V8.333H3.5a.333.333 0 1 1 0-.666h4.666V3c0-.184.15-.333.334-.333Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
