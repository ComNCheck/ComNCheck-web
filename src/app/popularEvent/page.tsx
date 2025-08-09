"use client";

import TitleAndDescription from "../../components/TitleAndDescription";
import { useRouter } from "next/navigation";

// 이벤트 카테고리 인터페이스
interface EventCategoryProps {
  icon: string;
  title: string;
}

// 이벤트 카테고리 카드 컴포넌트
const EventCategoryCard: React.FC<EventCategoryProps> = ({ icon, title }) => {
  return (
    <div className="bg-[#EDEDED] rounded-lg px-6 py-4 text-center hover:bg-gray-300 transition-colors cursor-pointer">
      <span className="text-lg mr-2">{icon}</span>
      <span className="text-[#3A3A3A] font-medium">{title}</span>
    </div>
  );
};

// 섹션 컴포넌트
interface SectionProps {
  title: string;
  categories: EventCategoryProps[];
}

const Section: React.FC<SectionProps> = ({ title, categories }) => {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-6 text-[#3A3A3A]">{title}</h2>
      <div className="flex flex-col gap-4">
        {categories.map((category, index) => (
          <EventCategoryCard
            key={index}
            icon={category.icon}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
};

const PopularEvent = () => {
  const router = useRouter();

  // 학생 PICK 행사 데이터
  const studentPickEvents: EventCategoryProps[] = [
    { icon: "🔥", title: "짝선짝후" },
    { icon: "🔧", title: "해커톤" },
    { icon: "🔥", title: "알고리즘 대회" },
  ];

  // AI 추천 행사 데이터
  const aiRecommendedEvents: EventCategoryProps[] = [
    { icon: "🔥", title: "짝선짝후" },
    { icon: "🔧", title: "해커톤" },
    { icon: "🔥", title: "알고리즘 대회" },
  ];

  const handleAddEvent = () => {
    router.push("/calendar/addEvent");
  };

  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full h-full max-w-5xl mx-auto px-8">
        <TitleAndDescription
          title="학생들은 이런 행사를 원해요"
          description="학생들의 목소리가 모이는 공간이에요. 앞을 통해 원하는 행사를 적극적으로 참신과 함께 이곳에 표시돼요."
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <Section title="🏆 학생 PICK 행사" categories={studentPickEvents} />

          <Section
            title="👑 AI ComNCheck 추천 행사"
            categories={aiRecommendedEvents}
          />
        </div>

        <div className="mt-12 flex justify-center w-full">
          <button
            onClick={handleAddEvent}
            className={`w-full px-8 py-4 rounded-lg bg-gray-300 text-white font-medium text-lg transition-colors
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            행사 추가하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularEvent;
