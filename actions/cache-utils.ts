import { createClient } from '@supabase/supabase-js'

interface CacheData<T> {
  data: T
  timestamp: number
  expiresIn: number
}

export class CacheManager {
  private readonly supabase
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  private getCacheKey(type: string, key: string, mode?: string, gameName?: string): string {
    // return `${type}:${mode || ''}:${key}:${gameName || ''}`
    switch (type) {
      case 'games':
        return `games:${mode}:${key}`
      case 'search':
        return `search:${gameName}:${key}`
      case 'game':
        return `game:${key}`
      case 'related':
        return `related:${key}`
      default:
        return `${type}:${key}`
    }
  }

  async set<T>(type: 'games' | 'game' | 'related' | 'search', key: string, data: T, mode?: string, gameName?: string): Promise<void> {
    const cacheKey = this.getCacheKey(type, key, mode, gameName)
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: this.CACHE_DURATION
    }

    const { error } = await this.supabase
      .from('cache')
      .upsert(
        {
          cache_key: cacheKey,
          cache_data: cacheData,
          timestamp: cacheData.timestamp,
          expires_in: cacheData.expiresIn
        },
        {
          onConflict: 'cache_key',
          ignoreDuplicates: false
        }
      )

    if (error) {
      console.error('Cache set error:', error)
    }
  }

  async get<T>(type: 'games' | 'game' | 'related' | 'search', key: string, mode?: string, gameName?: string): Promise<T | null> {
    try {
      const cacheKey = this.getCacheKey(type, key, mode, gameName)
      
      const { data, error } = await this.supabase
        .from('cache')
        .select('cache_data')
        .eq('cache_key', cacheKey)
        .single()

      if (error || !data) {
        return null
      }

      const cacheData: CacheData<T> = data.cache_data

      if (Date.now() - cacheData.timestamp > cacheData.expiresIn) {
        await this.supabase
          .from('cache')
          .delete()
          .eq('cache_key', cacheKey)
        return null
      }

      return cacheData.data
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async clear(type: string, mode?: string): Promise<void> {
    const cacheKey = this.getCacheKey(type, '*', mode)
    const { error } = await this.supabase
      .from('cache')
      .delete()
      .like('cache_key', `${cacheKey}%`)

    if (error) {
      console.error('Cache clear error:', error)
    }
  }
}