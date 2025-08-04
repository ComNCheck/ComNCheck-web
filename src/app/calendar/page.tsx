import TitleAndDescription from "@/components/TitleAndDescription";
import CalendarComponent from "./components/Calendar";
import EventCheck from "./components/EventCheck";

export default function Calendar() {
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TitleAndDescription
          title={"행사 일정을 달력으로 한눈에 확인해요"}
          description={
            "연간 행사 일정을 픽스하면, 행사 일정이 자동으로 달력에 표시돼요. \n학생들도 언제 어떤 행사가 있는지 바로 알 수 있어요."
          }
        />

        <div className="flex gap-8 mt-8">
          <div className="flex-1">
            <CalendarComponent />
          </div>

          <EventCheck />
        </div>
        <div className="mt-6">
          <button className="w-full bg-[#0077FF] text-white py-3 rounded-lg font-medium">
            행사 일정 픽스
          </button>
          <p className="text-xs text-gray-500 mt-2 text-left">
            * 완료된 일정은 행사 일정 픽스를 눌러주세요. 버튼을 누르면
          </p>
        </div>
      </div>
    </div>
  );
}
