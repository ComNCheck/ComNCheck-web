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
    <div className="mb-4">
      {title.split("\n").map((line, idx) => (
        <h1
          key={idx}
          className={
            idx === 0
              ? "text-4xl md:text-5xl font-bold mb-1"
              : "text-4xl md:text-5xl font-bold mb-2"
          }
        >
          {line}
        </h1>
      ))}
      <p className="text-xl md:text-2xl font-medium ">
        {description
          .split(".")
          .filter((sentence) => sentence.trim())
          .map((sentence, index, arr) => (
            <span key={index} className="block md:inline">
              {sentence.trim()}
              {index < arr.length - 1 ? "." : ""}
            </span>
          ))}
      </p>
    </div>
  );
};

export default TitleAndDescription;
