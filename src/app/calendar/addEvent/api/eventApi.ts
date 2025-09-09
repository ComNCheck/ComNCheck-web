// 이벤트 API 관련 함수들
import instance from "@/apis/instance";

// Swagger 스펙에 맞는 EventData 인터페이스
interface EventData {
  category?: "FRESHMAN_ORIENTATION" | "FIRST_SEMESTER_OPENING_MEETING" | "FIRST_SEMESTER_CLOSING_MEETING" | "SECOND_SEMESTER_OPENING_MEETING" | "SECOND_SEMESTER_CLOSING_MEETING" | "FACE_TO_FACE_MEETING" | "FIRST_SEMESTER_MIDTERM_SNACK" | "FIRST_SEMESTER_FINAL_SNACK" | "SECOND_SEMESTER_MIDTERM_SNACK" | "SECOND_SEMESTER_FINAL_SNACK" | "MT" | "KICK_OFF" | "COLLEGE_SPORTS_DAY" | "UNIVERSITY_SPORTS_DAY" | "FESTIVAL" | "HOMECOMING_DAY" | "ETC";
  eventName?: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
  location: string;
  announcement: string;
  googleFormLink: string;
  cardNewsLink: string;
  cardNewsImages?: File[]; // 이미지 파일들 추가
  hostType?: "COMPUTER_SCIENCE" | "ETC"; // 주최 유형 추가
  time?: string; // HH:mm:ss 형식
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * 에러 타입에 따른 구체적인 메시지 반환
 */
function getErrorMessage(error: any): string {
  // 서버 응답이 있는 경우
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // 네트워크 에러 감지 (더 구체적으로)
  const isNetworkError = 
    error.code === 'ECONNREFUSED' || 
    error.code === 'ENOTFOUND' || 
    error.code === 'ETIMEDOUT' ||
    error.code === 'ECONNABORTED' ||
    error.message.includes('Network Error') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('ERR_NETWORK') ||
    error.message.includes('ERR_CONNECTION_REFUSED') ||
    error.message.includes('ERR_CONNECTION_TIMED_OUT') ||
    error.message.includes('ERR_INTERNET_DISCONNECTED') ||
    (error.response === undefined && error.request !== undefined) ||
    (error.code === 'ERR_CANCELED' && error.message.includes('timeout'));
  
  if (isNetworkError) {
    // FormData 요청인 경우 특별한 메시지
    if (error.config?.data instanceof FormData) {
      return "파일 업로드 중 네트워크 오류가 발생했습니다. 네트워크 상태를 확인하고 다시 시도해주세요.";
    }
    return "서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.";
  }
  
  // HTTP 상태 코드별 처리
  if (error.response?.status === 302) {
    return "API 서버 주소가 잘못 설정되었습니다. 관리자에게 문의해주세요.";
  } else if (error.response?.status === 400) {
    return "잘못된 요청입니다. 입력 정보를 확인해주세요.";
  } else if (error.response?.status === 401) {
    return "인증이 필요합니다. 다시 로그인해주세요.";
  } else if (error.response?.status === 413) {
    return "파일 크기가 너무 큽니다. 파일 크기를 줄여주세요.";
  } else if (error.response?.status === 415) {
    return "지원하지 않는 파일 형식입니다. 다른 파일을 선택해주세요.";
  } else if (error.response?.status >= 500) {
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
  
  return "네트워크 오류가 발생했습니다.";
}

/**
 * 기존행사 생성 (임시 행사 저장) - Swagger 스펙에 맞게 구현
 */
export async function createPastEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Create 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    // 카테고리 값 특별 확인
    console.log("🔍 createPastEvent - 카테고리 값 확인:", {
      eventDataCategory: eventData.category,
      formDataCategory: formData.get("category")
    });
    
    // FormData 내용 확인 (보내기 전)
    console.log("📤 FormData 전송 전 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    // 응답 후 FormData 재확인 (보낸 후)
    console.log("📥 FormData 전송 후 응답:", {
      status: response.status,
      data: response.data,
      eventName: eventData.eventName,
      category: eventData.category,
      location: eventData.location,
      imageCount: eventData.cardNewsImages?.length || 0
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("기존행사 생성 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 신규행사 생성 (임시 행사 저장) - Swagger 스펙에 맞게 구현
 */
export async function createNewEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Create 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    // FormData 내용 확인 (보내기 전)
    console.log("📤 FormData 전송 전 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    // 응답 후 FormData 재확인 (보낸 후)
    console.log("📥 FormData 전송 후 응답:", {
      status: response.status,
      data: response.data,
      eventName: eventData.eventName,
      category: eventData.category,
      location: eventData.location,
      imageCount: eventData.cardNewsImages?.length || 0
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("신규행사 생성 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 기타행사 생성 (임시 행사 저장) - Swagger 스펙에 맞게 구현
 */
export async function createAnotherEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Create 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    // FormData 내용 확인 (보내기 전)
    console.log("📤 FormData 전송 전 내용:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    // 응답 후 FormData 재확인 (보낸 후)
    console.log("📥 FormData 전송 후 응답:", {
      status: response.status,
      data: response.data,
      eventName: eventData.eventName,
      category: eventData.category,
      location: eventData.location,
      imageCount: eventData.cardNewsImages?.length || 0
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("기타행사 생성 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 이벤트 데이터 조회
 */
export async function getEvent(
  eventType: string,
  eventId: string
): Promise<ApiResponse<EventData>> {
  try {
    const endpoint = getEventEndpoint(eventType);
    const response = await instance.get(`/${endpoint}/${eventId}`);

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("이벤트 조회 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 기존행사 수정 - Swagger 스펙에 맞게 구현
 */
export async function updatePastEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Update 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    const response = await instance.put(`/api/v1/major-event/temp/${eventId}`, formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("기존행사 수정 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 신규행사 수정 - Swagger 스펙에 맞게 구현
 */
export async function updateNewEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Update 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    const response = await instance.put(`/api/v1/major-event/temp/${eventId}`, formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("신규행사 수정 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 기타행사 수정 - Swagger 스펙에 맞게 구현
 */
export async function updateAnotherEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가 (Swagger Update 스키마에 맞게)
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "ETC");
    formData.append("hostType", eventData.hostType || "COMPUTER_SCIENCE");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", eventData.time || "14:30:00"); // 기본 시간 설정
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    const response = await instance.put(`/api/v1/major-event/temp/${eventId}`, formData, {
      headers: {
        // Content-Type을 명시적으로 설정하지 않음 - 브라우저가 자동으로 boundary 설정
      },
      timeout: 30000, // FormData 요청은 더 긴 타임아웃 설정
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("기타행사 수정 실패:", error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

/**
 * 이벤트 타입에 따른 엔드포인트 반환
 */
function getEventEndpoint(eventType: string): string {
  switch (eventType) {
    case "past":
      return "past-events";
    case "new":
      return "new-events";
    case "another":
      return "another-events";
    default:
      throw new Error("유효하지 않은 이벤트 타입입니다.");
  }
}

/**
 * 통합 이벤트 생성 함수
 */
export async function createEvent(
  eventType: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  switch (eventType) {
    case "past":
      return createPastEvent(eventData);
    case "new":
      return createNewEvent(eventData);
    case "another":
      return createAnotherEvent(eventData);
    default:
      return {
        success: false,
        message: "유효하지 않은 이벤트 타입입니다.",
      };
  }
}

/**
 * 통합 이벤트 수정 함수
 */
export async function updateEvent(
  eventType: string,
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  switch (eventType) {
    case "past":
      return updatePastEvent(eventId, eventData);
    case "new":
      return updateNewEvent(eventId, eventData);
    case "another":
      return updateAnotherEvent(eventId, eventData);
    default:
      return {
        success: false,
        message: "유효하지 않은 이벤트 타입입니다.",
      };
  }
}
