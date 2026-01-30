/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 允许从这些域名进行开发模式下的跨域请求（适用于通过反向代理访问）
  allowedDevOrigins: [
    'https://www.yamatu.org',
    'https://yamatu.org',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ],
}

module.exports = nextConfig
