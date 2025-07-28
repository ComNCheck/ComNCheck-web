"use client";

import TitleAndDescription from "@/components/TitleAndDescription";
import Dropdown from "./components/Dropdown";
import MonthSelector from "./components/MonthSelector";
import PastEventCard from "./components/PastEventCard";
import { useState } from "react";
import pastEventData from "@/apis/PastEvent.json";
interface PastEventItem {
  title: string;
  description: string;
  month: string;
  sort: string;
}
export default function PastEvent() {
  const [currentSelectedMonths, setCurrentSelectedMonths] = useState<number[]>(
    []
  );

  const handleMonthSelect = (months: number[]) => {
    setCurrentSelectedMonths(months);
  };

  const filteredEvents: PastEventItem[] = pastEventData.filter((event) => {
    const eventMonthNumber = parseInt(event.month.replace("월", ""));
    return currentSelectedMonths.includes(eventMonthNumber);
  });
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12 pt-24 ">
      <div className="w-[70%] mx-auto">
        <TitleAndDescription
          title="이제까지 이런 행사들을 진행했어요!"
          description="예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요."
        />
        <Dropdown />
      </div>
      <div className="w-full h-0.5 bg-black my-4"></div>
      <div className="flex flex-row items-center pl-60">
        <div className="flex flex-col w-[45%] gap-4">
          <MonthSelector onMonthSelect={handleMonthSelect} />
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <PastEventCard
                key={index}
                title={event.title}
                description={event.description}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              선택된 월에 해당하는 이벤트가 없습니다.
            </p>
          )}
        </div>
        <div>체크리스트</div>
      </div>
    </div>
  );
}
