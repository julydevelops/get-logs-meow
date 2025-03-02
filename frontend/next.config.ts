import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.BACKEND_URL}/:path*`
      }
    ];
  },
};

export default nextConfig;
