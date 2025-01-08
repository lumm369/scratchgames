import { searchGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameList from "@/components/game-list";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: 'Play the best free online pen football games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/pen-football`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('pen-football');

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
          { label: "Pen Football", href: "/games/pen-football" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Pen Football Games</h2>
      </div>
      <GameList games={games} prepage='games/pen-football' />
    </div>
  );
}