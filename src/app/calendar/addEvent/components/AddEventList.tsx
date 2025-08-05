"use client";

import React from "react";
import CardList from "@/components/CardList";

const cardData = [
  {
    title: "기존 행사 추가하기",
    description:
      "새터, 개총, 종총, 대면식, 간식행사, MT, 해오름식, 체전, 축제, 홈커밍 데이가 기존행사에 포함돼요!",
    path: "/past-event",
  },
  {
    title: "NEW 행사 추가하기",
    description:
      "기존 행사 외에 그 해에 진행하고 싶은 행사들이 있다면, NEW 행사로 추가해주세요!",
    path: "/calendar",
  },
  {
    title: "타 주최 행사 추가하기",
    description:
      "공대, or 타 기관에서 주최하는 행사들은 모두 타 주최 행사로 추가해주세요!",
    path: "/popularEvent",
  },
];

const AddEventList: React.FC = () => {
  return <CardList cardData={cardData} />;
};

export default AddEventList;
