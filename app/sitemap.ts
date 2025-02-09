import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/actions/blog'
import { getGames } from '@/actions/games'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://scratchgames.info'
  const now = new Date().toISOString()

  // 获取所有博客文章
  const { items: posts } = await getBlogPosts()
  const blogUrls = posts.map((post) => ({
    url: `https://scratchgames.info/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 获取 popular 游戏
  const { data: popularGames } = await getGames('popular')
  const popularGameUrls = popularGames.map((game) => ({
    url: `https://scratchgames.info/game/${game.id}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7, 
  }))

  // 获取 trending 游戏
  const { data: trendingGames } = await getGames('trending')
  const trendingGameUrls = trendingGames.map((game) => ({
    url: `https://scratchgames.info/game/${game.id}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7, 
  }))

  // 静态路由
  const staticUrls = [
    {
      url: 'https://scratchgames.info',
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://scratchgames.info/popular',
      lastModified: now, 
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/trending',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/recent',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://scratchgames.info/games/cash-clicker',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/chicken',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/fnaf',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/geometry-dash',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/geometry-dash-wave',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/getting-over-it',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/minecraft',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/pen-football',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/roblox-clicker',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/games/sprunki',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/blog',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/about',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/contact',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/cookies',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/help',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/privacy',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/safety',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://scratchgames.info/terms',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

  ]

  return [...staticUrls, ...blogUrls, ...popularGameUrls, ...trendingGameUrls]
}