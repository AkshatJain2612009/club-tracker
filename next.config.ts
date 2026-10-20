import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Default CSS handling works with Tailwind; custom loader removed to fix build.
  turbopack: {},
};

export default nextConfig;
