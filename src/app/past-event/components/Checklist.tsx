"use client";
import { ChecklistItem, Tip } from "@/apis/event.type";
import { useState } from "react";

interface ChecklistItemProps {
  title: string;
  checklists: ChecklistItem[];
  tips: Tip[];
  onToggleChecklist: (itemId: number, isChecked: boolean) => void;
}
const Checklist: React.FC<ChecklistItemProps> = ({ title, checklists, tips ,onToggleChecklist}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex flex-col items-start gap-4 py-4 px-6 bg-gray-100 h-auto rounded-4xl ">
      <div>
        <h1 className="text-4xl text-black font-extrabold">행사 준비 TIP</h1>
        {tips.map((tipItem, index) => (
          <div key={tipItem.id} className="text-[#707070] font-reqular text-sm mt-2">
           {index+1}. {tipItem.content}
          </div>
        ))}      
      </div>
      {checklists.map((checklistItem) => (
        <div key={checklistItem.id} className="flex flex-col w-full h-22 py-2 px-4 gap-2 rounded-xl bg-[#E2E2E2]">
          <div className="flex flex-row items-center gap-2 py-1 border-b-1 border-[#CECECE]">
            <input
              type="checkbox"
              checked={checklistItem.isChecked}
              onChange={(e) => onToggleChecklist(checklistItem.id,  !checklistItem.isChecked)}            />
            <div className="text-sm font-bold text-black">{title}</div>
          </div>
          <div className="text-xs text-[#656565]">{checklistItem.content}</div>
        </div>
      ))}
    </div>
  );
};
export default Checklist;
