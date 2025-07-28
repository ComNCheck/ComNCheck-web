import TitleAndDescription from "@/components/TitleAndDescription";
import Dropdown from "./components/Dropdown";
import MonthSelector from "./components/MonthSelector";

export default function PastEvent() {
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12 pt-24 ">
      <div className="w-[70%] mx-auto">
        <TitleAndDescription
          title="이제까지 이런 행사들을 진행했어요!"
          description="예전 기수 학생회 분들이 했었던 행사들을 확인할 수 있어요."
        />
        <Dropdown />
      </div>
      <div className="w-full h-0.5 bg-black my-4"></div>
      <div className="flex flex-row items-center">
        <MonthSelector />
        <div>체크리스트</div>
      </div>
    </div>
  );
}
