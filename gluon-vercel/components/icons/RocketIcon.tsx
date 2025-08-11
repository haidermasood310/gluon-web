import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function RocketIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <path
        fill="#374151"
        fillRule="evenodd"
        d="M12.42 10.111C16.26 5.177 22.26 2.002 29 2a1 1 0 0 1 1 1c0 6.74-3.177 12.74-8.111 16.581A9 9 0 0 1 13 30a1 1 0 0 1-1-1v-5.509A21.124 21.124 0 0 1 8.51 20H3a1 1 0 0 1-1-1 9 9 0 0 1 10.42-8.889ZM20 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        clipRule="evenodd"
      />
      <path
        fill="#374151"
        d="M7.014 22.99a1 1 0 0 0-1.196-1.604 6.991 6.991 0 0 0-2.735 6.696 1 1 0 0 0 .835.835 6.991 6.991 0 0 0 6.696-2.735 1 1 0 0 0-1.603-1.196A4.991 4.991 0 0 1 5 27c0-1.641.79-3.098 2.014-4.01Z"
      />
    </svg>
  );
}
