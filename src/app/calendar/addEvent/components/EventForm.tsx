"use client";

import { useState, useEffect } from "react";
import Step1Category from "./step/Step1Category";
import Step1EventName from "./step/Step1EventName";
import Step2Date from "./step/Step2Date";
import Step3Location from "./step/Step3Location";
import Step4Announcement from "./step/Step4Announcement";
import Step5GoogleForm from "./step/Step5GoogleForm";
import Step6CardNews from "./step/Step6CardNews";
import StepProgress from "./step/StepProgress";
import TitleAndDescription from "@/components/TitleAndDescription";
import { createEvent, updateEvent } from "../api/eventApi";

// 행사 타입 정의
export type EventType = "past" | "new" | "another";

// 행사 데이터 인터페이스
interface EventData {
  category?: string; // 기존행사에서만 사용
  eventName?: string; // 신규행사, 기타행사에서 사용
  startDate: string;
  endDate: string;
  location: string;
  announcement: string;
  googleFormLink: string;
  cardNewsLink: string;
}

// 컴포넌트 props 정의
interface EventFormProps {
  eventType: EventType;
  mode?: "create" | "edit"; // 생성 모드 또는 수정 모드
  initialData?: Partial<EventData>; // 수정 모드일 때 초기 데이터
  eventId?: string; // 수정 모드일 때 이벤트 ID
  onSubmit?: (data: EventData) => void; // 커스텀 제출 핸들러
}

// 행사 타입별 설정
const eventTypeConfig = {
  past: {
    title: "기존행사 추가하기",
    description: "카테고리를 선택하거나 행사명을 입력해주세요",
    editTitle: "기존행사 수정하기",
    submitButtonText: "행사 일정 추가하기",
    editSubmitButtonText: "행사 일정 수정하기",
    useCategory: true,
  },
  new: {
    title: "신규행사 추가하기",
    description: "행사명을 입력해주세요",
    editTitle: "신규행사 수정하기",
    submitButtonText: "행사 일정 추가하기",
    editSubmitButtonText: "행사 일정 수정하기",
    useCategory: false,
  },
  another: {
    title: "기타행사 추가하기",
    description: "행사명을 입력해주세요",
    editTitle: "기타행사 수정하기",
    submitButtonText: "행사 일정 추가하기",
    editSubmitButtonText: "행사 일정 수정하기",
    useCategory: false,
  },
};

