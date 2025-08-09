"use client";

import { useState, useRef } from "react";

interface Step6CardNewsProps {
  onCardNewsInput: (cardNewsLink: string) => void;
  onImageUpload?: (file: File) => void;
  selectedCardNewsLink?: string;
  selectedImage?: File | null;
}

export default function Step6CardNews({
  onCardNewsInput,
  onImageUpload,
  selectedCardNewsLink,
  selectedImage,
}: Step6CardNewsProps) {
  const [cardNewsLink, setCardNewsLink] = useState<string>(
    selectedCardNewsLink || ""
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(
    selectedImage || null
  );
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardNewsChange = (value: string) => {
    setCardNewsLink(value);
    onCardNewsInput(value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 파일 타입 검증
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      setUploadedImage(file);
      onImageUpload?.(file);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            6
          </div>
          <span className="text-lg font-medium">카드뉴스를 추가해주세요</span>
        </div>
        {/* <p className="text-gray-600 text-sm">
          카드뉴스 링크를 입력하거나 이미지 파일을 업로드해주세요
        </p> */}
      </div>

      <div className="space-y-6">
        {/* 링크 입력 섹션 */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카드뉴스 링크
          </label>
          <input
            type="url"
            value={cardNewsLink}
            onChange={(e) => handleCardNewsChange(e.target.value)}
            placeholder="카드뉴스 링크를 입력해주세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div> */}

        {/* 구분선 */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div> */}

        {/* 이미지 업로드 섹션 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 파일 업로드
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {!uploadedImage ? (
            <div
              onClick={handleFileInputClick}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="space-y-2">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    클릭하여 이미지 선택
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF 최대 5MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="업로드된 이미지"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {uploadedImage.name} (
                {(uploadedImage.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            </div>
          )}
        </div>

        {/* 완료 상태 표시 */}
        {(cardNewsLink || uploadedImage) && (
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              카드뉴스 추가 완료
              <button
                onClick={() => {
                  setCardNewsLink("");
                  onCardNewsInput("");
                  handleRemoveImage();
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
