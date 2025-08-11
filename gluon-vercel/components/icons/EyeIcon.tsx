import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function EyeIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox={"0 0 20 20"}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 4.167a8.337 8.337 0 0 0-7.909 5.7.426.426 0 0 0 0 .27 8.337 8.337 0 0 0 15.817-.005.427.427 0 0 0 0-.269 8.337 8.337 0 0 0-7.907-5.696ZM1.3 9.605A9.17 9.17 0 0 1 18.7 9.6a1.26 1.26 0 0 1 0 .795 9.17 9.17 0 0 1-17.398.005 1.26 1.26 0 0 1 0-.795ZM10 7.917a2.083 2.083 0 1 0 0 4.166 2.083 2.083 0 0 0 0-4.166ZM7.083 10a2.917 2.917 0 1 1 5.834 0 2.917 2.917 0 0 1-5.834 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
