import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withPWA({
  ...nextConfig, 
});


export default nextConfig;
