import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function UserIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox={"0 0 24 24"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.999 2.757a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm-4.25 3.25a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0Zm-2.736 13.8A17.44 17.44 0 0 0 12 21.257a17.44 17.44 0 0 0 6.986-1.45 7 7 0 0 0-13.972 0ZM4 20.117a8 8 0 0 1 15.998 0 .5.5 0 0 1-.292.463A18.434 18.434 0 0 1 12 22.257c-2.75 0-5.36-.6-7.708-1.678a.5.5 0 0 1-.29-.463Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
