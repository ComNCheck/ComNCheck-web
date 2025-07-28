"use client";
import { useState } from "react";
import {
  BiCalendar,
  BiCalendarCheck,
  BiCalendarStar,
  BiChevronDown,
} from "react-icons/bi";

type OptionType = {
  label: string;
  icon: JSX.Element;
};
const options: OptionType[] = [
  { label: "연도별", icon: <BiCalendar className="w-6 h-6" /> },
  { label: "행사별", icon: <BiCalendarCheck className="w-6 h-6" /> },
  { label: "할일별", icon: <BiCalendarStar className="w-6 h-6" /> },
];
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType>(options[0]);
  const handleSelect = (option: OptionType) => {
    setSelected(option);
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className="flex flex-row items-center w-32 h-11 px-3 py-2 gap-0.5 bg-white border-1 border-[#64758B] rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2 ">
          {selected.icon}
          <span className="text-xl font-extrabold">{selected.label}</span>
        </div>
        <BiChevronDown className="w-4 h-4" />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg font-bold">
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => handleSelect(option)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.icon}
              <span className="text-xl">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
