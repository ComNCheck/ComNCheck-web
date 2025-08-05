import TitleAndDescription from "@/components/TitleAndDescription";
import AddEventList from "./components/AddEventList";

export default function AddEvent() {
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full h-full max-w-5xl mx-auto px-8">
        <TitleAndDescription
          title={"행사 일정 추가하기"}
          description={
            "컴공에서 연례적으로 진행된 행사는 기존행사, 새로운 행사는 NEW 행사, 컴공 외에서 진행하는 행사는 타 주최 행사로 선택해주세요."
          }
        />
        <AddEventList />
      </div>
    </div>
  );
}
