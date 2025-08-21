import { CategoryProps, CheckListType, MonthlyChecklistType } from "./event.type";
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
export const getMonthlyChecklist = async (params?: {startMonth: string; endMonth: string}): Promise<MonthlyChecklistType[]> => {
  //과행사 목록 동적 조회(할일별)
  try {
    const response = await instance.get<MonthlyChecklistType[]>("/api/v1/major-event/checklists/monthly",{ params });
    console.log("월별 할일 체크리스트 api 요청 성공", response);
    return response.data;
  } catch (error) {
    console.error("월별 할일 체크리스트 api 요청 실패", error);
    throw error;
  }
};

export const putChecklistCompleted = async(itemId: number,  isChecked: boolean):Promise<void>=>{
  //체크리스트 상태 업데이트
  try{
    const response = await instance.put(`/api/v1/major-event/checklists/${itemId}`,{isChecked});
    console.log("체크리스트 완료 상태 업데이트 성공", response);
  }catch(error) {
    console.error("체크리스트 완료 상태 업데이트 실패", error);
    throw error;
  }
}