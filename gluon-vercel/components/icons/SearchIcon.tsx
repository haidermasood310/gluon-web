import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function SearchIcon(props: IconProps) {
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
        d="M7 2.333a4.667 4.667 0 1 0 0 9.334 4.667 4.667 0 0 0 0-9.334ZM1.667 7A5.333 5.333 0 1 1 11 10.528l3.236 3.236a.333.333 0 1 1-.472.472L10.528 11a5.333 5.333 0 0 1-8.862-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
