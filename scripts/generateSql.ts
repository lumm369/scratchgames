import { promises as fs } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')

interface Game {
  id: number
  title: string
  description: string
  instructions: string
  image: string
  author: { username: string }
  stats: {
    views: number
    loves: number
    favorites: number
  }
}

function generateCacheKey(type: string, fileName: string, pathParts: string[]): string {
  switch (type) {
    case 'games':
      const mode = pathParts[1] // popular/recent/trending
      return `games:${mode}:0`
    case 'search':
      const keyword = pathParts[1]
      return `search:${keyword}:0`
    case 'game':
      const id = fileName.replace('.json', '')
      return `game:${id}`
    case 'related':
      const gameId = fileName.replace('.json', '')
      return `related:${gameId}`
    default:
      return ''
  }
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
function escapeSqlString(str: string): string {
  return str
    .replace(/'/g, "''")  // 转义单引号
    .replace(/\n/g, ' ')  // 替换换行符为空格
    .replace(/\r/g, '')   // 移除回车符
}

let globalSqlContent = 'BEGIN;\n\n'

async function generateSqlInserts(inputPath: string) {
  try {
    
    const entries = await fs.readdir(inputPath, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(inputPath, entry.name)
      
      if (entry.isDirectory()) {
        await generateSqlInserts(fullPath)
      } else if (entry.name === 'games.json') {
        console.log('Processing:', fullPath)
        const relativePath = fullPath.replace(`${ROOT_DIR}/data/`, '')
        const pathParts = relativePath.split('/')
        
        const rawData = await fs.readFile(fullPath, 'utf-8')
        const games = JSON.parse(rawData)
        
        const cacheData = {
          data: {
            success: true,
            data: games.map((game: any) => ({
              id: game.id,
              title: cleanTitle(game.title),
              description: cleanDescription(game.description) || '',
              instructions: cleanDescription(game.instructions) || '',
              image: `https://cdn2.scratch.mit.edu/get_image/project/${game.id}_480x360.png`,
              author: game.author.username,
              views: formatNumber(game.stats.views),
              loves: formatNumber(game.stats.loves),
              favorites: formatNumber(game.stats.favorites),
              url: `https://scratch.mit.edu/projects/${game.id}/embed`
            }))
          },
          timestamp: Date.now(),
          expiresIn: 24 * 60 * 60 * 1000
        }
        
        const type = pathParts[0] // games/search/game/related
        const cacheKey = generateCacheKey(type, entry.name, pathParts)
        const jsonString = escapeSqlString(JSON.stringify(cacheData))

        globalSqlContent += `INSERT INTO cache (cache_key, cache_data, timestamp, expires_in)\n`
        globalSqlContent += `VALUES ('${cacheKey}', '${jsonString}', ${cacheData.timestamp}, ${cacheData.expiresIn});\n\n`
      }
    }
  } catch (error) {
    console.error('生成SQL失败:', error)
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// 主函数
async function main() {
  await generateSqlInserts(join(ROOT_DIR, 'data'))
  globalSqlContent += 'COMMIT;\n'
  
  const outputPath = join(ROOT_DIR, 'db', 'seed.sql')
  await fs.writeFile(outputPath, globalSqlContent)
  console.log(`SQL文件生成完成: ${outputPath}`)
}

main().catch(console.error)