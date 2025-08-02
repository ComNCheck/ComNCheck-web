"use client";

import TitleAndDescription from "@/components/TitleAndDescription";
import Dropdown from "./components/Dropdown";
import MonthSelector from "./components/MonthSelector";
import PastEventCard from "./components/PastEventCard";
import { useEffect, useState } from "react";
import pastEventData from "@/apis/PastEvent.json";
import Checklist from "./components/Checklist";
import Category from "@/components/Category";
import { useRouter, useSearchParams } from "next/navigation";
interface PastEventItem {
  title: string;
  description: string;
  month: string;
  sort: string;
}

export default function PastEvent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSort = searchParams.get("sort") || "할일별";
  const [currentSort, setCurrentSort] = useState<string>(initialSort);
  const [currentSelectedMonths, setCurrentSelectedMonths] = useState<number[]>(
    []
  );
  const [currentSelectedCategory, setCurrentSelectedCategory] =
    useState<string>("");

  // 초기에 쿼리스트링에서 sort 값을 읽어 상태를 세팅
  useEffect(() => {
    if (!searchParams.get("sort")) {
      handleSortChange("할일별");
    }
  }, []);

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    setCurrentSelectedMonths([]);
    setCurrentSelectedCategory("");
    // 쿼리 업데이트 (replace 대신 push도 가능)
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
      const eventMonthNumber = parseInt(event.month.replace("월", ""));
      return currentSelectedMonths.includes(eventMonthNumber);
    } else if (currentSort === "행사별" || "연도별") {
      return event.sort === currentSelectedCategory;
    }
  });

  const categoryList = {
    할일별: [],
    연도별: [
      { item: "전체", sort: "연도별" },
      { item: "2025", sort: "연도별" },
      { item: "2024", sort: "연도별" },
    ],
    행사별: [
      { item: "전체", sort: "행사별" },
      { item: "OT", sort: "행사별" },
      { item: "MT", sort: "행사별" },
      { item: "축제", sort: "행사별" },
    ],
  };
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12 pt-24 ">
      <div className="w-[70%] mx-auto">
        <TitleAndDescription
          title="이제까지 이런 행사들을 진행했어요!"
          description="예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요."
        />
        <Dropdown onSelect={handleSortChange} />
      </div>
      <div className="w-full h-0.5 bg-black my-4"></div>
      <div className="flex flex-row items-start pl-60 gap-5">
        <div className="flex flex-col w-[50%] gap-4 ">
          {currentSort === "할일별" ? (
            <MonthSelector onMonthSelect={handleMonthSelect} />
          ) : currentSort === "연도별" || currentSort === "행사별" ? (
            <Category
              categoryList={categoryList[currentSort]}
              onSelect={handleCategorySelect}
            />
          ) : null}

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
                선택된 월에 해당하는 행사가 없습니다.
              </p>
            )}
          </div>
        </div>
        <div className="w-[35%] h-full">
          <Checklist
            title="강의실 대관"
            content="강의실 대관은 어디에서 진행하면 되고, ~"
            tip={`1. 공연 준비는 집부들이 모이는게 어렵기 때문에 1월초부터 미리미리 준비(간단한 연극식, 마술, 기타 등등)
                2.학생회관(학생지원팀) 지하 무용실, 학생회관(동아립연합회장) B05호실 사용
                (여담) 학생회관 B05 비밀번호 1241 한번 해서 되면, 몰래 연습가능`}
          />
        </div>
      </div>
    </div>
  );
}
