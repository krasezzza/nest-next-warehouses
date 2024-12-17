'use client';

import ButtonGeneric from './ButtonGeneric';

interface ButtonPrimaryProps {
  label: string;
  isDisabled?: boolean;
  onClickHandler?: () => void;
  additionalButtonClasses?: string;
}

export default function ButtonPrimary({
  label,
  isDisabled,
  onClickHandler,
  additionalButtonClasses,
}: ButtonPrimaryProps) {
  const additionalClasses = () => {
    let classes =
      '!bg-primary !text-sm !font-semibold';

    if (additionalButtonClasses) {
      classes += ` ${additionalButtonClasses}`;
    }

    return classes;
  };

  return (
    <ButtonGeneric
      isDisabled={isDisabled}
      label={label}
      onClickHandler={(e) => {
        if (onClickHandler) {
          e.preventDefault();
          onClickHandler();
        }
      }}
      additionalClasses={additionalClasses()}
    />
  );
}
