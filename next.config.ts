import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leoparts.com.ua',
      },
      {
        protocol: 'https',
        hostname: 'img2.ad.ua',
      },
    ],
  },
};
const whithNextIntl = createNextIntlPlugin();

export default whithNextIntl(nextConfig);
