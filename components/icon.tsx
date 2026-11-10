import type { ReactNode } from "react";
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    chat: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.6 7.2L4 20l1.3-4.4A8 8 0 1 1 20 11.5Z" />
        <path d="M8 8c1 4 2 5 6 6l2-2-2-1-1 1-2-2 1-1-1-2Z" />
      </>
    ),
    bath: (
      <>
        <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5ZM6 12V5a3 3 0 0 1 6 0M9 7h6M7 20v2m10-2v2M18 5v2m3 2v1" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="m8 8 13 13M8 16 21 3" />
      </>
    ),
    bowl: <path d="M3 12h18l-2 8H5ZM4 12l2-5h12l2 5M9 4V2m6 2V2" />,
    ball: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M4 7c7-1 6 12 16 10M7 4c-1 7 12 6 10 16" />
      </>
    ),
    collar: (
      <>
        <rect x="3" y="7" width="18" height="8" rx="3" />
        <path d="M9 7v8m6-8v8m-3 0v3" />
        <circle cx="12" cy="20" r="2" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    heart: <path d="M12 20 4 12C-3 4 7-1 12 6c5-7 15-2 8 6Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.heart}
    </svg>
  );
}
