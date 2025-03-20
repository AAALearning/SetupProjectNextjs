import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  basePath: "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unplash.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  bundlePagesRouterDependencies: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "custom-user",
            value: "ryan",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/test/test3",
        destination: "/test/test2",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/test/test4",
        destination: "/test/test2",
      },
    ];
  },
  // output: "standalone",
  experimental: {
    // ppr: "incremental",
    viewTransition: true,
    reactCompiler: true,
  },
  // assetPrefix: "https://cdn.mydomain.com", // Nếu host static lên CDN
};

export default nextConfig;
