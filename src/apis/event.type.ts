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
