import { searchGames } from '@/actions/games';
import Breadcrumb from '@/components/bread-crumb';
import GameList from "@/components/game-list";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import ErrorBoundary from '@/components/ErrorBoundary';
import { ErrorUI } from '@/components/ErrorUI';
import { LoadingUI } from '@/components/LoadingUI';
import { NoGamesUI } from '@/components/NoGamesUI';
import { Suspense } from 'react';


// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'scratch games roblox clicker - ScratchGames.info',
    description: 'Play the best free roblox clicker scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/roblox-clicker`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('roblox-clicker');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Roblox Clicker", href: "/games/roblox-clicker" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Roblox Clicker Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/roblox-clicker' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Roblox Clicker on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg">
              <strong>Roblox Clicker</strong> represents an engaging subset of games that have gained significant popularity on the 
              <span className="text-primary"> Scratch programming platform</span>. As a creative reimagining of traditional clicker games, 
              it combines addictive mechanics with the beloved Roblox aesthetics.
            </p>
          </section>

          {/* Core Mechanics */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Core Mechanics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Basic Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Resource accumulation</li>
                  <li>Clicking mechanics</li>
                  <li>Upgrade systems</li>
                  <li>Achievement tracking</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Advanced Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Rebirth mechanics</li>
                  <li>Automated systems</li>
                  <li>Upgrade trees</li>
                  <li>Custom themes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Community Impact */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg mb-4">
              The Scratch community has embraced Roblox Clicker enthusiastically, creating multiple remakes 
              and variations. Each version introduces innovative features while maintaining the core elements 
              that make these games engaging.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Community Contributions</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Multiple game variations</li>
                <li>Shared resources</li>
                <li>Continuous improvements</li>
                <li>Creative innovations</li>
              </ul>
            </div>
          </section>

          {/* Educational Value */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Educational Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Game Design</h3>
                <p>Resource management and progression systems</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">UI/UX</h3>
                <p>Interface design principles</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Programming</h3>
                <p>Core development concepts</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}