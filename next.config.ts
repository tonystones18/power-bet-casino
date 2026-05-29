import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.softswiss.net" },
      { protocol: "https", hostname: "static.cdnpw.com" },
    ],
  },
};

export default nextConfig;
