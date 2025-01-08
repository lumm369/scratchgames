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
    title: 'scratch games minecraft - ScratchGames.info',
    description: 'Play the best free online minecraft scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/minecraft`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('minecraft');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Minecraft", href: "/games/minecraft" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Minecraft Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/minecraft' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Minecraft on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg">
              <strong>Minecraft</strong>&apos;s influence extends far beyond its original platform, inspiring countless recreations on 
              <span className="text-primary"> Scratch platform</span>. These remakes demonstrate how the iconic sandbox game can be 
              reimagined while maintaining its core appeal.
            </p>
          </section>

          {/* Platform Adaptations */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Platform Adaptations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Game Types</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Block-building simulations</li>
                  <li>Multiplayer adventures</li>
                  <li>Survival games</li>
                  <li>Platformer variations</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Core Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Resource gathering</li>
                  <li>Crafting systems</li>
                  <li>World exploration</li>
                  <li>Building mechanics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Notable Projects */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Notable Projects</h2>
            <p className="text-lg mb-4">
              Among the most notable Minecraft projects on Scratch is &quot;Paper Minecraft&quot; by griffpatch, 
              demonstrating how Minecraft&apos;s core mechanics can be successfully translated into the 2D environment.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Popular Variations</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Paper Minecraft</li>
                <li>Minecraft survival simulations</li>
                <li>Adventure adaptations</li>
                <li>Creative building games</li>
              </ul>
            </div>
          </section>

          {/* Community Impact */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg">
              The success of Minecraft projects has inspired countless young programmers to create their own versions, 
              leading to an extensive collection of Minecraft-related content. These adaptations serve as excellent 
              learning tools for aspiring developers.
            </p>
          </section>

          {/* Technical Achievements */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Technical Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Inventory System</h3>
                <p>Complex item management implementation</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">World Generation</h3>
                <p>Procedural terrain creation</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Game Mechanics</h3>
                <p>Creative problem-solving approaches</p>
              </div>
            </div>
          </section>
        </div>
      </article>

    </div>
  );
}