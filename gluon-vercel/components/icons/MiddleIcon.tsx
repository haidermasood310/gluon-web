import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function MiddleIcon(props: IconProps) {
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
        d="M14.667 8h-2M1.334 8h2m3.333 0h2.667"
      />
      <path
        stroke="currentColor"
        strokeWidth={0.6}
        d="M11 3.333c.623 0 .935 0 1.167.134a1 1 0 0 1 .366.366c.134.233.134.544.134 1.167v6c0 .623 0 .935-.134 1.167a1 1 0 0 1-.366.366c-.232.134-.544.134-1.167.134s-.934 0-1.166-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.544-.134-1.167V5c0-.623 0-.934.134-1.167a1 1 0 0 1 .366-.366c.232-.134.543-.134 1.166-.134ZM5 4.666c.623 0 .935 0 1.167.134a1 1 0 0 1 .366.366c.134.232.134.544.134 1.167v3.333c0 .623 0 .935-.134 1.167a1 1 0 0 1-.366.366c-.232.134-.544.134-1.167.134s-.934 0-1.166-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.544-.134-1.167V6.333c0-.623 0-.935.134-1.167a1 1 0 0 1 .366-.366c.232-.134.543-.134 1.166-.134Z"
      />
    </svg>
  );
}
