import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function LogoutIcon(props: IconProps) {
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
        d="M7.5 3.5a1.75 1.75 0 0 0-1.75 1.75v13.5c0 .966.784 1.75 1.75 1.75h6a1.75 1.75 0 0 0 1.75-1.75V15a.5.5 0 0 1 1 0v3.75a2.75 2.75 0 0 1-2.75 2.75h-6a2.75 2.75 0 0 1-2.75-2.75V5.25A2.75 2.75 0 0 1 7.5 2.5h6a2.75 2.75 0 0 1 2.75 2.75V9a.5.5 0 0 1-1 0V5.25A1.75 1.75 0 0 0 13.5 3.5h-6Zm10.896 5.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l2.147-2.146H9a.5.5 0 0 1 0-1h11.543l-2.147-2.146a.5.5 0 0 1 0-.708Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
