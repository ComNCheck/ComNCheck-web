import { 
  CategoryProps, 
  CheckListType, 
  LeftEventCount, 
  MonthlyChecklistType,
  CalendarEvent,
  CalendarResponseDTO,
  TempEvent,
  CreateEventRequest,
  UpdateEventRequest,
  FixEventRequest,
  CheckStatusUpdate
} from "./event.type";
import instance from "./instance";

export const getMajorEventChecklist = async (params?: { year?: number; category?: string }): Promise<CheckListType[]> => {
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

export const getCountLeftEvent = async(): Promise<LeftEventCount>=>{
  //남은 과행사 개수 조회
  try{
    const response = await instance.get<LeftEventCount>("/api/v1/major-event/count");
    console.log("남은 과행사 개수 조회 성공", response);
    return response.data;
  }catch(error){
    console.error("남은 과행사 개수 조회 실패", error);
    throw error;
  }
}

// ========== Calendar 관련 API 함수들 ==========

// 월별 달력 조회
export const getCalendarEvents = async (year: number, month: number): Promise<CalendarResponseDTO[]> => {
  try {
    const response = await instance.get<CalendarResponseDTO[]>("/api/v1/major-event/calendar", {
      params: { year, month }
    });
    console.log("월별 달력 조회 성공", response);
    return response.data;
  } catch (error) {
    console.error("월별 달력 조회 실패", error);
    throw error;
  }
};

// 임시 행사 저장
export const saveTempEvent = async (eventData: CreateEventRequest): Promise<TempEvent> => {
  try {
    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    
    // 이미지 파일들 추가
    eventData.cardNewsImages.forEach((image, index) => {
      formData.append("cardNewsImages", image);
    });

    const response = await instance.post<TempEvent>("/api/v1/major-event/temp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("임시 행사 저장 성공", response);
    return response.data;
  } catch (error) {
    console.error("임시 행사 저장 실패", error);
    throw error;
  }
};

// 임시 행사 수정
export const updateTempEvent = async (tempEventId: number, eventData: UpdateEventRequest): Promise<TempEvent> => {
  try {
    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    formData.append("majorEventId", eventData.majorEventId.toString());
    
    // 기존 이미지 URL들 추가
    eventData.existingImageUrls.forEach((url, index) => {
      formData.append("existingImageUrls", url);
    });
    
    // 새 이미지 파일들 추가
    eventData.newImages.forEach((image, index) => {
      formData.append("newImages", image);
    });

    const response = await instance.patch<TempEvent>(`/api/v1/major-event/temp/${tempEventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("임시 행사 수정 성공", response);
    return response.data;
  } catch (error) {
    console.error("임시 행사 수정 실패", error);
    throw error;
  }
};

// 임시 행사 삭제
export const deleteTempEvent = async (tempEventId: number): Promise<void> => {
  try {
    const response = await instance.delete(`/api/v1/major-event/temp/${tempEventId}`);
    console.log("임시 행사 삭제 성공", response);
  } catch (error) {
    console.error("임시 행사 삭제 실패", error);
    throw error;
  }
};

// 임시 행사 최종 제출 (확정)
export const submitAllTempEvents = async (tempEventIds: number[]): Promise<CheckListType[]> => {
  try {
    const response = await instance.post<CheckListType[]>("/api/v1/major-event/fix", {
      tempEventIds
    });
    console.log("임시 행사 최종 제출 성공", response);
    return response.data;
  } catch (error) {
    console.error("임시 행사 최종 제출 실패", error);
    throw error;
  }
};

// 확정된 행사 수정
export const updateMajorEvent = async (majorEventId: number, eventData: UpdateEventRequest): Promise<CheckListType> => {
  try {
    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    formData.append("majorEventId", eventData.majorEventId.toString());
    
    // 기존 이미지 URL들 추가
    eventData.existingImageUrls.forEach((url, index) => {
      formData.append("existingImageUrls", url);
    });
    
    // 새 이미지 파일들 추가
    eventData.newImages.forEach((image, index) => {
      formData.append("newImages", image);
    });

    const response = await instance.put<CheckListType>(`/api/v1/major-event/${majorEventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("확정된 행사 수정 성공", response);
    return response.data;
  } catch (error) {
    console.error("확정된 행사 수정 실패", error);
    throw error;
  }
};

// 확정된 행사 삭제
export const deleteMajorEvent = async (majorEventId: number): Promise<void> => {
  try {
    const response = await instance.delete(`/api/v1/major-event/${majorEventId}`);
    console.log("확정된 행사 삭제 성공", response);
  } catch (error) {
    console.error("확정된 행사 삭제 실패", error);
    throw error;
  }
};

// 체크리스트 항목 상태 변경
export const updateChecklistItemStatus = async (itemId: number, isChecked: boolean): Promise<CheckStatusUpdate> => {
  try {
    const response = await instance.put<CheckStatusUpdate>(`/api/v1/major-event/checklists/${itemId}`, {
      isChecked
    });
    console.log("체크리스트 항목 상태 변경 성공", response);
    return response.data;
  } catch (error) {
    console.error("체크리스트 항목 상태 변경 실패", error);
    throw error;
  }
};