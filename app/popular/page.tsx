import { getPopularGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameList from "@/components/game-list";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.url}/popular`,
    },
  };
}

export default async function Popular() {
  const result = await getPopularGames();

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
          { label: "Popular", href: "/popular" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Popular Games</h2>
        <p>Discover the latest popular games in scratch!</p>
      </div>
      <GameList games={games} prepage='popular' />

      {/* Page Introduction */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Popular Scratch Games
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">
            Explore our handpicked collection of the most popular Scratch games, featuring top-rated creations that have captivated players worldwide. From innovative Minecraft remakes and challenging Geometry Dash levels to engaging Roblox-inspired experiences, these Scratch games showcase the best of community creativity.
          </p>
          <p className="mb-4">
            Our popular games section highlights titles that consistently receive high engagement, including beloved FNAF fan games, addictive Clicker adventures, and unique Sprunki experiences. Each game is carefully selected based on player feedback, gameplay quality, and creative innovation within the Scratch platform.
          </p>
          <p className="mb-4">
            Updated weekly, this collection represents the most engaging Scratch games that have earned their place through outstanding gameplay mechanics, creative design, and community appreciation. Whether you&apos;re seeking arcade-style challenges, platformer adventures, or innovative game concepts, you&apos;ll find the highest-rated Scratch games right here.
          </p>
        </div>
      </div>
    </div>
  );
}