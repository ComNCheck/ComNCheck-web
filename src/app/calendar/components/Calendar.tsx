"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getCalendarEvents } from "@/apis/event";
import { CalendarResponseDTO } from "@/apis/event.type";
import { majorEventItem } from "@/mock/calendar/api";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

interface CalendarComponentProps {
  onDateSelect?: (date: Date | undefined) => void;
  selectedEvents?: majorEventItem[];
  showOnlySelected?: boolean;
  onMonthChange?: (month: Date) => void;
}

export default function CalendarComponent({
  onDateSelect,
  selectedEvents = [],
  showOnlySelected = false,
  onMonthChange,
}: CalendarComponentProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 데이터 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
        
        const calendarEvents = await getCalendarEvents(year, month);

        const parseEvent = (item: CalendarResponseDTO): CalendarEvent => ({
          id: item.id,
          title: item.eventName,
          date: item.startDate,
          location: item.location,
          buttonText: item.eventStatus === "FIXED" ? "확정" : "임시",
        });

        const allEvents: CalendarEvent[] = calendarEvents.map(parseEvent);
        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, [currentDate]);

  // 표시할 이벤트 결정 (선택된 이벤트만 표시하거나 모든 이벤트 표시)
  const displayEvents = showOnlySelected
    ? events.filter((event) =>
        selectedEvents.some((selected) => selected.id === event.id)
      )
    : events;

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return displayEvents.some(
      (e) =>
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getDate() === date.getDate()
    );
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const handleMonthChange = (newMonth: Date) => {
    setCurrentDate(newMonth);
    onMonthChange?.(newMonth);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          month={currentDate}
          modifiers={{
            event: isEventDay,
          }}
          modifiersClassNames={{
            event: "event-day",
          }}
          className="[&_.rdp]:text-sm sm:text-base lg:text-lg [&_.rdp]:text-[#357ae1] [&_.rdp]:bg-[#e6f0ff] [&_.rdp-button]:p-1 sm:[&_.rdp-button]:p-2 lg:[&_.rdp-button]:p-3"
        />
      </div>
    </div>
  );
}
