import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function UnderlineIcon(props: IconProps) {
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
        d="M4 12.5h8.666V14H4v-1.5ZM9.777 2v1.5h.723V8c0 1.24-.973 2.25-2.167 2.25-1.195 0-2.167-1.01-2.167-2.25V3.5h.722V2H4v1.5h.722V8c0 2.068 1.62 3.75 3.61 3.75 1.992 0 3.612-1.682 3.612-3.75V3.5h.722V2H9.777Z"
      />
    </svg>
  );
}
