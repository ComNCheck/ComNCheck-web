import instance from "./instance";
import { memberType } from "./member.type";

export const getMemberData = async (): Promise<memberType> => {
  //본인 정보 조회
    try {
    const response = await instance.get("/api/v1/member");
    return response.data;
  } catch (error) {
    console.error("회원정보 불러오기 실패: ", error);
    throw error;
  }
};