"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TitleAndDescription from "@/components/TitleAndDescription";
import Dropdown from "./components/Dropdown";
import MonthSelector from "./components/MonthSelector";
import PastEventCard from "./components/PastEventCard";
import pastEventData from "@/apis/PastEvent.json";
import Checklist from "./components/Checklist";
import Category from "@/components/Category";

interface PastEventItem {
  title: string;
  description: string;
  month?: string;
  event?: string;
  year?: string;
  sort: string;
}

export default function PastEvent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSort = searchParams.get("sort") || "할일별";

  const [isReady, setIsReady] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(initialSort);
  const [currentSelectedMonths, setCurrentSelectedMonths] = useState<number[]>(
    []
  );
  const [currentSelectedCategory, setCurrentSelectedCategory] =
    useState<string>("전체");

  const [selectedEvent, setSelectedEvent] = useState<PastEventItem | null>(
    null
  );

  // URL 쿼리스트링 준비되면 상태 동기화 후 렌더링 시작
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

    const query = new URLSearchParams(window.location.search);
    query.set("sort", sort);
    router.replace(`${window.location.pathname}?${query.toString()}`);
  };

  const handleMonthSelect = (months: number[]) => {
    setCurrentSelectedMonths(months);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentSelectedCategory(category);
  };

  const filteredEvents: PastEventItem[] = pastEventData.filter((event) => {
    if (currentSort === "할일별") {
      const eventMonthNumber = parseInt(event.month?.replace("월", "") || "0");
      return currentSelectedMonths.includes(eventMonthNumber);
    } else if (currentSort === "행사별") {
      if (!event.event) return false;
      if (currentSelectedCategory === "전체") return true;
      return event.event === currentSelectedCategory;
    } else if (currentSort === "연도별") {
      if (!event.year) return false;
      if (currentSelectedCategory === "전체") return true;
      return event.year === currentSelectedCategory;
    }
    return false;
  });

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

  if (!isReady) return null; // searchParams 준비될 때까지 렌더링 지연

  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full md:w-[70%] mx-auto p-5">
        <TitleAndDescription
          title="이제까지 이런 행사들을 진행했어요!"
          description="예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요."
        />
        <Dropdown onSelect={handleSortChange} selectedSort={currentSort} />{" "}
        {/* 선택된 Sort 넘겨줌 */}
      </div>
      <div className="w-full h-0.5 bg-black my-4"></div>

      <div className="flex flex-col p-4 md:flex-row items-start md:pl-40 lg:pl-[15%] gap-5">
        {currentSort === "할일별" && (
          <>
            <div className="flex flex-col w-full md:w-[50%] gap-4 ">
              <MonthSelector onMonthSelect={handleMonthSelect} />
              <div className="min-h-[300px] gap-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <PastEventCard
                      key={index}
                      title={event.title}
                      description={event.description}
                      onClick={() => setSelectedEvent(event)}
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
              {selectedEvent ? (
                <Checklist
                  title={selectedEvent.title}
                  content={selectedEvent.description}
                  tip={`여기에 ${selectedEvent.title} 팁`}
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
