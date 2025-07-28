"use client";
import { useState } from "react";
interface MonthSelectorProps {
  onMonthSelect: (selectedMonths: number[]) => void;
}
export default function MonthSelector({ onMonthSelect }: MonthSelectorProps) {
  const [selectedMonth, setSelectedMonth] = useState<number[]>([]);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const groupedMonths = [
    [1, 2],
    [3, 4],
    [6, 7, 8],
  ];
  const getSelectedGroup = (month: number): number[] => {
    for (const group of groupedMonths) {
      if (group.includes(month)) return group;
    }
    return [month];
  };
  const handleMonthClick = (month: number) => {
    const group = getSelectedGroup(month);
    setSelectedMonth(group);
    onMonthSelect(group);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {months.map((month) => {
        const isSelected = selectedMonth.includes(month);
        return (
          <div
            key={month}
            onClick={() => handleMonthClick(month)}
            className={`text-center p-2 w-16 h-9  text-sm font-semibold rounded-[50px] ${
              isSelected ? "bg-point text-white" : "bg-[#E3E3E3] text-[#3a3a3a]"
            }`}
          >
            {month}월
          </div>
        );
      })}
    </div>
  );
}
