import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function MailIcon(props: IconProps) {
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
        d="M1.75 6.752a2.75 2.75 0 0 1 2.75-2.75h15a2.75 2.75 0 0 1 2.75 2.75v10.5a2.75 2.75 0 0 1-2.75 2.75h-15a2.75 2.75 0 0 1-2.75-2.75v-10.5Zm1 0v.243c0 .607.315 1.172.833 1.49l7.5 4.616a1.75 1.75 0 0 0 1.834 0l7.5-4.616a1.75 1.75 0 0 0 .833-1.49v-.243a1.75 1.75 0 0 0-1.75-1.75h-15a1.75 1.75 0 0 0-1.75 1.75Zm18.5 2.364c-.097.08-.2.154-.309.22l-7.5 4.616a2.75 2.75 0 0 1-2.882 0l-7.5-4.615a2.752 2.752 0 0 1-.309-.221v8.136c0 .966.784 1.75 1.75 1.75h15a1.75 1.75 0 0 0 1.75-1.75V9.116Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
