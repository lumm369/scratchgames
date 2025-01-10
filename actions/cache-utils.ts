import fs from 'fs/promises'
import path from 'path'

interface CacheData<T> {
  data: T
  timestamp: number
  expiresIn: number
}

export class CacheManager {
  private readonly baseDir: string
  private readonly cacheDir: string
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24小时

  constructor() {
    this.baseDir = process.cwd()
    this.cacheDir = path.join(this.baseDir, '.cache')
    this.initializeCacheDirectories()
  }

  private async initializeCacheDirectories() {
    const directories = [
      'games/trending',
      'games/recent',
      'games/popular',
      'games/search',
      'game',
      'related'
    ].map(dir => path.join(this.cacheDir, dir))

    for (const dir of directories) {
      await fs.mkdir(dir, { recursive: true })
    }
  }

  private getCachePath(type: 'games' | 'game' | 'related' | 'search', key: string, mode?: string, gameName?: string): string {
    switch (type) {
      case 'games':
        return path.join(this.cacheDir, 'games', mode || 'trending', `${key}.json`)
      case 'game':
        return path.join(this.cacheDir, 'game', `${key}.json`)
      case 'related':
        return path.join(this.cacheDir, 'related', `${key}.json`)
      case 'search':
        if (!gameName) throw new Error('Game name is required for search cache')
        return path.join(this.cacheDir, 'games', 'search', gameName, '0.json')
      default:
        return path.join(this.cacheDir, `${key}.json`)
    }
  }

  async set<T>(type: 'games' | 'game' | 'related' | 'search', key: string, data: T, mode?: string, gameName?: string): Promise<void> {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: this.CACHE_DURATION
    }
    
    const cachePath = this.getCachePath(type, key, mode, gameName)
    await fs.writeFile(cachePath, JSON.stringify(cacheData))
  }

  async get<T>(type: 'games' | 'game' | 'related' | 'search', key: string, mode?: string, gameName?: string): Promise<T | null> {
    try {
      const cachePath = this.getCachePath(type, key, mode, gameName)
      console.log('读取缓存，缓存路径：', cachePath)

      const content = await fs.readFile(cachePath, 'utf-8')
      const cache: CacheData<T> = JSON.parse(content)
      
      // 不检查过期时间，只要有缓存就返回
      return cache.data
    } catch (error) {
      console.error('缓存读取错误 error：', error)
      return null
    }
  }
}