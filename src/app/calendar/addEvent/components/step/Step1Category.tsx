"use client";

import { useState } from "react";
import Category from "@/components/Category";

interface CategoryItem {
  item: string;
  sort: string;
}

interface Step1CategoryProps {
  onCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

const categoryList = [
  { item: "새내기 배움터", sort: "FRESHMAN_ORIENTATION" },
  { item: "1학기 개강총회", sort: "FIRST_SEMESTER_OPENING_MEETING" },
  { item: "대면식", sort: "FACE_TO_FACE_MEETING" },
  { item: "1학기 중간고사 간식행사", sort: "FIRST_SEMESTER_MIDTERM_SNACK" },
  { item: "1학기 기말고사 간식행사", sort: "FIRST_SEMESTER_FINAL_SNACK" },
  { item: "MT", sort: "MT" },
  { item: "1학기 종강총회", sort: "FIRST_SEMESTER_CLOSING_MEETING" },
  { item: "해오름식", sort: "KICK_OFF" },
  { item: "공대 체전", sort: "COLLEGE_SPORTS_DAY" },
  { item: "왕산 체전", sort: "UNIVERSITY_SPORTS_DAY" },
  { item: "축제", sort: "FESTIVAL" },
  { item: "2학기 개강총회", sort: "SECOND_SEMESTER_OPENING_MEETING" },
  { item: "2학기 종강총회", sort: "SECOND_SEMESTER_CLOSING_MEETING" },
  { item: "2학기 중간고사 간식행사", sort: "SECOND_SEMESTER_MIDTERM_SNACK" },
  { item: "2학기 기말고사 간식행사", sort: "SECOND_SEMESTER_FINAL_SNACK" },
  { item: "홈커밍 데이", sort: "HOMECOMING_DAY" },
  { item: "기타", sort: "ETC" },
];

export default function Step1Category({
  onCategorySelect,
  selectedCategory,
}: Step1CategoryProps) {
  const handleCategorySelect = (selectedEnum: string) => {
    // Category 컴포넌트에서 이미 영문 enum 값을 전달함
    console.log("🔍 Step1Category - 받은 영문 enum:", selectedEnum);
    onCategorySelect(selectedEnum);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="text-lg font-medium">카테고리를 선택해주세요</span>
        </div>
      </div>

      <Category 
        categoryList={categoryList} 
        onSelect={handleCategorySelect}
        selectedCategory={selectedCategory ? categoryList.find(cat => cat.sort === selectedCategory)?.item : undefined}
      />
    </div>
  );
}
