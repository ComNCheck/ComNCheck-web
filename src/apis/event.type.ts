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
    "FIRST_SEMESTER_OPENING_MEETING" |
    "FIRST_SEMESTER_CLOSING_MEETING" |
    "SECOND_SEMESTER_OPENING_MEETING" |
    "SECOND_SEMESTER_CLOSING_MEETING" |
    "FACE_TO_FACE_MEETING" |
    "FIRST_SEMESTER_MIDTERM_SNACK" |
    "FIRST_SEMESTER_FINAL_SNACK" |
    "SECOND_SEMESTER_MIDTERM_SNACK" |
    "SECOND_SEMESTER_FINAL_SNACK" |
    "MT" | 
    "KICK_OFF" |
    "COLLEGE_SPORTS_DAY" |
    "UNIVERSITY_SPORTS_DAY" |
    "FESTIVAL" |
    "HOMECOMING_DAY" |
    "ETC" 

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

// Swagger 스펙에 맞는 행사 생성 요청 타입 (Create 스키마)
export interface CreateEventRequest {
  eventName: string;
  category: "FRESHMAN_ORIENTATION" | "FIRST_SEMESTER_OPENING_MEETING" | "FIRST_SEMESTER_CLOSING_MEETING" | "SECOND_SEMESTER_OPENING_MEETING" | "SECOND_SEMESTER_CLOSING_MEETING" | "FACE_TO_FACE_MEETING" | "FIRST_SEMESTER_MIDTERM_SNACK" | "FIRST_SEMESTER_FINAL_SNACK" | "SECOND_SEMESTER_MIDTERM_SNACK" | "SECOND_SEMESTER_FINAL_SNACK" | "MT" | "KICK_OFF" | "COLLEGE_SPORTS_DAY" | "UNIVERSITY_SPORTS_DAY" | "FESTIVAL" | "HOMECOMING_DAY" | "ETC";
  hostType: "COMPUTER_SCIENCE" | "ETC";
  location: string;
  notice: string;
  googleFormLink: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
  time: string; // HH:mm:ss 형식
  cardNewsImages: File[];
}

// Swagger 스펙에 맞는 행사 수정 요청 타입 (Update 스키마)
export interface UpdateEventRequest {
  eventName: string;
  category: "FRESHMAN_ORIENTATION" | "FIRST_SEMESTER_OPENING_MEETING" | "FIRST_SEMESTER_CLOSING_MEETING" | "SECOND_SEMESTER_OPENING_MEETING" | "SECOND_SEMESTER_CLOSING_MEETING" | "FACE_TO_FACE_MEETING" | "FIRST_SEMESTER_MIDTERM_SNACK" | "FIRST_SEMESTER_FINAL_SNACK" | "SECOND_SEMESTER_MIDTERM_SNACK" | "SECOND_SEMESTER_FINAL_SNACK" | "MT" | "KICK_OFF" | "COLLEGE_SPORTS_DAY" | "UNIVERSITY_SPORTS_DAY" | "FESTIVAL" | "HOMECOMING_DAY" | "ETC";
  hostType: "COMPUTER_SCIENCE" | "ETC";
  location: string;
  notice: string;
  googleFormLink: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
  time: string; // HH:mm:ss 형식
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