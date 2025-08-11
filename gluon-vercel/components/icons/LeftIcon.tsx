import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function LeftIcon(props: IconProps) {
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
        d="M5.264 8.236a.333.333 0 0 1 0-.472l5-5a.333.333 0 1 1 .472.472L5.97 8l4.764 4.764a.333.333 0 1 1-.47.472l-5-5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
