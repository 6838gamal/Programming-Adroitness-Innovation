import { cn } from "@/lib/utils";
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>PAI Smart Academy Logo</title>
      <path d="M8 3V7C8 9.20914 9.79086 11 12 11H13" className="stroke-primary"/>
      <path d="M8 21V17C8 14.7909 9.79086 13 12 13H13" className="stroke-primary"/>
      <path d="M16 3L16 21" className="stroke-accent" />
      <path d="M12 11L12 13" className="stroke-primary" />
    </svg>
  );
}
