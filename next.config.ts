import { LOCALE, TIME_ZONE } from "@/utils/constants";
import { type NextConfig } from "next";
import { env } from "node:process";

const baseURL = env.NEXT_PUBLIC_BASE_URL;
const basePath = env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = `${baseURL}${basePath}`;
const allowedDevOrigins = baseURL
  ? [baseURL.replace(/^https?:\/\/(.*)(:[0-9]+)$/, "$1")]
  : [];
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
  reactStrictMode: true,
  assetPrefix,
  basePath,
  allowedDevOrigins,
  env: {
    // Avoid dynamic years
    BUILD_YEAR: new Intl.DateTimeFormat(LOCALE, {
      timeZone: TIME_ZONE,
      year: "numeric",
    }).format(),
  }
};

export default nextConfig;
