"use client";

import { useState } from "react";
import TitleAndDescription from "@/components/TitleAndDescription";
import CalendarComponent from "./components/Calendar";
import EventCheck from "./components/EventCheck";
import Notification from "@/components/ui/notification";
import { majorEventItem } from "@/mock/calendar/api";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvents, setSelectedEvents] = useState<majorEventItem[]>([]);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSelectedEventsChange = (events: majorEventItem[]) => {
    setSelectedEvents(events);
  };

  const handleFixButtonClick = () => {
    if (selectedEvents.length > 0) {
      setShowOnlySelected(true);
      setShowNotification(true);
    }
  };

  const handleResetView = () => {
    setShowOnlySelected(false);
  };

  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <TitleAndDescription
          title={"행사 일정을 달력으로 한눈에 확인해요"}
          description={
            "연간 행사 일정을 픽스하면, 행사 일정이 자동으로 달력에 표시돼요. \n학생들도 언제 어떤 행사가 있는지 바로 알 수 있어요."
          }
        />

        {/* 반응형 레이아웃: 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {/* 캘린더 섹션 */}
          <div className="flex-1 order-1 lg:order-1">
            <CalendarComponent
              onDateSelect={setSelectedDate}
              selectedEvents={selectedEvents}
              showOnlySelected={showOnlySelected}
            />
          </div>

          {/* 이벤트 체크 섹션 */}
          <div className="order-2 lg:order-2">
            <EventCheck
              selectedDate={selectedDate}
              onSelectedEventsChange={handleSelectedEventsChange}
              showOnlySelected={showOnlySelected}
            />
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="mt-6 sm:mt-8">
          {showOnlySelected ? (
            <div className="space-y-3">
              <button
                onClick={handleResetView}
                className="w-full bg-gray-500 text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                전체 일정 보기로 돌아가기
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleFixButtonClick}
                disabled={selectedEvents.length === 0}
                className={`w-full py-3 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  selectedEvents.length > 0
                    ? "bg-[#0077FF] text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedEvents.length > 0
                  ? `선택된 ${selectedEvents.length}개 행사 일정 픽스`
                  : "행사 일정 픽스"}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-left">
                * 오른쪽 클릭으로 행사를 선택한 후 픽스 버튼을 눌러주세요.
              </p>
            </div>
          )}
        </div>

        {/* 알림 컴포넌트 */}
        {showNotification && (
          <Notification
            message="행사 일정이 픽스되었습니다!"
            subMessage={`선택된 ${selectedEvents.length}개의 행사만 달력에 표시됩니다.`}
            type="success"
            duration={4000}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </div>
  );
}
