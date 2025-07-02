import type { NextConfig } from "next";
// import { URL } from "url";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   metadataBase: new URL("https://yourdomain.com"),
  // },
};

export default withBundleAnalyzer(nextConfig);
