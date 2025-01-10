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

async function formatGamesData(inputPath: string, outputPath: string) {
  try {
    await fs.mkdir(dirname(outputPath), { recursive: true })
    
    const rawData = await fs.readFile(inputPath, 'utf-8')
    const games = JSON.parse(rawData) as Game[]
    
    const formattedData = {
      data: {
        success: true,
        data: games.map(game => ({
          id: game.id,
          title: game.title,
          description: game.description || '',
          instructions: game.instructions || '',
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
    
    await fs.writeFile(outputPath, JSON.stringify(formattedData, null, 2))
    console.log(`格式化数据，路径： ${inputPath} -> ${outputPath}`)
  } catch (error) {
    console.error(`格式化错误 error，路径inputPath：  ${inputPath}:`, error)
  }
}

async function processDirectory(dir: string) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath)
      } else if (entry.name === 'games.json') {
        const relativePath = fullPath.replace(`${ROOT_DIR}/data`, '')
        const outputDir = join(ROOT_DIR, '.cache', dirname(relativePath))
        const outputPath = join(outputDir, '0.json')
        await formatGamesData(fullPath, outputPath)
      }
    }
  } catch (error) {
    console.error(`读取目录错误 directory ${dir}，error：`, error)
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

// 开始执行转换
const dataDir = join(ROOT_DIR, 'data')
processDirectory(dataDir)
  .then(() => console.log('缓存数据格式化完成！'))
  .catch(error => console.error('缓存数据格式化失败 error：', error))