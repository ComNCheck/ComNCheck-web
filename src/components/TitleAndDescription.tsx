import React from "react";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
}

const TitleAndDescription: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-4 sm:mb-6 lg:mb-8">
      {title.split("\n").map((line, idx) => (
        <h1
          key={idx}
          className={
            idx === 0
              ? "text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
              : "text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
          }
        >
          {line}
        </h1>
      ))}
      <p className="text-base sm:text-lg md:text-xl font-medium">
        {description
          .split(". ")
          .filter((sentence) => sentence.trim())
          .map((sentence, index, arr) => (
            <span key={index} className="block">
              {sentence.trim()}
              {sentence.trim().endsWith(".") ? "" : "."}
              <br />
            </span>
          ))}
      </p>
    </div>
  );
};

export default TitleAndDescription;
