'use client';

import ButtonGeneric from './ButtonGeneric';

interface ButtonSecondaryProps {
  label: string;
  isDisabled?: boolean;
  onClickHandler?: () => void;
  additionalButtonClasses?: string;
}

export default function ButtonSecondary({
  label,
  isDisabled,
  onClickHandler,
  additionalButtonClasses,
}: ButtonSecondaryProps) {
  const additionalClasses = () => {
    let classes =
      '!bg-secondary !text-sm !font-normal';

    if (additionalButtonClasses) {
      classes += ` ${additionalButtonClasses}`;
    }

    return classes;
  };

  return (
    <ButtonGeneric
      isDisabled={isDisabled}
      label={label}
      onClickHandler={onClickHandler}
      additionalClasses={additionalClasses()}
    />
  );
}
