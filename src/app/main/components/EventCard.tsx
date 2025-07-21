"use client";

import React from "react";
import { IoArrowForwardCircle } from "react-icons/io5";

interface EventCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 w-full max-w-sm min-h-[390px]
        ${
          isActive
            ? "bg-[#0077FF] text-white"
            : "bg-[#EDEDED] text-[#555] hover:bg-[#0077FF] hover:text-white"
        }`}
    >
      <h2 className="text-3xl font-extrabold leading-snug mb-4">{title}</h2>
      <p className="text-base leading-relaxed">{description}</p>
      <div className="absolute right-8 bottom-8 ">
        <IoArrowForwardCircle
          className={`text-4xl transition-colors w-15 h-15
            ${isActive ? "text-white" : "text-[#C7C7C7] hover:text-[#0077FF]"}`}
        />
      </div>
    </div>
  );
};

export default EventCard;
