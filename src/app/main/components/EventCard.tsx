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
      className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-300 w-full max-w-sm min-h-[280px] sm:min-h-[320px] md:min-h-[390px]
        ${
          isActive
            ? "bg-[#0077FF] text-white"
            : "bg-[#EDEDED] text-[#555] hover:bg-[#0077FF] hover:text-white"
        }`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug mb-3 sm:mb-4">
        {title}
      </h2>
      <p className="text-sm sm:text-base leading-relaxed">{description}</p>
      <div className="absolute right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 md:bottom-8">
        <IoArrowForwardCircle
          className={`text-2xl sm:text-3xl md:text-4xl transition-colors w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15
            ${isActive ? "text-white" : "text-[#C7C7C7] hover:text-[#0077FF]"}`}
        />
      </div>
    </div>
  );
};

export default EventCard;
