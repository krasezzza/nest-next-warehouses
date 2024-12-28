'use client';

import IconCheck from './IconCheck';

export default function Checkbox({
  checked,
  onChangeHandler,
  customClasses,
}: {
  checked: boolean;
  onChangeHandler: (e: any) => void;
  customClasses?: string;
}) {
  return (
    <div
      className={`hover:cursor-pointer ${customClasses}`}
      onClick={() => {
        onChangeHandler(!checked);
      }}
    >
      {checked ? (
        <div className="flex items-center justify-center text-white hover:cursor-pointer bg-primary border-[2px] border-white w-[24px] h-[24px] rounded">
          <IconCheck />
        </div>
      ) : (
        <div className="flex items-center justify-center text-white hover:cursor-pointer border-[2px] border-white w-[24px] h-[24px] rounded" />
      )}
    </div>
  );
}
