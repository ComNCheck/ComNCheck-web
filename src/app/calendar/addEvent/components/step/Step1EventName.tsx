"use client";

import { useState } from "react";

interface Step1EventNameProps {
  onEventNameInput: (eventName: string) => void;
  selectedEventName?: string;
}

export default function Step1EventName({
  onEventNameInput,
  selectedEventName,
}: Step1EventNameProps) {
  const [eventName, setEventName] = useState<string>(selectedEventName || "");

  const handleEventNameChange = (value: string) => {
    setEventName(value);
    onEventNameInput(value);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="text-lg font-medium">행사명을 입력해주세요</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={eventName}
            onChange={(e) => handleEventNameChange(e.target.value)}
            placeholder="행사명을 입력해주세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {eventName && (
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {eventName}
              <button
                onClick={() => {
                  setEventName("");
                  onEventNameInput("");
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
