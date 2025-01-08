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
    title: 'scratch games pen football - ScratchGames.info',
    description: 'Play the best free online pen football scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/pen-football`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('pen-football');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Pen Football", href: "/games/pen-football" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Pen Football Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/pen-football' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Pen Football on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg">
              <strong>Pen Football</strong> has emerged as one of the most engaging games on the 
              <span className="text-primary"> Scratch platform</span>, captivating players with its 
              unique blend of simplicity and competitive gameplay.
            </p>
          </section>

          {/* Game Mechanics */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Game Mechanics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Core Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Player control mechanics</li>
                  <li>Goal-scoring system</li>
                  <li>Physics-based gameplay</li>
                  <li>Pen tool visualization</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Game Modes</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Amateur mode</li>
                  <li>Professional mode</li>
                  <li>Tournament system</li>
                  <li>Practice mode</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Game Features */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
            <p className="text-lg mb-4">
              Many creators have enhanced their Pen Football projects with sophisticated features 
              and gameplay mechanics.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Enhanced Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Power-up systems</li>
                <li>Special moves</li>
                <li>Team formations</li>
                <li>Multiplayer support</li>
              </ul>
            </div>
          </section>

          {/* Community Impact */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg">
              The Scratch community has embraced Pen Football with remarkable enthusiasm, leading 
              to continuous improvements and innovations. The game serves as both entertainment 
              and an educational tool for learning programming concepts.
            </p>
          </section>

          {/* Technical Features */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Technical Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Physics Engine</h3>
                <p>Advanced ball movement and collision</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">AI Systems</h3>
                <p>Intelligent computer opponents</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Graphics</h3>
                <p>Pen-based visual rendering</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}