import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["test-front"],
  output: "standalone",
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
