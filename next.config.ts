import type { NextConfig } from "next";

const repoName = "wivenhoe-music-trail";

const nextConfig: NextConfig = {
  output: "export",

  basePath: `/${repoName}`,

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;