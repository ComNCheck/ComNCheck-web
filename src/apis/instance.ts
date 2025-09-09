import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// API URL 디버깅 정보
console.log("🔧 API 설정:", {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: baseURL,
  NODE_ENV: process.env.NODE_ENV
});

// 토큰 관리 함수들
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // localStorage에서 먼저 확인
    const localToken = localStorage.getItem("AccessToken");
    if (localToken) {
      return localToken;
    }
    
    // HttpOnly 쿠키는 JavaScript에서 접근할 수 없음
    // 서버에서 토큰을 Authorization 헤더로 직접 전달하거나
    // HttpOnly가 아닌 쿠키로 설정해야 함
    console.log("🍪 접근 가능한 쿠키:", document.cookie);
    console.log("⚠️ AccessToken은 HttpOnly 쿠키로 설정되어 있어 JavaScript에서 접근할 수 없습니다.");
  }
  return null;
};

const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("AccessToken", token);
  }
};

const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("AccessToken");
  }
};

export const instance = axios.create({
  baseURL,
  timeout: 10000, // 타임아웃을 10초로 증가
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  maxRedirects: 5, // 리다이렉트 최대 5회까지 자동 따라가기
  validateStatus: function (status) {
    // 302 리다이렉트도 정상 상태로 처리하여 자동 따라가기
    return status >= 200 && status < 400;
  },
});

// 요청 인터셉터 - 토큰 추가 및 요청 데이터 콘솔 출력
instance.interceptors.request.use(
  (config) => {
    // 토큰 추가
    const token = getAccessToken();
    console.log("🔑 토큰 확인:", {
      token: token ? `${token.substring(0, 20)}...` : "토큰 없음",
      localStorage: typeof window !== "undefined" ? localStorage.getItem("AccessToken") : "N/A",
      cookies: typeof window !== "undefined" ? document.cookie : "N/A"
    });
    
    if (token) {
      // 이미 Bearer가 포함되어 있는지 확인
      if (token.startsWith('Bearer ')) {
        config.headers.Authorization = token;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.warn("⚠️ 토큰이 없습니다. 401 에러가 발생할 수 있습니다.");
    }
    
    // FormData가 아닌 경우에만 Content-Type 설정
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    } else {
      // FormData인 경우 Content-Type을 제거하여 브라우저가 자동으로 설정하도록 함
      delete config.headers["Content-Type"];
      console.log("📤 FormData 요청 감지 - Content-Type을 자동 설정으로 변경");
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
    // 에러 정보를 안전하게 로깅
    const errorInfo = {
      url: error.config?.url || 'unknown',
      status: error.response?.status || 'no response',
      statusText: error.response?.statusText || 'no response',
      data: error.response?.data || null,
      message: error.message || 'unknown error',
      code: error.code || 'no code',
    };
    
    console.error("❌ API 에러:", errorInfo);
    
    // 네트워크 에러 처리 - 더 구체적인 감지
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
      console.error("🔌 네트워크 연결 실패:", {
        code: error.code,
        message: error.message,
        url: error.config?.url,
        isFormData: error.config?.data instanceof FormData,
        requestType: error.config?.data instanceof FormData ? 'multipart/form-data' : 'json'
      });
      
      // FormData 요청인 경우 특별한 처리
      if (error.config?.data instanceof FormData) {
        console.error("📤 FormData 요청 실패 - 파일 업로드 중 네트워크 오류 발생");
        const entries = Array.from(error.config.data.entries()) as [string, FormDataEntryValue][];
        console.log("FormData 내용:", {
          hasFiles: entries.some((entry) => entry[1] instanceof File),
          fieldCount: entries.length
        });
      }
      
      // 사용자에게 친화적인 메시지 표시
      if (typeof window !== "undefined") {
        console.warn("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      }
    }
    
    // 302 리다이렉트 처리
    if (error.response && error.response.status === 302) {
      console.error("🔄 302 리다이렉트 발생:", {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
        redirectLocation: error.response.headers?.location
      });
      
    }
    
    // 401 에러 처리
    if (error.response && error.response.status === 401) {
      console.warn("🔐 인증 실패: 토큰을 제거하고 로그인 페이지로 이동합니다.");
      removeAccessToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    
    // 500 에러 처리
    if (error.response && error.response.status >= 500) {
      console.error("🚨 서버 내부 오류:", error.response.status);
    }
    
    return Promise.reject(error);
  }
);

// 토큰 관리 함수들 export
export { getAccessToken, setAccessToken, removeAccessToken };

export default instance;
