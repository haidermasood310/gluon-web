import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function CenterIcon(props: IconProps) {
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
        d="M8 1.333v2m0 11.334v-2m0-3.333V6.667"
      />
      <path
        stroke="currentColor"
        strokeWidth={0.6}
        d="M3.334 5c0-.623 0-.934.134-1.167a1 1 0 0 1 .366-.366c.232-.134.544-.134 1.167-.134h6c.623 0 .934 0 1.166.134a1 1 0 0 1 .366.366c.134.233.134.544.134 1.167s0 .935-.134 1.167a1 1 0 0 1-.366.366c-.232.134-.543.134-1.166.134H5c-.623 0-.935 0-1.167-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.544-.134-1.167ZM4.666 11c0-.623 0-.935.134-1.167a1 1 0 0 1 .366-.366c.232-.134.544-.134 1.167-.134h3.333c.623 0 .935 0 1.167.134a1 1 0 0 1 .366.366c.134.232.134.544.134 1.167s0 .934-.134 1.167a1 1 0 0 1-.366.366c-.232.134-.544.134-1.167.134H6.333c-.623 0-.935 0-1.167-.134a1 1 0 0 1-.366-.366c-.134-.232-.134-.544-.134-1.167Z"
      />
    </svg>
  );
}
