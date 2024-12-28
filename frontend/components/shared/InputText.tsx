'use client';

interface InputTextProps {
  value: string;
  placeholder: string;
  onChangeHandler?: (value: string) => void;
  additionalWrapperClasses?: string;
  additionalInputClasses?: string;
  isReadOnly?: boolean;
}

export default function InputText({
  value,
  placeholder,
  onChangeHandler,
  additionalWrapperClasses,
  additionalInputClasses,
  isReadOnly = false,
}: InputTextProps) {
  const wrapperClasses = () => {
    let classes =
      'max-w-[240px] h-[40px] px-[12px] rounded-md flex flex-row items-center justify-center text-bgnd-dark shadow-inner border hover:bg-hover-light hover:border-blue-main';

    if (additionalWrapperClasses) {
      classes += ` ${additionalWrapperClasses}`;
    }

    return classes;
  };

  const inputClasses = () => {
    let classes =
      'w-full h-full bg-transparent outline-none text-xs md:text-sm placeholder:text-typo-scnd1 placeholder:select-none';

    if (additionalInputClasses) {
      classes += ` ${additionalInputClasses}`;
    }

    return classes;
  };

  return (
    <div className={wrapperClasses()}>
      <input
        type="text"
        className={inputClasses()}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (onChangeHandler) {
            e.preventDefault();
            onChangeHandler(e.target.value);
          }
        }}
        readOnly={isReadOnly}
      />
    </div>
  );
}
