import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function LockIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={20}
      viewBox={"0 0 21 20"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.053 5.625a4.167 4.167 0 0 1 8.334 0v2.708h.208a2.292 2.292 0 0 1 2.292 2.292v5.625a2.292 2.292 0 0 1-2.292 2.292h-8.75a2.292 2.292 0 0 1-2.292-2.292v-5.625a2.292 2.292 0 0 1 2.292-2.292h.208V5.625Zm-.208 3.542c-.805 0-1.458.652-1.458 1.458v5.625c0 .805.653 1.458 1.458 1.458h8.75c.805 0 1.458-.653 1.458-1.458v-5.625c0-.806-.653-1.458-1.458-1.458h-8.75Zm7.708-.834H6.887V5.625a3.333 3.333 0 1 1 6.666 0v2.708Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
