"use client";
import { useEffect, useState } from "react";
interface MonthSelectorProps {
  onMonthSelect: (selectedMonths: number[]) => void;
}
export default function MonthSelector({ onMonthSelect }: MonthSelectorProps) {
  const groupedMonths = [
    [1, 2],
    [3, 4],
    [6, 7, 8],
  ];
  const [selectedMonth, setSelectedMonth] = useState<number[]>(
    groupedMonths[0]
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    onMonthSelect(selectedMonth); // 초기 마운트 시 선택값 전달
  }, []);
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

  const renderedMonths = new Set<number>();

  return (
    <div className="flex flex-wrap gap-2">
      {months.map((month) => {
        if (renderedMonths.has(month)) return null;
        const group = groupedMonths.find((g) => g.includes(month));
        if (group) {
          group.forEach((m) => renderedMonths.add(m));
          const isSelected = selectedMonth.toString() === group.toString();
          return (
            <div
              key={`group-${group[0]}`}
              className={`flex gap-2 rounded-xl cursor-pointer ${
                isSelected ? "bg-sublight" : "bg-white"
              }`}
              onClick={() => handleMonthClick(month)}
            >
              {group.map((m) => (
                <div
                  key={m}
                  className={`text-center w-16 h-9 text-sm font-semibold rounded-[50px] flex items-center justify-center ${
                    isSelected
                      ? "bg-point text-white"
                      : "bg-[#E3E3E3] text-[#3a3a3a]"
                  }`}
                >
                  {m}월
                </div>
              ))}
            </div>
          );
        } else {
          // 단일 월 렌더링
          const isSelected = selectedMonth.includes(month);
          renderedMonths.add(month);
          return (
            <div
              key={month}
              onClick={() => handleMonthClick(month)}
              className={`text-center w-16 h-9 text-sm font-semibold rounded-[50px] flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-point text-white"
                  : "bg-[#E3E3E3] text-[#3a3a3a]"
              }`}
            >
              {month}월
            </div>
          );
        }
      })}
    </div>
  );
}
