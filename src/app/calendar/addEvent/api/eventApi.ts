// 이벤트 API 관련 함수들
import instance from "@/apis/instance";

interface EventData {
  category?: string;
  eventName?: string;
  startDate: string;
  endDate: string;
  location: string;
  announcement: string;
  googleFormLink: string;
  cardNewsLink: string;
  cardNewsImages?: File[]; // 이미지 파일들 추가
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * 기존행사 생성 (임시 행사 저장)
 */
export async function createPastEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", ""); // 시간 필드 (필요시 추가)
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    console.log("📤 FormData 전송:", {
      eventName: eventData.eventName,
      category: eventData.category,
      location: eventData.location,
      imageCount: eventData.cardNewsImages?.length || 0
    });
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      message: error.response?.data?.message || "네트워크 오류가 발생했습니다.",
    };
  }
}

/**
 * 신규행사 생성 (임시 행사 저장)
 */
export async function createNewEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", ""); // 시간 필드 (필요시 추가)
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      message: error.response?.data?.message || "네트워크 오류가 발생했습니다.",
    };
  }
}

/**
 * 기타행사 생성 (임시 행사 저장)
 */
export async function createAnotherEvent(
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    // FormData 생성
    const formData = new FormData();
    
    // 기본 필드들 추가
    formData.append("eventName", eventData.eventName || "");
    formData.append("category", eventData.category || "");
    formData.append("location", eventData.location);
    formData.append("notice", eventData.announcement);
    formData.append("googleFormLink", eventData.googleFormLink);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("time", ""); // 시간 필드 (필요시 추가)
    
    // 이미지 파일들 추가
    if (eventData.cardNewsImages && eventData.cardNewsImages.length > 0) {
      eventData.cardNewsImages.forEach((image, index) => {
        formData.append("cardNewsImages", image);
      });
    }
    
    const response = await instance.post("/api/v1/major-event/temp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      message: error.response?.data?.message || "네트워크 오류가 발생했습니다.",
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
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${eventId}`);

    const result = await response.json();
    return {
      success: response.ok,
      data: result,
      message: result.message,
    };
  } catch (error) {
    console.error("이벤트 조회 실패:", error);
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
}

/**
 * 기존행사 수정
 */
export async function updatePastEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/past-events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: result,
      message: result.message,
    };
  } catch (error) {
    console.error("기존행사 수정 실패:", error);
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
}

/**
 * 신규행사 수정
 */
export async function updateNewEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/new-events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: result,
      message: result.message,
    };
  } catch (error) {
    console.error("신규행사 수정 실패:", error);
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
}

/**
 * 기타행사 수정
 */
export async function updateAnotherEvent(
  eventId: string,
  eventData: EventData
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/another-events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: result,
      message: result.message,
    };
  } catch (error) {
    console.error("기타행사 수정 실패:", error);
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
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
