/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL, // 替换为你的域名
  generateRobotsTxt: true, // 生成robots.txt
  sitemapSize: 7000, // 当页面超过7000时分割sitemap
  // exclude: ['/server-sitemap.xml'], // 排除动态生成的sitemap
  robotsTxtOptions: {
    policies: [
      { 
        userAgent: '*', 
        allow: '/', // 允许爬取所有路径
      }
    ],
    additionalSitemaps: [
      process.env.NEXT_PUBLIC_BASE_URL + '/sitemap.xml', // 动态生成的sitemap
    ],
  },
};