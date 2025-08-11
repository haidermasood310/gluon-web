import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function BottomIcon(props: IconProps) {
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
        d="M1.333 14h13.333"
      />
      <path
        stroke="currentColor"
        strokeWidth={0.6}
        d="M5 11.333c-.622 0-.934 0-1.166-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.543-.134-1.166v-6c0-.623 0-.935.134-1.167a1 1 0 0 1 .366-.366C4.066 2 4.378 2 5.001 2s.934 0 1.166.134a1 1 0 0 1 .366.366c.134.232.134.544.134 1.167v6c0 .623 0 .934-.134 1.166a1 1 0 0 1-.366.366c-.232.134-.543.134-1.166.134ZM11 11.334c-.623 0-.935 0-1.167-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.544-.134-1.167v-4c0-.623 0-.935.134-1.167a1 1 0 0 1 .366-.366C10.065 4 10.377 4 11 4s.934 0 1.166.134a1 1 0 0 1 .366.366c.134.232.134.544.134 1.167v4c0 .623 0 .934-.134 1.167a1 1 0 0 1-.366.366c-.232.134-.543.134-1.166.134Z"
      />
    </svg>
  );
}
