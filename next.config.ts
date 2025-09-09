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
};

export default nextConfig;
