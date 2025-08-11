import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function RightPositionIcon(props: IconProps) {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={0.6}
        d="M14 1.333v13.334"
      />
      <path
        stroke="currentColor"
        strokeWidth={0.6}
        d="M11.333 5c0-.623 0-.935-.134-1.167a1 1 0 0 0-.366-.366c-.232-.134-.544-.134-1.167-.134h-6c-.623 0-.934 0-1.166.134a1 1 0 0 0-.366.366C2 4.065 2 4.377 2 5s0 .935.134 1.167a1 1 0 0 0 .366.366c.232.134.543.134 1.166.134h6c.623 0 .935 0 1.167-.134a1 1 0 0 0 .366-.366c.134-.232.134-.544.134-1.167ZM11.333 11c0-.623 0-.935-.134-1.167a1 1 0 0 0-.366-.366c-.232-.134-.544-.134-1.167-.134h-4c-.623 0-.934 0-1.166.134a1 1 0 0 0-.366.366C4 10.065 4 10.377 4 11s0 .934.134 1.167a1 1 0 0 0 .366.366c.232.134.543.134 1.166.134h4c.623 0 .935 0 1.167-.134a1 1 0 0 0 .366-.366c.134-.232.134-.544.134-1.167Z"
      />
    </svg>
  );
}
