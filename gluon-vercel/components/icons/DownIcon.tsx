import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function DownIcon(props: IconProps) {
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
        d="M12.354 16.108a.5.5 0 0 1-.708 0l-7.5-7.5a.5.5 0 1 1 .708-.707L12 15.048 19.146 7.9a.5.5 0 0 1 .708.707l-7.5 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
