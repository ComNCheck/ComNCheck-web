"use client";

import { useState, useEffect } from "react";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";

interface NotificationProps {
  message: string;
  subMessage?: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export default function Notification({
  message,
  subMessage,
  type = "success",
  duration = 3000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FaCheck className="text-blue-300" />
            </div>
          </div>
        );
      case "error":
        return (
          <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "info":
        return (
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/50 transition-all duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 mx-4 max-w-sm w-full transform transition-all duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Success Icon */}
          {getIcon()}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900">{message}</h3>

          {/* Description */}
          {subMessage && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {subMessage}
            </p>
          )}

          {/* Confirm Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
