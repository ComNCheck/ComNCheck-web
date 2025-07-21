import TitleAndDescription from "../../components/TitleAndDescription";
import EventCardList from "./components/EventCardList";

export default function Main() {
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full h-full max-w-5xl mx-auto px-8">
        <TitleAndDescription
          title={"이예림님,\n올해가 58% 지나갔어요!"}
          description={
            "앞으로 남은 행사는 5개 입니다. 오늘도 학과를 위해 힘써주셔서 감사합니다."
          }
        />
        <EventCardList />
      </div>
    </div>
  );
}
