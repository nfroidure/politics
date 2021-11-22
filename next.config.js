const ORGANISATION_NAME = "AFE";
const DOMAIN_NAME = "douaisis2021.fr";
const buildPrefix = process.env.NODE_ENV === "production" ? "" : "";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://douaisis2021.fr"
    : "http://union.localhost:3000";

module.exports = {
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    buildPrefix,
    baseURL,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  // images: {
  //   domains: ["images.ctfassets.net"],
  // },
};
