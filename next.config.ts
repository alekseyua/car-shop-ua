import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.114"],

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leoparts.com.ua",
      },
      {
        protocol: "https",
        hostname: "img2.ad.ua",
      },
      {
        protocol: "https",
        hostname: "api.novaposhta.ua",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};
const whithNextIntl = createNextIntlPlugin();

export default whithNextIntl(nextConfig);
