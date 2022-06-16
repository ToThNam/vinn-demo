import { SVGProps } from "react";

export const FlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"
      fill="#F42F4C"
    />
    <path
      d="M12 14.625L15.7125 17.25L14.325 12.975L18 10.2H13.425L12 6L10.6125 10.2H6L9.675 12.975L8.2875 17.25L12 14.625Z"
      fill="#FFE62E"
    />
  </svg>
);
