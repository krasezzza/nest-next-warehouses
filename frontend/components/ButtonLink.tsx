'use client';

import Link from "next/link";

export interface ButtonLinkProps {
  label: string;
  route: string;
  overrideClasses?: string;
}

export default function ButtonLink({
  label,
  route,
  overrideClasses,
}: ButtonLinkProps) {
  const buttonClasses = () => {
    let classes = 'px-[12px] h-[40px] flex items-center justify-center bg-gray border border-white text-white cursor-pointer select-none';

    if (overrideClasses) {
      classes = overrideClasses;
    }

    return classes;
  };

  return (
    <Link href={route} className={buttonClasses()}>{label}</Link>
  )
}
