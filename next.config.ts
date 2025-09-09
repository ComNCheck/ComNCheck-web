import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com'], // 여기에 에러에 나온 도메인 추가
  },
};

export default nextConfig;
