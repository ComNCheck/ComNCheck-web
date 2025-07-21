"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "./EventCard";

const cardData = [
  {
    title: "이제까지 이런 행사들을 진행했어요!",
    description: "예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요.",
    path: "/",
  },
  {
    title: "행사 일정을 달력으로 한눈에 확인해요",
    description:
      "연간 행사 일정을 체크하면, 행사 일정이 자동으로 달력에 표시돼요. 학생들은 언제 어떤 행사가 있는지 바로 볼 수 있어요.",
    path: "/calendar",
  },
  {
    title: "학생들은 이런 행사를 원해요",
    description:
      "학생들의 목소리가 모이는 공간이에요. 학생들이 원하는 행사만 작성하면 명칭과 함께 이곳에 표시돼요.",
    path: "/popularEvent",
  },
];

const EventCardList: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center h-auto mt-15">
      {cardData.map((card, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <EventCard
            title={card.title}
            description={card.description}
            isActive={hoveredIndex === index}
            onClick={() => {
              router.push(card.path);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default EventCardList;
