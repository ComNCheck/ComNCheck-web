"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "@/app/main/components/EventCard";

interface CardData {
  title: string;
  description: string;
  path: string;
}

interface CardListProps {
  cardData: CardData[];
}

const CardList: React.FC<CardListProps> = ({ cardData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center h-auto mt-8 sm:mt-12 lg:mt-15">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="w-full sm:w-auto"
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

export default CardList;
