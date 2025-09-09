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

// 임시 행사 저장 (Swagger 스펙에 맞게 구현)
export const saveTempEvent = async (eventData: CreateEventRequest): Promise<TempEvent> => {
  try {
    const formData = new FormData();
    
    // 필수 필드들 추가 (Swagger Create 스키마에 맞게)
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("hostType", eventData.hostType);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    
    // 이미지 파일들 추가 (cardNewsImages 필드명 사용)
    eventData.cardNewsImages.forEach((image) => {
      formData.append("cardNewsImages", image);
    });

    // FormData 내용 로깅
    console.log("📤 임시 행사 저장 FormData 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await instance.post<TempEvent>("/api/v1/major-event/temp", formData);
    console.log("✅ 임시 행사 저장 성공", response);
    return response.data;
  } catch (error) {
    console.error("❌ 임시 행사 저장 실패", error);
    throw error;
  }
};

// 임시 행사 수정 (Swagger 스펙에 맞게 구현)
export const updateTempEvent = async (tempEventId: number, eventData: UpdateEventRequest): Promise<TempEvent> => {
  try {
    const formData = new FormData();
    
    // 필수 필드들 추가 (Swagger Update 스키마에 맞게)
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("hostType", eventData.hostType);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    formData.append("majorEventId", eventData.majorEventId.toString());
    
    // 기존 이미지 URL들 추가
    eventData.existingImageUrls.forEach((url) => {
      formData.append("existingImageUrls", url);
    });
    
    // 새 이미지 파일들 추가
    eventData.newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    // FormData 내용 로깅
    console.log("📤 임시 행사 수정 FormData 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await instance.patch<TempEvent>(`/api/v1/major-event/temp/${tempEventId}`, formData);
    console.log("✅ 임시 행사 수정 성공", response);
    return response.data;
  } catch (error) {
    console.error("❌ 임시 행사 수정 실패", error);
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

// 확정된 행사 수정 (Swagger 스펙에 맞게 구현)
export const updateMajorEvent = async (majorEventId: number, eventData: UpdateEventRequest): Promise<CheckListType> => {
  try {
    const formData = new FormData();
    
    // 필수 필드들 추가 (Swagger Update 스키마에 맞게)
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("hostType", eventData.hostType);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    formData.append("majorEventId", eventData.majorEventId.toString());
    
    // 기존 이미지 URL들 추가
    eventData.existingImageUrls.forEach((url) => {
      formData.append("existingImageUrls", url);
    });
    
    // 새 이미지 파일들 추가
    eventData.newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    // FormData 내용 로깅
    console.log("📤 확정된 행사 수정 FormData 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await instance.put<CheckListType>(`/api/v1/major-event/${majorEventId}`, formData);
    console.log("✅ 확정된 행사 수정 성공", response);
    return response.data;
  } catch (error) {
    console.error("❌ 확정된 행사 수정 실패", error);
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

// ========== Swagger 스펙에 맞는 새로운 임시 행사 저장 API ==========

/**
 * Swagger 스펙에 맞는 임시 행사 저장 API
 * @param eventData - Create 스키마에 맞는 행사 데이터
 * @returns TempEventResponseDTO
 */
export const saveTempEventV2 = async (eventData: CreateEventRequest): Promise<TempEvent> => {
  try {
    const formData = new FormData();
    
    // Swagger Create 스키마의 모든 필수 필드 추가
    formData.append("eventName", eventData.eventName);
    formData.append("category", eventData.category);
    formData.append("hostType", eventData.hostType);
    formData.append("location", eventData.location);
    formData.append("notice", eventData.notice);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time);
    
    // 이미지 파일들 추가 (cardNewsImages 필드명 사용)
    eventData.cardNewsImages.forEach((image) => {
      formData.append("cardNewsImages", image);
    });

    // FormData 내용 로깅
    console.log("📤 Swagger 스펙 임시 행사 저장 FormData 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await instance.post<TempEvent>("/api/v1/major-event/temp", formData);
    console.log("✅ Swagger 스펙 임시 행사 저장 성공", response);
    return response.data;
  } catch (error) {
    console.error("❌ Swagger 스펙 임시 행사 저장 실패", error);
    throw error;
  }
};