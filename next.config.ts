import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/customers",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
