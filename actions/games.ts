'use server';
import { CacheManager } from './cache-utils'

const cache = new CacheManager()
const MAX_RETRIES = 2
const RETRY_DELAY = 2000

const SCRATCH_API = 'https://api.scratch.mit.edu/explore/projects';

// 可选的模式类型
type ScratchMode = 'popular' | 'trending' | 'recent';

// 默认参数
const DEFAULT_LIMIT = 16;
const DEFAULT_OFFSET = 0;
const DEFAULT_MODE: ScratchMode = 'popular';

// 构建API URL的辅助函数
function buildApiUrl(mode: ScratchMode, page: number): string {
  const offset = page * DEFAULT_LIMIT;
  return `${SCRATCH_API}?limit=${DEFAULT_LIMIT}&offset=${offset}&language=en&mode=${mode}&q=games`;
}

// 构建搜索API URL的辅助函数
function buildSearchApiUrl(query: string, page: number = 0): string {
  const offset = page * DEFAULT_LIMIT;
  return `https://api.scratch.mit.edu/search/projects?limit=${DEFAULT_LIMIT}&offset=${offset}&language=en&mode=${DEFAULT_MODE}&q=${encodeURIComponent(query)}`;
}

// 清理标题的辅助函数
function cleanTitle(title: string): string {
  return title
    .split(' ')
    .filter(word => !word.startsWith('#'))
    .join(' ')
    .replace(/[|/]+$/, '') // 移除末尾的|和/
    .replace(/\s+/g, ' ') // 替换多个空格为单个空格
    .replace('#games', ' ') // 替换多个空格为单个空格
    .trim();
}

// 清理描述的辅助函数
function cleanDescription(str: string): string {
  return str
    .split(' ')
    .filter(word => !word.startsWith('#'))
    .join(' ')
    .replace(/[|/]+$/, '') // 移除末尾的|和/
    .replace(/\s+/g, ' ') // 替换多个空格为单个空格
    .replace('#games', ' ')
    .trim();
}

// 格式化数字的辅助函数
function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k';
  return (num / 1000000).toFixed(1) + 'm';
}

interface ApiResponse<T> {
  success: boolean
  data: T[]
  error?: string
}

export type Game = {
  id: number;
  title: string;
  description: string;
  instructions: string;
  image: string;
  author: string;
  views: string;
  loves: string;
  favorites: string;
  url: string;
};

// 重试函数
async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, retries - 1)
    }
    throw error
  }
}

export async function getGames(mode: string = DEFAULT_MODE, page: number = 0): Promise<ApiResponse<Game>> {
  try {
    // 尝试获取缓存
    const cachedData = await cache.get('games', `${page}`, mode)
    if (cachedData) {
      console.log('使用缓存数据 getGames') // 添加日志
      return cachedData as ApiResponse<Game>
    }
    const url = buildApiUrl(mode as ScratchMode, page);
    console.log('获取数据 getGames，接口路径：', url);
    const games = await fetchWithRetry(url)
    
    const formattedGames = games.map((game: any) => ({
      id: game.id,
      title: cleanTitle(game.title),
      description: cleanDescription(game.description),
      instructions: cleanDescription(game.instructions),
      image: game.image,
      author: game.author.username,
      views: formatNumber(game.stats.views),
      loves: formatNumber(game.stats.loves),
      favorites: formatNumber(game.stats.favorites),
      url: `https://scratch.mit.edu/projects/${game.id}/embed`
    }))

    const result = { success: true, data: formattedGames }
    await cache.set('games', `${page}`, result, mode)
    return result
  } catch (error) {
    console.error('getGames 失败 error', error);
    return { success: false, data: [], error: 'Failed to get games' }
  }
}

// popular games
export async function getPopularGames(page: number = 0): Promise<ApiResponse<Game>> {
  return getGames('popular', page);
}

// trending games
export async function getTrendingGames(page: number = 0): Promise<ApiResponse<Game>> {
  return getGames('trending', page);
}

