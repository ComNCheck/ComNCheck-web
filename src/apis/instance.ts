import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 토큰 관리 함수들
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // localStorage에서 먼저 확인
    const localToken = localStorage.getItem("accessToken");
    if (localToken) {
      return localToken;
    }
    
    // 쿠키에서 토큰 확인 (대소문자 구분 없이)
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      const cookieName = name.toLowerCase();
      if (cookieName.includes('token') || cookieName.includes('access')) {
        console.log("🍪 쿠키에서 토큰 발견:", { name, value: value.substring(0, 20) + "..." });
        return decodeURIComponent(value);
      }
    }
  }
  return null;
};

const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};

export const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 - 토큰 추가 및 요청 데이터 콘솔 출력
instance.interceptors.request.use(
  (config) => {
    // 토큰 추가
    const token = getAccessToken();
    console.log("🔑 토큰 확인:", {
      token: token ? `${token.substring(0, 20)}...` : "토큰 없음",
      localStorage: typeof window !== "undefined" ? localStorage.getItem("accessToken") : "N/A",
      cookies: typeof window !== "undefined" ? document.cookie : "N/A"
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ 토큰이 없습니다. 401 에러가 발생할 수 있습니다.");
    }
    
    // FormData가 아닌 경우에만 Content-Type 설정
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    
    console.log("🚀 API 요청:", {
      url: config.url,
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("❌ 요청 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 응답 데이터 콘솔 출력
instance.interceptors.response.use(
  (response) => {
    console.log("✅ API 응답:", {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ API 에러:", {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    
    // 연결 거부 에러 처리
    if (error.code === 'ECONNREFUSED' || error.message.includes('Failed to fetch')) {
      console.error("🔌 서버 연결 실패: 백엔드 서버가 실행되지 않았습니다.");
      // 사용자에게 알림 (선택사항)
      if (typeof window !== "undefined") {
        alert("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
      }
    }
    
    if (error.response && error.response.status === 401) {
      // 401 에러 발생 시 토큰 제거 및 로그인 페이지로 리다이렉트
      removeAccessToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// 토큰 관리 함수들 export
export { getAccessToken, setAccessToken, removeAccessToken };

export default instance;
