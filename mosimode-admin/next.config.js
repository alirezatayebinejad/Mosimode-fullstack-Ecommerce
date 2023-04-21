/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI: "mongodb://localhost:27017/next13-auth",
    NEXTAUTH_SECRET: "9Gt8#sJn7qL3@vDp5&fE",
  }
}

module.exports = nextConfig;
