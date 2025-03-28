import type { NextConfig } from "next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const basePath = "";
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
  allowedDevOrigins
};

export default nextConfig;
