'use client';

import { MouseEventHandler, useRef } from 'react';

export interface ButtonGenericProps {
  label: string;
  isDisabled?: boolean;
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
  overrideClasses?: string;
  additionalClasses?: string;
}

export default function ButtonGeneric({
  label,
  isDisabled = false,
  onClickHandler,
  overrideClasses,
  additionalClasses,
}: ButtonGenericProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const buttonClasses = () => {
    let classes = '';

    const defaultClasses =
      'min-w-[90px] h-[40px] flex items-center justify-center rounded text-xs bg-gray border border-white text-white cursor-pointer select-none';

    classes = defaultClasses;
    if (additionalClasses) {
      classes += `${defaultClasses} ${additionalClasses}`;
    }
    if (isDisabled) {
      classes +=
        ' !bg-transparent !font-semibold';
    }
    if (overrideClasses) {
      classes = overrideClasses;
    }

    return classes;
  };

  return (
    <div
      ref={buttonRef}
      className={buttonClasses()}
      onClick={!isDisabled && onClickHandler ? onClickHandler : () => { }}
    >
      <span className="mx-[6px]">{label}</span>
    </div>
  );
}
