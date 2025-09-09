export interface CheckListType{//연도별, 행사별
    majorEventId:number;
    eventName:string;
    date:string;
    location: string;
    notice: string;
    cardNewsImageUrls: string[];
}

export type CategoryProps = "ALL"|
    "FRESHMAN_ORIENTATION"|
    "MEETING" |
    "FACE_TO_FACE_MEETING" |
    "SNACK_EVENT" |
    "MT" | 
    "KICK_OFF" |
    "SPORTS_DAY" |
    "FESTIVAL" |
    "HOME_COMING_DAY" 

// Tip 객체 타입 정의
export interface Tip {
  id: number;
  content: string;
}

// 개별 체크리스트 아이템 타입 정의
export interface ChecklistItem {
  id: number;
  content: string;
  isChecked: boolean;
}

// 체크리스트 그룹 (하나의 행사) 타입 정의
export interface ChecklistGroup {
  id: number;
  title: string;
  tips: Tip[]; 
  checklists: ChecklistItem[];
}

export interface MonthlyChecklistType { // 할일별
  startMonth: number;
  endMonth: number;
  checklists: ChecklistGroup[]; 
}

export interface LeftEventCount{
  count: number; // 남은 과행사 개수
}

// Calendar 관련 타입 정의
export interface CalendarEvent {
  id: number;
  eventName: string;
  startDate: string;
  endDate: string;
  eventStatus: "TEMPORARY" | "FIXED";
}

// API 스키마에 맞는 CalendarResponseDTO 타입 정의
export interface CalendarResponseDTO {
  id: number;
  eventName: string;
  startDate: string;
  endDate: string;
  eventStatus: "TEMPORARY" | "FIXED";
  category: string;
  location: string;
  notice: string;
  googleFormLink: string;
  time: string;
  cardNewsImageUrls: string[];
}

// 임시 행사 관련 타입 정의
export interface TempEvent {
  tempEventId: number;
  eventName: string;
  category: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  notice: string;
  googleFormLink: string;
  cardNewsImageUrls: string[];
}

// 행사 생성 요청 타입
export interface CreateEventRequest {
  eventName: string;
  category: string;
  location: string;
  notice: string;
  googleFormLink: string;
  startDate: string;
  endDate: string;
  time: string;
  cardNewsImages: File[];
}

// 행사 수정 요청 타입
export interface UpdateEventRequest {
  eventName: string;
  category: string;
  location: string;
  notice: string;
  googleFormLink: string;
  startDate: string;
  endDate: string;
  time: string;
  majorEventId: number;
  existingImageUrls: string[];
  newImages: File[];
}

// 행사 확정 요청 타입
export interface FixEventRequest {
  tempEventIds: number[];
}

// 체크리스트 상태 업데이트 타입
export interface CheckStatusUpdate {
  isChecked: boolean;
}