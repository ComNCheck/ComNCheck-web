import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 에러 발생 시 처리
      if (
        !error.response.data ||
        error.response.data.error !== "TOKEN_EXPIRED"
      ) {
        // 클라이언트 사이드에서만 실행
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
