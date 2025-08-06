"use client";

import { useEffect, useState, useRef } from "react";
import {
  getMajorEvent,
  getAnotherMajorEvent,
  majorEventItem,
} from "@/mock/calendar/api";
import { FaCirclePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface EventCheckProps {
  selectedDate?: Date;
  onSelectedEventsChange?: (events: majorEventItem[]) => void;
}

export default function EventCheck({
  selectedDate,
  onSelectedEventsChange,
}: EventCheckProps) {
  const router = useRouter();
  const [events, setEvents] = useState<majorEventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<majorEventItem[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<majorEventItem[]>([]);
  const [rightClickedEvent, setRightClickedEvent] =
    useState<majorEventItem | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // 데이터 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [majorEvents, anotherEvents] = await Promise.all([
          getMajorEvent(),
          getAnotherMajorEvent(),
        ]);

        const allEvents = [...(majorEvents || []), ...(anotherEvents || [])];
        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, []);

  // 선택된 날짜에 해당하는 이벤트 필터링
  useEffect(() => {
    if (!selectedDate) {
      setFilteredEvents([]);
      return;
    }

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });

    setFilteredEvents(filtered);
  }, [selectedDate, events]);

  // 선택된 이벤트가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    onSelectedEventsChange?.(selectedEvents);
  }, [selectedEvents, onSelectedEventsChange]);

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  // D-day 계산 함수
  const calculateDday = (date: Date) => {
    const today = new Date();
    const targetDate = new Date(date);

    // 시간을 제거하고 날짜만 비교
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  };

  // 오른쪽 클릭 핸들러
  const handleContextMenu = (e: React.MouseEvent, event: majorEventItem) => {
    e.preventDefault();
    setRightClickedEvent(event);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  // 컨텍스트 메뉴 닫기
  const closeContextMenu = () => {
    setContextMenuPosition(null);
    setRightClickedEvent(null);
  };

  // 선택하기
  const handleSelect = () => {
    if (rightClickedEvent) {
      const isAlreadySelected = selectedEvents.some(
        (event) => event.id === rightClickedEvent.id
      );
      if (!isAlreadySelected) {
        setSelectedEvents((prev) => [...prev, rightClickedEvent]);
      }
    }
    closeContextMenu();
  };

  // 삭제하기
  const handleDelete = () => {
    if (rightClickedEvent) {
      setEvents((prev) =>
        prev.filter((event) => event.id !== rightClickedEvent.id)
      );
      setSelectedEvents((prev) =>
        prev.filter((event) => event.id !== rightClickedEvent.id)
      );
    }
    closeContextMenu();
  };

  // 선택 해제
  const handleDeselect = (eventToDeselect: majorEventItem) => {
    setSelectedEvents((prev) =>
      prev.filter((event) => event.id !== eventToDeselect.id)
    );
  };

  // 선택된 이벤트인지 확인
  const isEventSelected = (event: majorEventItem) => {
    return selectedEvents.some(
      (selectedEvent) => selectedEvent.id === event.id
    );
  };

  // 전역 클릭 이벤트로 컨텍스트 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full lg:w-80 relative">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        {selectedDate ? (
          <>
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="text-base sm:text-lg font-bold text-black">
                | {formatDate(selectedDate)}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                {calculateDday(selectedDate)}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded flex justify-between items-center cursor-pointer transition-all duration-200 ${
                      isEventSelected(event)
                        ? "bg-blue-100 border-2 border-blue-300 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100"
                    } ${
                      rightClickedEvent?.id === event.id
                        ? "ring-2 ring-blue-400 ring-opacity-50"
                        : ""
                    }`}
                    onContextMenu={(e) => handleContextMenu(e, event)}
                    onClick={() => {
                      if (isEventSelected(event)) {
                        handleDeselect(event);
                      } else {
                        setSelectedEvents((prev) => [...prev, event]);
                      }
                    }}
                  >
                    <div className="text-black flex-1 text-sm sm:text-base truncate">
                      {event.eventName}
                    </div>
                    {isEventSelected(event) && (
                      <div className="ml-2 text-blue-600 flex-shrink-0">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-4 text-sm sm:text-base">
                  해당 날짜에 예정된 행사가 없습니다.
                </div>
              )}
            </div>

            {selectedEvents.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs sm:text-sm font-medium text-blue-800 mb-2">
                  선택된 행사 ({selectedEvents.length}개)
                </div>
                <div className="space-y-1">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs text-blue-700 flex justify-between items-center"
                    >
                      <span className="truncate flex-1">{event.eventName}</span>
                      <button
                        onClick={() => handleDeselect(event)}
                        className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4 text-sm sm:text-base">
              달력에서 날짜를 선택해주세요
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/calendar/addEvent")}
          className="w-full bg-gray-100 text-black py-3 sm:py-4 rounded flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors duration-200"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <FaCirclePlus className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <span className="text-xs sm:text-sm">행사일정 추가하기</span>
        </button>
      </div>

      {/* 컨텍스트 메뉴 */}
      {contextMenuPosition && (
        <div
          ref={contextMenuRef}
          className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] sm:min-w-[140px]"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
        >
          <button
            onClick={handleSelect}
            className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm hover:bg-blue-50 text-blue-600 flex items-center"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            선택하기
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm hover:bg-red-50 text-red-600 flex items-center"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
