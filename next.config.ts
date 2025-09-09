import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'http://r-cube.iptime.org:8081',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://r-cube.iptime.org:8081/api/:path*",
      },
    ];
  },
  images: {
    domains: ['storage.googleapis.com'], // 여기에 에러에 나온 도메인 추가
  },
};

export default nextConfig;
