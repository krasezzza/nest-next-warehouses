'use client';

export interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function IconCheck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 27 20"
      fill="none"
      className="w-[14px] h-[10px]"
      {...props}
    >
      <path
        d="M0 10.4031L9.59693 20L26.8714 2.72553L24.1651 0L9.59693 14.5681L2.70633 7.69674L0 10.4031Z"
        fill="currentColor"
      />
    </svg>
  );
}
