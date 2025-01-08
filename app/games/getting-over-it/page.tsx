import { searchGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameList from "@/components/game-list";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'scratch games getting over it - ScratchGames.info',
    description: 'Play the best free online getting over it scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/getting-over-it`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('getting-over-it');

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
          { label: "Getting Over It", href: "/games/getting-over-it" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Getting Over It Games</h2>
      </div>
      <GameList games={games} prepage='games/getting-over-it' />
    </div>
  );
}