export default function EventForm({
  eventType,
  mode = "create",
  initialData = {},
  eventId,
  onSubmit,
}: EventFormProps) {
  const config = eventTypeConfig[eventType];

  const [eventData, setEventData] = useState<EventData>({
    category: initialData.category || "",
    eventName: initialData.eventName || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    location: initialData.location || "",
    announcement: initialData.announcement || "",
    googleFormLink: initialData.googleFormLink || "",
    cardNewsLink: initialData.cardNewsLink || "",
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 각 단계별 완료 상태 업데이트
  useEffect(() => {
    const newCompletedSteps: number[] = [];

    // 첫 번째 단계: 카테고리 또는 행사명
    if (config.useCategory) {
      if (eventData.category) newCompletedSteps.push(1);
    } else {
      if (eventData.eventName) newCompletedSteps.push(1);
    }

    if (eventData.startDate && eventData.endDate) newCompletedSteps.push(2);
    if (eventData.location) newCompletedSteps.push(3);
    if (eventData.announcement) newCompletedSteps.push(4);
    if (eventData.googleFormLink) newCompletedSteps.push(5);
    if (eventData.cardNewsLink) newCompletedSteps.push(6);

    setCompletedSteps(newCompletedSteps);

    // 현재 단계 업데이트 (마지막 완료된 단계 + 1)
    const lastCompletedStep = Math.max(...newCompletedSteps, 0);
    setCurrentStep(lastCompletedStep + 1);
  }, [eventData, config.useCategory]);

  // 핸들러 함수들
  const handleCategorySelect = (category: string) => {
    setEventData((prev) => ({ ...prev, category }));
  };

  const handleEventNameInput = (eventName: string) => {
    setEventData((prev) => ({ ...prev, eventName }));
  };

  const handleDateSelect = (startDate: string, endDate: string) => {
    setEventData((prev) => ({ ...prev, startDate, endDate }));
  };

  const handleLocationInput = (location: string) => {
    setEventData((prev) => ({ ...prev, location }));
  };

  const handleAnnouncementInput = (announcement: string) => {
    setEventData((prev) => ({ ...prev, announcement }));
  };

  const handleGoogleFormInput = (googleFormLink: string) => {
    setEventData((prev) => ({ ...prev, googleFormLink }));
  };

  const handleCardNewsInput = (cardNewsLink: string) => {
    setEventData((prev) => ({ ...prev, cardNewsLink }));
  };

  // 폼 완료 여부 확인
  const isFormComplete = () => {
    const basicRequirements =
      eventData.startDate &&
      eventData.endDate &&
      eventData.location &&
      eventData.announcement;

    if (config.useCategory) {
      return basicRequirements && eventData.category;
    } else {
      return basicRequirements && eventData.eventName;
    }
  };

  // 제출 처리
  const handleSubmit = async () => {
    if (!isFormComplete()) return;

    try {
      if (onSubmit) {
        // 커스텀 제출 핸들러가 있는 경우
        onSubmit(eventData);
      } else {
        // 기본 제출 로직
        if (mode === "edit" && eventId) {
          // 수정 API 호출
          const result = await updateEvent(eventType, eventId, eventData);
          if (result.success) {
            alert("행사 일정이 성공적으로 수정되었습니다!");
            // 성공 후 페이지 이동 로직 추가 가능
          } else {
            alert(result.message || "수정 중 오류가 발생했습니다.");
          }
        } else {
          // 생성 API 호출
          const result = await createEvent(eventType, eventData);
          if (result.success) {
            alert("행사 일정이 성공적으로 추가되었습니다!");
            // 성공 후 폼 초기화 또는 페이지 이동 로직 추가 가능
          } else {
            alert(result.message || "추가 중 오류가 발생했습니다.");
          }
        }
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const title = mode === "edit" ? config.editTitle : config.title;
  const submitButtonText =
    mode === "edit" ? config.editSubmitButtonText : config.submitButtonText;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <TitleAndDescription title={title} description={config.description} />

        {/* 진행 상황 표시 */}
        {/* <StepProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
        /> */}

        {/* 단계별 폼 */}
        <div className="space-y-8">
          {/* Step 1: 카테고리 또는 행사명 */}
          {config.useCategory ? (
            <Step1Category
              onCategorySelect={handleCategorySelect}
              selectedCategory={eventData.category || ""}
            />
          ) : (
            <Step1EventName
              onEventNameInput={handleEventNameInput}
              selectedEventName={eventData.eventName || ""}
            />
          )}

          {/* Step 2: 날짜 */}
          <Step2Date
            onDateSelect={handleDateSelect}
            selectedStartDate={eventData.startDate}
            selectedEndDate={eventData.endDate}
          />

          {/* Step 3: 장소 */}
          <Step3Location
            onLocationInput={handleLocationInput}
            selectedLocation={eventData.location}
          />

          {/* Step 4: 공지사항 */}
          <Step4Announcement
            onAnnouncementInput={handleAnnouncementInput}
            selectedAnnouncement={eventData.announcement}
          />

          {/* Step 5: 구글폼 */}
          <Step5GoogleForm
            onGoogleFormInput={handleGoogleFormInput}
            selectedGoogleFormLink={eventData.googleFormLink}
          />

          {/* Step 6: 카드뉴스 */}
          <Step6CardNews
            onCardNewsInput={handleCardNewsInput}
            selectedCardNewsLink={eventData.cardNewsLink}
          />
        </div>

        {/* 제출 버튼 */}
        <div className="mt-12 flex justify-center w-full">
          <button
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            className={`w-full px-8 py-4 rounded-lg text-white font-medium text-lg transition-colors ${
              isFormComplete()
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {submitButtonText}
          </button>
        </div>

        {/* 디버깅용 데이터 표시 (개발 중에만 사용)
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium mb-2">현재 입력된 데이터:</h3>
            <pre className="text-sm">{JSON.stringify(eventData, null, 2)}</pre>
            <h3 className="font-medium mb-2 mt-4">완료된 단계:</h3>
            <pre className="text-sm">
              {JSON.stringify(completedSteps, null, 2)}
            </pre>
            <p className="text-sm mt-2">모드: {mode}</p>
            {eventId && <p className="text-sm">이벤트 ID: {eventId}</p>}
          </div>
        )} */}
      </div>
    </div>
  );
}
