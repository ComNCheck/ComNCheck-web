"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventForm from "../../../components/EventForm";
import { getEvent } from "../../../api/eventApi";

interface EventData {
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  announcement: string;
  googleFormLink: string;
  cardNewsLink: string;
}

export default function PastEventEdit() {
  const params = useParams();
  const eventId = params.eventId as string;
  const [initialData, setInitialData] = useState<Partial<EventData> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // 기존 이벤트 데이터 로드
  useEffect(() => {
    const loadEventData = async () => {
      try {
        const result = await getEvent("past", eventId);
        if (result.success && result.data) {
          setInitialData(result.data);
        } else {
          // API 호출 실패 시 임시 데이터 사용 (개발용)
          const mockData: EventData = {
            category: "새터",
            startDate: "2024-03-15",
            endDate: "2024-03-17",
            location: "강원도 춘천",
            announcement: "2024년 새터 공지사항입니다.",
            googleFormLink: "https://forms.google.com/sample",
            cardNewsLink: "https://example.com/cardnews",
          };
          setInitialData(mockData);
          console.warn("API 호출 실패, 임시 데이터 사용:", result.message);
        }
      } catch (error) {
        console.error("이벤트 데이터 로드 실패:", error);
        alert("이벤트 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadEventData();
    }
  }, [eventId]);

  // 수정 API 호출 함수
  const handleUpdate = async (data: any) => {
    try {
      // TODO: 실제 API 호출로 대체
      // const response = await fetch(`/api/events/${eventId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      console.log("수정 API 호출:", { eventId, data });
      alert("기존행사가 성공적으로 수정되었습니다!");

      // 수정 완료 후 페이지 이동 (예: 캘린더 페이지)
      // router.push('/calendar');
    } catch (error) {
      console.error("수정 API 호출 실패:", error);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-red-500">
          이벤트 데이터를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <EventForm
      eventType="past"
      mode="edit"
      initialData={initialData}
      eventId={eventId}
      onSubmit={handleUpdate}
    />
  );
}
