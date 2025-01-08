import { getPopularGames, getTrendingGames, getRecentGames, type Game } from '@/actions/games';
import GameCard from "@/components/game-card";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.url}`,
    },
  };
}

export default async function Home() {
  const popularRemakes = [
    {
      href: "/games/minecraft",
      label: "Minecraft", 
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/10128407_480x360.png"
    },
    {
      href: "/games/sprunki", 
      label: "Sprunki",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/1062350295_480x360.png"
    },
    {
      href: "/games/geometry-dash", 
      label: "Geometry Dash",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/105500895_480x360.png"
    },
    {
      href: "/games/roblox-clicker", 
      label: "Roblox Clicker",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/944565612_480x360.png"
    },
    {
      href: "/games/fnaf", 
      label: "Fnaf",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/51296300_480x360.png"
    },
    {
      href: "/games/geometry-dash-wave", 
      label: "Geometry Dash Wave",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/898033846_480x360.png"
    },
    {
      href: "/games/chicken", 
      label: "Chicken",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/282380922_480x360.png"
    },
    {
      href: "/games/pen-football", 
      label: "Pen Football",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/103746364_480x360.png"
    },
    {
      href: "/games/getting-over-it", 
      label: "Getting Over It",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/389464290_480x360.png"
    },
    {
      href: "/games/cash-clicker",
      label: "Cash Clicker",
      bgUrl: "https://cdn2.scratch.mit.edu/get_image/project/482735260_480x360.png"
    },
  ];

  // 定义三个数据获取Promise
  const promises = [
    getPopularGames().then(result => ({ type: 'popular', data: result })),
    getTrendingGames().then(result => ({ type: 'trending', data: result })),
    getRecentGames().then(result => ({ type: 'recent', data: result }))
  ];

  // 使用Promise.all并添加错误处理
  const results = await Promise.allSettled(promises);
  
  // 处理返回的数据
  const sections = results
    .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
    .map(result => result.value)
    .filter(result => result.data.success)
    .map(result => ({
      type: result.type,
      games: result.data.data?.slice(0, 15)
    }));


  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Popular Remakes */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
        <h2 className="text-2xl font-bold">Popular Remakes</h2>
      </div>
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {popularRemakes.map((remake) => (
          <div 
            key={remake.href} 
            className="relative h-36 rounded-lg overflow-hidden group"
            style={{
              backgroundImage: `url(${remake.bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-all duration-300" />
            <a 
              href={remake.href} 
              className="absolute inset-0 flex items-end justify-center p-4 text-center"
            >
              <span className="text-lg font-semibold text-white drop-shadow-lg group-hover:scale-105 transition-transform">
                {remake.label}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Dynamic Game Sections */}
      {sections.map(section => (
        <div key={section.type} className="mb-8">
          {section.type === 'popular' && (
            <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <h2 className="text-2xl font-bold">Popular Games This Month</h2>
            </div>
          )}
          {section.type === 'trending' && (
            <div className="mb-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
              <h2 className="text-2xl font-bold">Trending Games This Month</h2>
            </div>
          )}
          {section.type === 'recent' && (
            <div className="mb-8 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-500 p-6 text-white">
              <h2 className="text-2xl font-bold">Recently Added Games</h2>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {section.games?.map((game: Game) => (
              <GameCard key={game.id} {...game} prepage="home" />
            ))}
          </div>
        </div>
      ))}

      {/* // Featured Games - 热带黄橙
      <h2 className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">

      // New Games - 清新青绿
      <h2 className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">

      // Top Games - 深沉蓝靛
      <h2 className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-600">

      // Classic Games - 高贵紫红
      <h2 className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600"></h2> */}
    </div>
  );
}