import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export default function FileUploadIcon(props: IconProps) {
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
        d="M3.75 1.833a.417.417 0 0 0-.417.417v11.5c0 .23.187.417.417.417h8.5c.23 0 .416-.187.416-.417v-6a1.917 1.917 0 0 0-1.916-1.917h-1A1.083 1.083 0 0 1 8.666 4.75v-1A1.917 1.917 0 0 0 6.75 1.833h-3Zm0-.666c-.598 0-1.083.485-1.083 1.083v11.5c0 .598.485 1.083 1.083 1.083h8.5c.598 0 1.083-.485 1.083-1.083V7.5A6.333 6.333 0 0 0 7 1.167H3.75Zm4.993.94c.369.446.59 1.019.59 1.643v1c0 .23.187.417.417.417h1c.624 0 1.197.221 1.643.59a5.68 5.68 0 0 0-3.65-3.65ZM8 7.167c.088 0 .173.035.236.097l2 2a.333.333 0 1 1-.472.472l-1.43-1.431V11.5a.333.333 0 0 1-.667 0V8.305l-1.431 1.43a.333.333 0 1 1-.472-.47l2-2A.333.333 0 0 1 8 7.166Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
