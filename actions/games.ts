'use server';
import { CacheManager } from './cache-utils'

const cache = new CacheManager()

const SCRATCH_API = 'https://api.scratch.mit.edu/explore/projects';

// 可选的模式类型
type ScratchMode = 'popular' | 'trending' | 'recent';

// 默认参数
const DEFAULT_LIMIT = 40;
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
    .trim();
}

// 格式化数字的辅助函数
function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k';
  return (num / 1000000).toFixed(1) + 'm';
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

export async function getGames(mode: string = DEFAULT_MODE, page: number = 0) {
  const cacheKey = `${page}`
  try {
    // 尝试获取缓存
    const cachedData = await cache.get('games', cacheKey, mode)

    if (cachedData) {
      console.log('使用缓存数据 getGames') // 添加日志
      return cachedData
    }
    const url = buildApiUrl(mode as ScratchMode, page);
    console.log('获取数据 getGames，接口路径：', url);
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // 添加缓存
    })

    console.log('getGames 接口状态码:', response.status);
    console.log('getGames 接口状态说明:', response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      // 转换数据格式
      const formattedGames: Game[] = data.map((game: any) => ({
        id: game.id,
        title: cleanTitle(game.title),
        description: game.description,
        instructions: game.instructions,
        image: game.image,
        author: game.author.username,
        views: formatNumber(game.stats.views),
        loves: formatNumber(game.stats.loves),
        favorites: formatNumber(game.stats.favorites),
        url: `https://scratch.mit.edu/projects/${game.id}/embed`,
      }));
  
      const result = { success: true, data: formattedGames }
    
      // 存入缓存
      await cache.set('games', cacheKey, result, mode)
      return result
    }
  } catch (error) {
    console.error('getGames 失败 error', error);
    // 使用过期缓存
    const cachedData = await cache.get('games', cacheKey, mode)

    if (cachedData) {
      console.log('使用过期缓存') // 添加日志
      return cachedData
    }

    return { success: false, data: [], error: 'Failed to get game data' }
  }
}

// popular games
export async function getPopularGames(page: number = 0) {
  return getGames('popular', page);
}

// trending games
export async function getTrendingGames(page: number = 0) {
  return getGames('trending', page);
}

// recent games
export async function getRecentGames(page: number = 0) {
  return getGames('recent', page);
}

// 搜索游戏接口
export async function searchGames(query: string, page: number = 0) {
  const cacheKey = `${query}-${page}`
  try {
    const cachedData = await cache.get('search', '0', undefined, query)
    if (cachedData) return cachedData

    const response = await fetch(buildSearchApiUrl(query, page));

    console.log('searchGames 接口状态码：', response.status);
    console.log('searchGames 接口状态说明：', response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      
      // 转换数据格式
      const formattedGames: Game[] = data.map((game: any) => ({
        id: game.id,
        title: cleanTitle(game.title),
        image: game.image,
        author: game.author.username,
        views: formatNumber(game.stats.views),
        loves: formatNumber(game.stats.loves),
        favorites: formatNumber(game.stats.favorites)
      }));
  
      const result = { success: true, data: formattedGames }
    
      // 存入缓存
      await cache.set('search', '0', result, undefined, query)
      return result

    }

  } catch (error) {
    console.error('searchGames 失败 error：', error);
    const cachedData = await cache.get('search', '0', undefined, query)
    return cachedData || { success: false, error: 'search failed' }
  }
}


// 根据slug获取游戏详情
export async function getGameBySlug(slug: string) {
  const cachedData = await cache.get('game', slug)
  if (cachedData) return cachedData

  try {
    const url = `https://api.scratch.mit.edu/projects/${slug}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      }}
    );

    if (!response.ok) {
      throw new Error(`Failed to get game details: ${response.status}`);
    }

    const game = await response.json();
    const gameData = {
      id: game.id,
      title: cleanTitle(game.title),
      description: game.description,
      instructions: game.instructions,
      image: game.image,
      author: game.author.username,
      views: formatNumber(game.stats.views),
      loves: formatNumber(game.stats.loves),
      favorites: formatNumber(game.stats.favorites),
      url: `https://scratch.mit.edu/projects/${game.id}/embed`,
      tags: game.tags || []
    }

    await cache.set('game', slug, gameData)
    return gameData as Game
  } catch (error) {
    console.error('读取游戏详情 details 失败，error：', error);
    const cachedData = await cache.get('game', slug)
    return cachedData as Game
  }
}

// 获取相关游戏
export async function getRelatedGames(slug: string) {
  try {
    const cachedData = await cache.get('related', slug)
    if (cachedData) return cachedData

    // 先获取当前游戏信息
    const currentGame = await getGameBySlug(slug) as Game | null;
    if (!currentGame) return [];

    // 获取同作者的其他游戏
    const url = `https://api.scratch.mit.edu/users/${currentGame.author}/projects`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      }}
    );

    if (!response.ok) {
      throw new Error('Failed to get related games');
    }

    const games = await response.json();

    // 转换数据格式并过滤掉当前游戏
    const formattedGames: Game[] = games
      .filter((game: any) => game.id.toString() !== slug)
      .map((game: any) => ({
        id: game.id,
        title: cleanTitle(game.title),
        description: game.description,
        instructions: game.instructions,
        image: game.image,
        author: game.author.username,
        views: formatNumber(game.stats.views),
        loves: formatNumber(game.stats.loves),
        favorites: formatNumber(game.stats.favorites),
        url: `https://scratch.mit.edu/projects/${game.id}/embed`
      }))
      .slice(0, 5); // 只返回前5个相关游戏

      const relatedGames = formattedGames
      await cache.set('related', slug, relatedGames)
      return relatedGames
  } catch (error) {
    console.error('读取相关游戏失败，error：', error);
    const cachedData = await cache.get('related', slug)
    return cachedData || []
  }
}