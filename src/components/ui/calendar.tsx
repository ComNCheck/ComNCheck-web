"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CalendarProps {
  mode?: "single";
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  onMonthChange?: (date: Date) => void;
  month?: Date;
  modifiers?: {
    event?: (date: Date) => boolean;
  };
  modifiersClassNames?: {
    event?: string;
  };
  className?: string;
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  onMonthChange,
  month = new Date(),
  modifiers,
  modifiersClassNames,
  className = "",
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handleDateClick = (date: Date) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const isSelected = (date: Date) => {
    return (
      selected &&
      date.getFullYear() === selected.getFullYear() &&
      date.getMonth() === selected.getMonth() &&
      date.getDate() === selected.getDate()
    );
  };

  const isEventDay = (date: Date) => {
    return modifiers?.event?.(date) || false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <div
      className={`calendar w-full max-w-sm sm:max-w-md lg:max-w-lg ${className}`}
    >
      <div className="flex justify-between items-center mb-3 gap-2 w-full">
        <button
          onClick={() => {
            const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
            setCurrentMonth(newMonth);
            onMonthChange?.(newMonth);
          }}
          className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600"
        >
          <IoIosArrowBack className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </h2>
        <button
          onClick={() => {
            const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
            setCurrentMonth(newMonth);
            onMonthChange?.(newMonth);
          }}
          className="p-1 sm:p-2 hover:bg-gray-100 rounded text-gray-600"
        >
          <IoIosArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className="p-1 text-center text-xs sm:text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div key={day ? `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}-${index}` : `empty-${index}`} className="p-1 text-center">
            {day ? (
              <button
                onClick={() => handleDateClick(day)}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-colors
                  ${isEventDay(day) ? "bg-[#DAEBFF]" : "bg-white"}
                  ${
                    isSelected(day)
                      ? "border-2 border-[#EBEBEB] text-gray-900"
                      : isToday(day)
                      ? "border-2 border-[#0077FF] text-[#0077FF]"
                      : "border border-transparent text-gray-900"
                  }
                  hover:bg-gray-100
                `}
              >
                {day.getDate()}
              </button>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
