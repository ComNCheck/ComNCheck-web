import { CategoryProps, CheckListType } from "./event.type";
import instance from "./instance";

export const getMajorEventChecklist = async (params?: { year?: number; category?: CategoryProps }): Promise<CheckListType[]> => {
  //과행사 목록 동적 조회(연도별, 행사별)
  try {
    const response = await instance.get<CheckListType[]>("/api/v1/major-event/eventlists",{ params });
    console.log("과행사 목록 체크리스트 api 요청 성공", response);
    return response.data;
  } catch (error) {
    console.error("과행사 목록 체크리스트 api 요청 실패", error);
    throw error;
  }
};