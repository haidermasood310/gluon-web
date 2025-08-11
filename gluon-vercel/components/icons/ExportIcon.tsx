import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function ExportIcon(props: IconProps) {
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
        d="M12.5 1.833a1.167 1.167 0 1 0 0 2.334 1.167 1.167 0 0 0 0-2.334ZM10.667 3a1.833 1.833 0 1 1 .42 1.167L5.237 7.416a1.831 1.831 0 0 1 0 1.168l5.848 3.25a1.833 1.833 0 1 1-.324.583l-5.848-3.25a1.833 1.833 0 1 1 0-2.334l5.848-3.249A1.83 1.83 0 0 1 10.667 3ZM3.5 6.833a1.167 1.167 0 1 0 0 2.334 1.167 1.167 0 0 0 0-2.334Zm9 5a1.166 1.166 0 1 0 0 2.333 1.166 1.166 0 0 0 0-2.333Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
