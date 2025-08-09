"use client";

import { useState } from "react";

interface Step4AnnouncementProps {
  onAnnouncementInput: (announcement: string) => void;
  selectedAnnouncement?: string;
}

export default function Step4Announcement({
  onAnnouncementInput,
  selectedAnnouncement,
}: Step4AnnouncementProps) {
  const [announcement, setAnnouncement] = useState<string>(
    selectedAnnouncement || ""
  );

  const handleAnnouncementChange = (value: string) => {
    setAnnouncement(value);
    onAnnouncementInput(value);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            4
          </div>
          <span className="text-lg font-medium">공지글을 입력해주세요</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={announcement}
            onChange={(e) => handleAnnouncementChange(e.target.value)}
            placeholder="공지글을 입력해주세요"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {announcement && (
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              공지글 작성 완료
              <button
                onClick={() => {
                  setAnnouncement("");
                  onAnnouncementInput("");
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
