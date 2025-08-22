"use client"
import { useEffect, useState } from "react";
import TitleAndDescription from "../../components/TitleAndDescription";
import EventCardList from "./components/EventCardList";
import { getCountLeftEvent } from "@/apis/event";
import { LeftEventCount } from "@/apis/event.type";

export default function Main() {
  const [count, setCount]=useState<LeftEventCount | null>(null);
  useEffect(()=>{
    const fetchCount = async()=>{
      try{
        const data = await getCountLeftEvent();
        setCount(data);
      }catch(error){
        console.error("남은 과행사 개수 조회 실패", error);
      }
    }
    fetchCount();
  },[])
  return (
    <div className="min-h-screen text-black bg-white flex flex-col items-left justify-left py-12">
      <div className="w-full h-full max-w-5xl mx-auto px-8">
        <TitleAndDescription
          title={"이예림님,\n올해가 58% 지나갔어요!"}
          description={
            `앞으로 남은 행사는 ${count?.count}개 입니다. 오늘도 학과를 위해 힘써주셔서 감사합니다.`
          }
        />
        <EventCardList />
      </div>
    </div>
  );
}
