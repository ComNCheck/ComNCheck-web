"use client";
import { useState } from "react";

interface ChecklistItemProps {
  tip: string;
  title: string;
  content: string;
}

const Checklist: React.FC<ChecklistItemProps> = ({ title, content, tip }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex flex-col items-start gap-4 py-4 px-6 bg-gray-100 h-auto rounded-4xl ">
      <div>
        <h1 className="text-4xl text-black font-extrabold">행사 준비 TIP</h1>
        <div className="text-[#707070] font-reqular text-sm mt-2">{tip}</div>
      </div>
      <div className="w-full h-0.5 bg-[#DFDFDF]"></div>
      <h1 className="text-4xl text-black font-extrabold">Check List</h1>
      <div className="flex flex-col w-full h-22 py-2 px-4 gap-2 rounded-xl bg-[#E2E2E2]">
        <div className="flex flex-row items-center gap-2 py-1 border-b-1 border-[#CECECE]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
          <div className="text-sm font-bold text-black">{title}</div>
        </div>
        <div className="text-xs text-[#656565]">{content}</div>
      </div>
    </div>
  );
};
export default Checklist;
