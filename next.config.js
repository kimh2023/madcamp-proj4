/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FRONTEND_URL: "http://localhost:3001",
    BACKEND_URL: "http://localhost:3000",
  },
  transpilePackages: ["@ant-design"],
};

module.exports = nextConfig;