// recent games
export async function getRecentGames(page: number = 0): Promise<ApiResponse<Game>> {
  return getGames('recent', page);
}

// 搜索游戏接口
export async function searchGames(query: string, page: number = 0): Promise<ApiResponse<Game>> {
  try {
    // 尝试获取缓存
    const cachedData = await cache.get('search', `${page}`, undefined, query)
    if (cachedData) {
      console.log('使用缓存数据 searchGames') // 添加日志
      return cachedData as ApiResponse<Game>
    }

    const url = buildSearchApiUrl(query, page)
    console.log('获取数据 searchGames，接口路径：', url);
    const games = await fetchWithRetry(url)
    
    const formattedGames = games.map((game: any) => ({
      id: game.id,
      title: cleanTitle(game.title),
      description: cleanDescription(game.description),
      instructions: cleanDescription(game.instructions),
      image: game.image,
      author: game.author.username,
      views: formatNumber(game.stats.views),
      loves: formatNumber(game.stats.loves),
      favorites: formatNumber(game.stats.favorites),
      url: `https://scratch.mit.edu/projects/${game.id}/embed`
    }))

    const result = { success: true, data: formattedGames }
    await cache.set('search', `${page}`, result, undefined, query)
    return result

  } catch (error) {
    console.error('Failed to search games:', error)
    return { success: false, data: [], error: 'Failed to search games' }
  }
}


// 根据slug获取游戏详情
export async function getGameBySlug(slug: string) {
  try {
    // 尝试获取缓存
    const cachedData = await cache.get('game', slug)
    if (cachedData) {
      console.log('使用缓存数据 getGameBySlug') // 添加日志
      return cachedData as Game
    }
    
    const url = `https://api.scratch.mit.edu/projects/${slug}`
    console.log('获取数据 getGameBySlug，接口路径：', url);
    const game = await fetchWithRetry(url)
    
    const formattedGame = {
      id: game.id,
      title: cleanTitle(game.title),
      description: cleanDescription(game.description),
      instructions: cleanDescription(game.instructions),
      image: game.image,
      author: game.author.username,
      views: formatNumber(game.stats.views),
      loves: formatNumber(game.stats.loves),
      favorites: formatNumber(game.stats.favorites),
      url: `https://scratch.mit.edu/projects/${game.id}/embed`
    }

    await cache.set('game', slug, formattedGame)
    return formattedGame

  } catch (error) {
    console.error('Failed to get game:', error)
    return null
  }
}

// 获取相关游戏
export async function getRelatedGames(slug: string, title: string): Promise<ApiResponse<Game>> {
  try {
    // 尝试获取缓存
    const cachedData = await cache.get('related', slug)
    if (cachedData) {
      console.log('使用缓存数据 getRelatedGames') // 添加日志
      return cachedData as ApiResponse<Game>
    }

    // 基于游戏标题搜索相关游戏
    const searchTerm = title.split(' ')[0] // 使用第一个关键词
    const url = buildSearchApiUrl(searchTerm)
    // const games = await fetchWithRetry(url)
    const response = await fetch(url)
    if (!response.ok) {
      return { success: true, data: [], error: 'Failed to get related games' }
    }
    const games = await response.json()
    
    // 过滤掉当前游戏
    const filteredGames = games
      .filter((g: any) => g.id.toString() !== slug)
      .slice(0, 6) // 限制相关游戏数量

    const formattedGames = filteredGames.map((game: any) => ({
      id: game.id,
      title: cleanTitle(game.title),
      description: cleanDescription(game.description),
      instructions: cleanDescription(game.instructions),
      image: game.image,
      author: game.author.username,
      views: formatNumber(game.stats.views),
      loves: formatNumber(game.stats.loves),
      favorites: formatNumber(game.stats.favorites),
      url: `https://scratch.mit.edu/projects/${game.id}/embed`
    }))

    const result = { success: true, data: formattedGames }
    await cache.set('related', slug, result)
    return result

  } catch (error) {
    console.error('Failed to get related games:', error)
    return { success: false, data: [], error: 'Failed to get related games' }
  }
}