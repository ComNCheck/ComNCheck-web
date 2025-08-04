"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getMajorEvent, getAnotherMajorEvent } from "@/mock/calendar/api";
import { majorEventItem } from "@/mock/calendar/api";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

export default function CalendarComponent() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // 데이터 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [majorEvents, anotherEvents] = await Promise.all([
          getMajorEvent(),
          getAnotherMajorEvent(),
        ]);

        const parseEvent = (item: majorEventItem): CalendarEvent => ({
          id: item.id,
          title: item.eventName,
          date: item.date,
          location: item.location,
          buttonText: "신청하기",
        });

        const allEvents: CalendarEvent[] = [
          ...(majorEvents || []).map(parseEvent),
          ...(anotherEvents || []).map(parseEvent),
        ];

        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, []);

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return events.some(
      (e) =>
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getDate() === date.getDate()
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={new Date()}
        modifiers={{
          event: isEventDay,
        }}
        modifiersClassNames={{
          event: "event-day",
        }}
        className="[&_.rdp]:text-lg [&_.rdp]:text-[#357ae1] [&_.rdp]:bg-[#e6f0ff]"
      />
    </div>
  );
}
