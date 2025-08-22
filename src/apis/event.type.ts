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