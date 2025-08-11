import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function AlphabetIcon(props: IconProps) {
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
        d="M5.427 9.714h5.143l.836 1.715h1.888L8.944 2H7.055l-4.352 9.429H4.59l.836-1.715ZM8 4.045 9.824 8h-3.65l1.825-3.955ZM2 12.286h12V14H2v-1.714Z"
      />
    </svg>
  );
}
