"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TitleAndDescription from "@/components/TitleAndDescription";
import Dropdown from "./components/Dropdown";
import MonthSelector from "./components/MonthSelector";
import PastEventCard from "./components/PastEventCard";
import Checklist from "./components/Checklist";
import Category from "@/components/Category";
import { getMajorEventChecklist, getMonthlyChecklist, putChecklistCompleted } from "@/apis/event";
import { CategoryProps, ChecklistGroup, CheckListType } from "@/apis/event.type";

interface PastEventItem {
  title: string;
  description: string;
  month?: string;
  event?: string;
  year?: string;
  sort: string;
}

const categoryMapping: Record<string, CategoryProps | '전체'> = {
  "전체": "ALL",
  "새내기 배움터": "FRESHMAN_ORIENTATION",
  "개강/종강총회": "MEETING",
  "대면식": "FACE_TO_FACE_MEETING",
  "간식행사": "SNACK_EVENT",
  "MT": "MT",
  "해오름식": "KICK_OFF",
  "체전": "SPORTS_DAY",
  "축제": "FESTIVAL",
  "홈커밍 데이": "HOME_COMING_DAY",
};

export default function PastEvent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSort = searchParams.get("sort") || "할일별";

  const [isReady, setIsReady] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(initialSort);
  const [currentSelectedMonths, setCurrentSelectedMonths] = useState<number[]>([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState<string>("전체");

  // ✅ 선택된 이벤트 데이터를 타입별로 분리하여 관리
  const [selectedMonthlyEvent, setSelectedMonthlyEvent] = useState<ChecklistGroup | null>(null);
  const [selectedMajorEvent, setSelectedMajorEvent] = useState<CheckListType | null>(null);

  // '할일별' 탭용 데이터
  const [monthlyChecklists, setMonthlyChecklists] = useState<ChecklistGroup[]>([]);
  // '연도별' 및 '행사별' 탭용 데이터
  const [events, setEvents] = useState<CheckListType[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<PastEventItem | null>(
    null
  );

  useEffect(() => {
    const urlSort = searchParams.get("sort");
    if (urlSort) {
      setCurrentSort(urlSort);
    }
    setIsReady(true);
  }, [searchParams]);

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    setCurrentSelectedMonths([]);
    setCurrentSelectedCategory("전체");
    setSelectedMonthlyEvent(null);
    setSelectedMajorEvent(null);

    const query = new URLSearchParams(window.location.search);
    query.set("sort", sort);
    router.replace(`${window.location.pathname}?${query.toString()}`);
  };

  const handleMonthSelect = (months: number[]) => {
    setCurrentSelectedMonths(months);
    setSelectedMonthlyEvent(null);
  };

  type CategoryKey = keyof typeof categoryMapping;
  const handleCategorySelect = (category: string) => {
    if (currentSort === "연도별") {
      setCurrentSelectedCategory(category); 
    } else {
      const mappedCategory = categoryMapping[category as CategoryKey];
      setCurrentSelectedCategory(mappedCategory);
    }
    setSelectedMajorEvent(null);
  };

  useEffect(() => {
    setMonthlyChecklists([]);
    setEvents([]);
    setSelectedMonthlyEvent(null);
    setSelectedMajorEvent(null);

    if (currentSort === "할일별") {
      if (currentSelectedMonths.length > 0) {
        const startMonth = Math.min(...currentSelectedMonths);
        const endMonth = Math.max(...currentSelectedMonths);
          getMonthlyChecklist({ startMonth: startMonth.toString(), endMonth: endMonth.toString() })
         .then((data) => {
          // 'flatMap' 대신, 반환된 객체의 'checklists' 배열에 직접 접근
          // data는 { checklists: [...] } 형태의 객체일 것으로 예상
          if (data && data.checklists) {
            setMonthlyChecklists(data.checklists); // 👈 이 부분을 수정
          } else {
            console.error("API 응답이 예상한 형식이 아닙니다:", data);
            setMonthlyChecklists([]);
          }
        })
        .catch(console.error);
      } else {
        setMonthlyChecklists([]);
      }
    } else if (currentSort === "연도별") {
      const params = currentSelectedCategory !== "전체" ? { year: parseInt(currentSelectedCategory) } : {};
      getMajorEventChecklist(params)
        .then((data) => setEvents(data))
        .catch(console.error);
    } else if (currentSort === "행사별") {
      const params = currentSelectedCategory !== "ALL" ? { category: currentSelectedCategory } : {};
      getMajorEventChecklist(params)
      .then((data) => setEvents(data))
      .catch(console.error);
    }
  }, [currentSort, currentSelectedMonths, currentSelectedCategory]);

  const handleToggleChecklist = async (itemId: number, isChecked: boolean) => {
    const prevMonthlyChecklists = monthlyChecklists;

    // UI 먼저 업데이트
    setMonthlyChecklists(prevChecklists =>
      prevChecklists.map(event => ({
        ...event,
        checklists: event.checklists.map(item =>
          item.id === itemId ? { ...item, isChecked } : item
        )
      }))
    );

    // 선택된 이벤트도 업데이트
    if (selectedMonthlyEvent) {
      setSelectedMonthlyEvent(prev => prev && {
        ...prev,
        checklists: prev.checklists.map(item =>
          item.id === itemId ? { ...item, isChecked } : item
        )
      });
    }

    try {
      await putChecklistCompleted(itemId, isChecked);
      console.log("체크리스트 상태 업데이트 성공", isChecked);
    } catch (error) {
      console.error("체크리스트 상태 업데이트 실패", error);
      // 실패하면 이전 상태로 롤백
      setMonthlyChecklists(prevMonthlyChecklists);
      if (selectedMonthlyEvent) setSelectedMonthlyEvent(selectedMonthlyEvent);
    }
  };

  const categoryList = {
    할일별: [],
    연도별: [
      { item: "전체", sort: "연도별" },
      { item: "2025", sort: "연도별" },
      { item: "2024", sort: "연도별" },
      { item: "2023", sort: "연도별" },
      { item: "2022", sort: "연도별" },
    ],
    행사별: [
      { item: "전체", sort: "행사별" },
      { item: "새내기 배움터", sort: "행사별" },
      { item: "개강/종강총회", sort: "행사별" },
      { item: "대면식", sort: "행사별" },
      { item: "간식행사", sort: "행사별" },
      { item: "MT", sort: "행사별" },
      { item: "해오름식", sort: "행사별" },
      { item: "체전", sort: "행사별" },
      { item: "축제", sort: "행사별" },
      { item: "홈커밍 데이", sort: "행사별" },
    ],
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full md:w-[70%] mx-auto p-5">
        <TitleAndDescription
          title="이제까지 이런 행사들을 진행했어요!"
          description="예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요."
        />
        <Dropdown onSelect={handleSortChange} selectedSort={currentSort} />
      </div>
      <div className="w-full h-0.5 bg-black my-4"></div>

      <div className="flex flex-col p-4 md:flex-row items-start md:pl-40 lg:pl-[15%] gap-5">
        {currentSort === "할일별" && (
          <>
            <div className="flex flex-col w-full md:w-[50%] gap-4 ">
              <MonthSelector onMonthSelect={handleMonthSelect} />
              <div className="min-h-[300px] gap-4">
                {monthlyChecklists.length > 0 ? (
                  monthlyChecklists.map((event) => (
                    <PastEventCard
                      key={event.id}
                      title={event.title}
                      description={event.checklists[0]?.content || '내용 없음'}
                      onClick={() => setSelectedMonthlyEvent(event)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    선택된 월에 해당하는 행사가 없습니다.
                  </p>
                )}
              </div>
            </div>
            <div className="md:w-[35%] h-full">
              {selectedMonthlyEvent ? (
                <Checklist
                  title={selectedMonthlyEvent.title}
                  checklists={selectedMonthlyEvent.checklists}
                  tips={selectedMonthlyEvent.tips}
                  onToggleChecklist={handleToggleChecklist}
                />
              ) : (
                <p className="text-gray-400 text-sm text-center">
                  행사를 선택하면 상세 체크리스트가 보여요.
                </p>
              )}
            </div>
          </>
        )}

        {(currentSort === "연도별" || currentSort === "행사별") && (
          <div className="flex flex-col w-full px-5 md:w-[80%] gap-4">
            <Category
              categoryList={categoryList[currentSort]}
              onSelect={handleCategorySelect}
            />
            <div className="min-h-[300px] gap-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <PastEventCard
                    key={event.majorEventId}
                    title={event.eventName}
                    description={event.notice}
                    date={event.date}
                    location={event.location}
                    cardNewsImageUrls={event.cardNewsImageUrls}
                    onClick={() => setSelectedMajorEvent(event)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  선택된 카테고리에 해당하는 행사가 없습니다.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}