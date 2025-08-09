"use client";

interface StepProgressProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { number: 1, title: "카테고리 선택" },
  { number: 2, title: "날짜 선택" },
  { number: 3, title: "장소 입력" },
  { number: 4, title: "공지글 입력" },
  { number: 5, title: "구글폼 링크" },
  { number: 6, title: "카드뉴스 추가" },
];

export default function StepProgress({
  currentStep,
  completedSteps,
}: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : step.number}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
