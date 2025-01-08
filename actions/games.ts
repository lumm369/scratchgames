'use server';

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
  try {
    const url = buildApiUrl(mode as ScratchMode, page);
    console.log('Fetching data from:', url);
    const response = await fetch(
      buildApiUrl(mode as ScratchMode, page),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // 1小时缓存
      }
    );

    console.log('getGames Response status:', response.ok);

    if (!response.ok) {
      throw new Error('Failed to get game data');
    }

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

    return {
      success: true,
      data: formattedGames
    };
  } catch (error) {
    console.error('Failed to get game data:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to get game data'
    };
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
export async function searchGames(query: string, page: number = 0): Promise<{ success: boolean; data?: Game[]; error?: string }> {
  try {
    const response = await fetch(buildSearchApiUrl(query, page));
    console.log('searchGames Response status:', response.ok);
    
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    
    return {
      success: true,
      data: data.map((game: any) => ({
        id: game.id,
        title: cleanTitle(game.title),
        image: game.image,
        author: game.author.username,
        views: formatNumber(game.stats.views),
        loves: formatNumber(game.stats.loves),
        favorites: formatNumber(game.stats.favorites)
      }))
    };
  } catch (error) {
    console.error('Error searching games:', error);
    return {
      success: false,
      error: 'search failed'
    };
  }
}


// 根据slug获取游戏详情
export async function getGameBySlug(slug: string) {
  try {
    const response = await fetch(
      `https://api.scratch.mit.edu/projects/${slug}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get game details');
    }

    const game = await response.json();

    return {
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
    };
  } catch (error) {
    console.error('Failed to get game details:', error);
    return null;
  }
}

// 获取相关游戏
export async function getRelatedGames(slug: string) {
  try {
    // 先获取当前游戏信息
    const currentGame = await getGameBySlug(slug);
    if (!currentGame) return [];

    // 获取同作者的其他游戏
    const response = await fetch(
      `https://api.scratch.mit.edu/users/${currentGame.author}/projects`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get related games');
    }

    const games = await response.json();

    // 转换数据格式并过滤掉当前游戏
    return games
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
  } catch (error) {
    console.error('Failed to get related games:', error);
    return [];
  }
}