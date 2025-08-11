import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function HomeIcon(props: IconProps) {
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
        d="M9.558 3.2a.625.625 0 0 1 .884 0l7.241 7.242a.625.625 0 1 0 .884-.884l-7.241-7.241a1.875 1.875 0 0 0-2.652 0l-7.24 7.241a.625.625 0 0 0 .883.884l7.241-7.241Z"
      />
      <path
        fill="currentColor"
        d="m10 4.527 6.8 6.799c.024.025.05.049.075.072v5.165c0 .863-.7 1.562-1.563 1.562H12.5a.625.625 0 0 1-.625-.625v-3.75a.625.625 0 0 0-.625-.625h-2.5a.625.625 0 0 0-.625.625v3.75c0 .345-.28.625-.625.625H4.687c-.862 0-1.562-.7-1.562-1.562v-5.165c.026-.023.051-.047.076-.072L10 4.526Z"
      />
    </svg>
  );
}
