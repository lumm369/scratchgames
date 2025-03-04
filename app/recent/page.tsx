import { getRecentGames } from '@/actions/games';
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
      canonical: `${siteConfig.url}/recent`,
    },
  };
}

export default async function Recent() {
  const result = await getRecentGames();

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
          { label: "Recent", href: "/recent" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Recent Games</h2>
        <p>Discover the latest Recent games in scratch!</p>
      </div>
      <GameList games={games} prepage='recent' />

      {/* 页面介绍 */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
          Latest Scratch Games
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">
            Stay up-to-date with the newest additions to our Scratch games collection. Our recent games section showcases the latest creations from talented Scratch developers, bringing you fresh gaming experiences daily. From innovative platformers to creative remakes, these new Scratch games represent the cutting edge of community development.
          </p>
          <p className="mb-4">
            Discover brand new Minecraft adventures, the latest Geometry Dash levels, and fresh interpretations of popular gaming concepts. Each day brings exciting new Scratch games to explore, with emerging creators pushing the boundaries of what&apos;s possible on the platform.
          </p>
          <p className="mb-4">
            Our recent games collection is continuously updated with the newest releases, ensuring you&apos;re always among the first to experience the latest Scratch games. Whether you&apos;re seeking innovative gameplay mechanics or fresh takes on classic genres, our newest additions offer something exciting for every player.
          </p>
        </div>
      </div>
    </div>
  );
}