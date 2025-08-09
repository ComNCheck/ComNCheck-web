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
  { item: "새내기 배움터", sort: "기존행사" },
  { item: "1학기 개강총회", sort: "기존행사" },
  { item: "대면식", sort: "기존행사" },
  { item: "1학기 중간고사 간식행사", sort: "기존행사" },
  { item: "1학기 기말고사 간식행사", sort: "기존행사" },
  { item: "MT", sort: "기존행사" },
  { item: "1학기 종강총회", sort: "기존행사" },
  { item: "해오름식", sort: "기존행사" },
  { item: "공대 체전", sort: "기존행사" },
  { item: "왕산 체전", sort: "기존행사" },
  { item: "축제", sort: "기존행사" },
  { item: "2학기 개강총회", sort: "기존행사" },
  { item: "2학기 중간고사 간식행사", sort: "기존행사" },
  { item: "2학기 기말고사 간식행사", sort: "기존행사" },
  { item: "홈커밍 데이", sort: "기존행사" },
];

export default function Step1Category({
  onCategorySelect,
  selectedCategory,
}: Step1CategoryProps) {
  const handleCategorySelect = (selectedItem: string) => {
    onCategorySelect(selectedItem);
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

      <Category categoryList={categoryList} onSelect={handleCategorySelect} />
    </div>
  );
}
