import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function LinkIcon(props: IconProps) {
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
        d="M13.386 2.614a2.667 2.667 0 0 0-3.772 0l-3 3a2.667 2.667 0 0 0 .736 4.293.333.333 0 0 1-.287.602 3.333 3.333 0 0 1-.92-5.366l3-3a3.333 3.333 0 0 1 4.714 4.714l-1.171 1.171a.333.333 0 0 1-.472-.471l1.171-1.171a2.667 2.667 0 0 0 0-3.772ZM8.492 5.65a.333.333 0 0 1 .444-.157 3.333 3.333 0 0 1 .92 5.366l-3 3a3.333 3.333 0 1 1-4.714-4.715l1.171-1.171a.333.333 0 0 1 .472.471L2.614 9.614a2.667 2.667 0 0 0 3.771 3.772l3-3a2.667 2.667 0 0 0-.735-4.293.333.333 0 0 1-.157-.444Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
