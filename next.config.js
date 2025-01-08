/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['cdn2.scratch.mit.edu'],
  },
  trailingSlash: false, // 设置是否在 URL 末尾添加斜杠
};

module.exports = nextConfig;
