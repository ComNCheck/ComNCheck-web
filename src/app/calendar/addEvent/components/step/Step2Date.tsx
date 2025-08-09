"use client";

import { useState } from "react";

interface Step2DateProps {
  onDateSelect: (startDate: string, endDate: string) => void;
  selectedStartDate?: string;
  selectedEndDate?: string;
}

export default function Step2Date({
  onDateSelect,
  selectedStartDate,
  selectedEndDate,
}: Step2DateProps) {
  const [startDate, setStartDate] = useState<string>(selectedStartDate || "");
  const [endDate, setEndDate] = useState<string>(selectedEndDate || "");

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (endDate) {
      onDateSelect(date, endDate);
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (startDate) {
      onDateSelect(startDate, date);
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year} - ${month} - ${day} (${dayOfWeek})`;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="text-lg font-medium">날짜를 선택해주세요</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시작 날짜
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {startDate && (
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                {formatDateForDisplay(startDate)}
                <button
                  onClick={() => {
                    setStartDate("");
                    onDateSelect("", endDate);
                  }}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            종료 날짜
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={startDate}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {endDate && (
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                {formatDateForDisplay(endDate)}
                <button
                  onClick={() => {
                    setEndDate("");
                    onDateSelect(startDate, "");
                  }}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
