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
              <h2 className="text-2xl font-bold">Popular Games This Week</h2>
            </div>
          )}
          {section.type === 'trending' && (
            <div className="mb-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
              <h2 className="text-2xl font-bold">Trending Games This Week</h2>
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

      {/* Site Introduction */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to ScratchGames.info
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">
            Discover an exceptional collection of Scratch games carefully curated from the vast Scratch platform. Our website brings together the most engaging, creative, and popular Scratch games, making it easy for players to find and enjoy high-quality gaming experiences.
          </p>
          <p className="mb-4">
            From Minecraft-inspired adventures and Geometry Dash challenges to innovative Roblox remakes and addictive Clicker games, we showcase the incredible diversity of the Scratch gaming community. Our platform features trending games, popular releases, and the latest creations, all organized for seamless exploration.
          </p>
          <p className="mb-8">
            Whether you&apos;re a fan of survival horror with FNAF-inspired games, seeking rhythm-based challenges in Geometry Dash Wave, or looking for unique experiences like Sprunki adventures, our collection has something for everyone. Join thousands of players discovering new Scratch games daily.
          </p>
        </div>
      </div>

      {/* Game Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Game Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800/10">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Popular Categories</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Minecraft on Scratch</h4>
                <p className="text-gray-600">Experience creative block-building adventures reimagined in the Scratch platform. These games combine crafting mechanics, survival challenges, and unlimited creativity, offering a unique take on the classic Minecraft experience.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Geometry Dash Games</h4>
                <p className="text-gray-600">Challenge yourself with rhythm-based platformer games featuring custom music tracks, intricate level designs, and precise gameplay mechanics that test your timing and reflexes.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Roblox-Style Games</h4>
                <p className="text-gray-600">Explore diverse multiplayer-inspired experiences adapted for Scratch, featuring popular Roblox game mechanics and creative gameplay elements that encourage social interaction and creativity.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">FNAF Fan Games</h4>
                <p className="text-gray-600">Immerse yourself in Five Nights at Freddy&apos;s inspired survival horror experiences, complete with jumpscares, strategic gameplay, and atmospheric tension that keeps you on the edge of your seat.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Clicker Games</h4>
                <p className="text-gray-600">Dive into addictive incremental games with unique progression systems, upgrades, and achievements that make every click count towards your ultimate success.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800/10">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Specialty Categories</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sprunki Adventures</h4>
                <p className="text-gray-600">Embark on unique platform adventures featuring creative mechanics, challenging puzzles, and innovative gameplay elements that showcase the best of Scratch game design.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Geometry Dash Wave</h4>
                <p className="text-gray-600">Master the wave mechanics in these specialized rhythm games, featuring precise controls, custom music integration, and community-created levels that push the boundaries of traditional gameplay.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chicken Games</h4>
                <p className="text-gray-600">Experience charming arcade-style adventures featuring quirky chicken protagonists, combining classic gameplay mechanics with modern twists and humorous elements.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pen Football</h4>
                <p className="text-gray-600">Play innovative physics-based soccer games that utilize Scratch&apos;s pen feature, creating unique sports experiences with realistic ball mechanics and competitive gameplay.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Getting Over It</h4>
                <p className="text-gray-600">Take on challenging climbing adventures inspired by Bennett Foddy&apos;s creation, featuring precise controls, difficult obstacles, and rewarding progression systems.</p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mb-12 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions About Scratch Games</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800/10">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">What are Scratch games?</h3>
                <p className="text-gray-600">Scratch games are interactive projects created on the Scratch platform. These games range from simple arcade-style Scratch games to complex multiplayer experiences, showcasing the creative potential of block-based programming.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">How can I play Scratch games on this website?</h3>
                <p className="text-gray-600">Playing Scratch games on our platform is simple and free. Just click on any game card to start playing instantly. Our collection includes popular Scratch games across various categories, from Minecraft remakes to original creations.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Are these Scratch games safe to play?</h3>
                <p className="text-gray-600">All Scratch games featured on our website are carefully curated from the official Scratch platform. We regularly update our collection of Scratch games to ensure a safe and enjoyable gaming experience for all players.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Which Scratch games are most popular?</h3>
                <p className="text-gray-600">Popular Scratch games include Minecraft remakes, Geometry Dash adaptations, and FNAF fan games. Our trending section highlights the most-played Scratch games, updated weekly to showcase the community&apos;s favorites.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">How often are new Scratch games added?</h3>
                <p className="text-gray-600">We continuously update our Scratch games collection with new releases and trending titles. Check our &apos;Recently Added Games&apos; section daily to discover the latest Scratch games from talented creators.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Can I create my own Scratch games?</h3>
                <p className="text-gray-600">While our platform focuses on playing Scratch games, you can create your own games using the official Scratch platform. Many of the popular Scratch games featured here started as creative projects by community members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}