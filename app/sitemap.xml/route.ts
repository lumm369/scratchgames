import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/actions/blog'
import { getGames } from '@/actions/games'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有博客文章
  const { items: posts } = await getBlogPosts()
  const blogUrls = posts.map((post) => ({
    url: `https://scratchgames.info/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 获取 popular 游戏
  const { data: popularGames } = await getGames('popular')
  const popularGameUrls = popularGames.map((game) => ({
    url: `https://scratchgames.info/game/${game.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7, 
  }))

  // 获取 trending 游戏
  const { data: trendingGames } = await getGames('trending')
  const trendingGameUrls = trendingGames.map((game) => ({
    url: `https://scratchgames.info/game/${game.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7, 
  }))

  // 静态路由
  const staticUrls = [
    {
      url: 'https://scratchgames.info',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://scratchgames.info/popular',
      lastModified: new Date(), 
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/trending',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/recent',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/games/cash-clicker',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/chicken',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/fnaf',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/geometry-dash',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/geometry-dash-wave',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/getting-over-it',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/minecraft',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/pen-football',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/roblox-clicker',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/sprunki',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/cookies',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/help',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/safety',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

  ]

  return [...staticUrls, ...blogUrls, ...popularGameUrls, ...trendingGameUrls]
}