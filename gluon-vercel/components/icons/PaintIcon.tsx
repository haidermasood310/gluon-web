import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function PaintIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox={"0 0 12 12"}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="#374151"
          fillRule="evenodd"
          d="M9.841 1.014a.826.826 0 0 1 1.145 1.145L9.048 5.066a8.248 8.248 0 0 1-3.971 3.15c.031.13.048.268.048.409v.012m-1.34-1.714a8.248 8.248 0 0 1 3.15-3.971L9.84 1.014M3.806 7.452a1.25 1.25 0 0 0-1.682 1.173c0 .63-.422 1.16-.999 1.323a2 2 0 0 0 3.5-1.314v-.009a1.246 1.246 0 0 0-.768-1.15.251.251 0 0 1-.05-.023Zm.443-.343c.266.154.488.376.642.642.433-.161.849-.36 1.243-.594a3.14 3.14 0 0 0-1.291-1.291c-.234.394-.433.81-.594 1.243Zm.863-1.666a3.64 3.64 0 0 1 1.445 1.445 7.747 7.747 0 0 0 2.075-2.1l1.938-2.907a.325.325 0 0 0-.452-.451L7.211 3.368a7.747 7.747 0 0 0-2.099 2.075Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
