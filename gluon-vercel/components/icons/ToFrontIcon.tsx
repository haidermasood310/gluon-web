import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function ToFrontIcon(props: IconProps) {
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
        d="M7.765 1.264c.13-.13.34-.13.471 0l2 2a.333.333 0 1 1-.471.472L8.334 2.305V10a.333.333 0 0 1-.667 0V2.305l-1.431 1.43a.333.333 0 1 1-.471-.47l2-2ZM5 5.834c-.644 0-1.166.522-1.166 1.166v6c0 .644.522 1.167 1.166 1.167h6c.645 0 1.167-.523 1.167-1.167V7c0-.644-.522-1.167-1.167-1.167h-1a.333.333 0 0 1 0-.666h1c1.013 0 1.834.82 1.834 1.833v6c0 1.013-.821 1.833-1.834 1.833H5A1.833 1.833 0 0 1 3.167 13V7c0-1.012.82-1.833 1.833-1.833h1a.333.333 0 0 1 0 .666H5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
