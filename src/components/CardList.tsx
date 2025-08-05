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

export default CardList;
