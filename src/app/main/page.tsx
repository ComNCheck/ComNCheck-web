"use client"
import { useEffect, useState } from "react";
import TitleAndDescription from "../../components/TitleAndDescription";
import EventCardList from "./components/EventCardList";
import { getCountLeftEvent } from "@/apis/event";
import { LeftEventCount } from "@/apis/event.type";
import { getMemberData } from "@/apis/member";

export default function Main() {
  const [count, setCount]=useState<LeftEventCount | null>(null);
  const [memberName, setMemberName]=useState<string>("");
  const [percentPassed, setPercentPassed] = useState<number>(0);

  useEffect(()=>{
    const fetchCount = async()=>{
      try{
        const data = await getCountLeftEvent();
        const name= await getMemberData();
        setCount(data);
        setMemberName(name.name); 
      }catch(error){
        console.error("남은 과행사 개수 조회 실패", error);
      }
    }
    const calculateYearPassed = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const year = now.getFullYear();
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      const totalDaysInYear = isLeapYear ? 366 : 365;

      const percentage = Math.floor((dayOfYear / totalDaysInYear) * 100);
      setPercentPassed(percentage);
    };
    fetchCount();
    calculateYearPassed();
  },[])
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full h-full max-w-5xl mx-auto px-8">
        <TitleAndDescription
          title={`${memberName}님,\n올해가 ${percentPassed}% 지나갔어요!`}
          description={
            `앞으로 남은 행사는 ${count?.count}개 입니다. 오늘도 학과를 위해 힘써주셔서 감사합니다.`
          }
        />
        <EventCardList />
      </div>
    </div>
  );
}
