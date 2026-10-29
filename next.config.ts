import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lirp.cdn-website.com", pathname: "/**" },
    { protocol: "https", hostname: "irp.cdn-website.com", pathname: "/**" }
    ],
  },
};

export default nextConfig;
