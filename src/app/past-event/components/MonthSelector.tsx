"use client";
import { useState } from "react";

export default function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="flex flex-wrap w-[35%] gap-2">
      {months.map((month) => {
        const isSelected = selectedMonth === month;
        return (
          <div
            key={month}
            onClick={() => setSelectedMonth(month)}
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
