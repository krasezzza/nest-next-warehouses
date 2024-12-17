'use client';

import { useState } from 'react';
import WrapperScrollable from './WrapperScrollable';

interface SelectListProps {
  options: any[];
  setCurrentOption: (value: any) => void;
  selectorCustomClasses?: string;
  menuCustomClasses?: string;
}

export default function SelectList({
  options,
  setCurrentOption,
  selectorCustomClasses,
  menuCustomClasses,
}: SelectListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectorClasses = `relative min-w-[240px] h-[40px] p-[12px] pt-[16px] flex items-center justify-start border border-stroke-light rounded-[4px] hover:bg-hover-light hover:text-typo-dark cursor-pointer ${selectorCustomClasses} ${isOpen ? 'bg-hover-light' : ''}`;

  const dropdownClasses = () => {
    return `absolute min-w-[240px] mt-[2px] bg-[#333] z-50 rounded shadow-md select-none border ${menuCustomClasses}`;
  };

  const optionClasses: string =
    'px-[16px] py-[6px] hover:bg-bgnd-light cursor-pointer';

  return (
    <div>
      <div
        className={selectorClasses}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        data-id="select-menu-button"
      >
        <div className="flex items-center w-full text-sm select-none">
          <span>{options[selectedIndex].name}</span>
        </div>
      </div>
      {isOpen && (
        <div className={dropdownClasses()}>
          <WrapperScrollable customClasses="flex flex-col rounded menu-box-shadow max-h-[200px]">
            {options.map((option, index) => (
              <div
                key={index}
                className={`${optionClasses} ${selectedIndex === index && 'bg-hover-light'}`}
                onClick={() => {
                  setSelectedIndex(index);
                  setCurrentOption(options[index]);
                  setIsOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </WrapperScrollable>
        </div>
      )}
    </div>
  );
}
