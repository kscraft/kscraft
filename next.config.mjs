import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:slug.php",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/:slug.html",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
