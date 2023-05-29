/** @type {import('next').NextConfig} */

// Website base URL/path
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nicolasfroidure.fr"
    : "http://nfroidure.localhost:3000";
const basePath = '';
// Internal NextJS assets
const assetPrefix = `${baseURL}${basePath}`;
// Static contents (public folder)
const staticPrefix = `${baseURL}${basePath}`;

const config = {
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
  reactStrictMode: true,
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    baseURL,
    basePath,
    staticPrefix,
  },
  assetPrefix,
  basePath,
};

export default config;
