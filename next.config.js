/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FRONTEND_URL: "http://localhost:3001",
    BACKEND_URL: "http://localhost:3000",
    // BACKEND_URL: "http://172.10.7.24",
    // NODE_TLS_REJECT_UNAUTHORIZED: "0",
  },
  transpilePackages: ["@ant-design"],
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};

module.exports = nextConfig;
