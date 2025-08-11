import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function ToBackIcon(props: IconProps) {
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
        d="M8 1.167c.184 0 .334.149.334.333v7.695l1.43-1.43a.333.333 0 1 1 .472.47l-2 2a.333.333 0 0 1-.471 0l-2-2a.333.333 0 0 1 .471-.47l1.431 1.43V1.5c0-.184.15-.333.333-.333ZM5 5.833c-.644 0-1.166.523-1.166 1.167v6c0 .644.522 1.167 1.166 1.167h6c.645 0 1.167-.523 1.167-1.167V7c0-.644-.522-1.167-1.167-1.167h-1a.333.333 0 0 1 0-.666h1c1.013 0 1.834.82 1.834 1.833v6c0 1.013-.821 1.833-1.834 1.833H5A1.833 1.833 0 0 1 3.167 13V7c0-1.012.82-1.833 1.833-1.833h1a.333.333 0 0 1 0 .666H5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
