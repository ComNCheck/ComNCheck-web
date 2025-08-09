"use client";

import { useState } from "react";

interface Step3LocationProps {
  onLocationInput: (location: string) => void;
  selectedLocation?: string;
}

export default function Step3Location({
  onLocationInput,
  selectedLocation,
}: Step3LocationProps) {
  const [location, setLocation] = useState<string>(selectedLocation || "");

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationInput(value);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="text-lg font-medium">장소를 입력해주세요</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="행사가 진행될 장소를 입력해주세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {location && (
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {location}
              <button
                onClick={() => {
                  setLocation("");
                  onLocationInput("");
                }}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
