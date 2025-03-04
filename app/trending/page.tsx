import { getTrendingGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameList from '@/components/game-list';
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.url}/trending`,
    },
  };
}

export default async function Trending() {
  const result = await getTrendingGames();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {result.error}
        </div>
      </div>
    );
  }
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Trending", href: "/trending" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Trending Games</h2>
        <p>Discover the latest Trending games in scratch!</p>
      </div>
      <GameList games={games} prepage='trending' />

      {/* Page Introduction */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Trending Scratch Games
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">
            Discover what&apos;s hot in the world of Scratch games with our trending collection. These are the games making waves in the community right now, from viral hits to rising stars. Our trending section captures the pulse of the Scratch platform, showcasing games that are gaining popularity through player engagement and social sharing.
          </p>
          <p className="mb-4">
            Experience the latest trends in Scratch gaming, including innovative Minecraft adaptations, fresh takes on Geometry Dash, and exciting new FNAF fan creations. These trending Scratch games represent the dynamic nature of our community, where creative new concepts meet established favorites.
          </p>
          <p className="mb-4">
            Updated daily, our trending games selection reflects real-time player activity and engagement. Whether you&apos;re looking for the next big Scratch game or want to stay current with the latest gaming trends, this curated collection brings you the most exciting and innovative titles that are capturing players&apos; attention right now.
          </p>
        </div>
      </div>
    </div>
  );
}