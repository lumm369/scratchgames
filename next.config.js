/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保在生产环境禁用 HMR
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // 禁用热重载相关的插件
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'HotModuleReplacementPlugin'
      );
    }
    return config;
  },
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
