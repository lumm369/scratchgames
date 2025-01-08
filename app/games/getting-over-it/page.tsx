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
    title: 'scratch games getting over it - ScratchGames.info',
    description: 'Play the best free online getting over it scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/getting-over-it`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('getting-over-it');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Getting Over It", href: "/games/getting-over-it" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Getting Over It Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/getting-over-it' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Getting Over It on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overview</h2>
            <p className="text-lg">
              <strong>Getting Over It</strong> has become a phenomenon in the gaming community, inspiring numerous recreations on 
              <span className="text-primary"> Scratch platform</span>. The original concept has sparked a creative wave among 
              Scratch developers, leading to multiple adaptations of this challenging gameplay experience.
            </p>
          </section>

          {/* Gameplay Mechanics */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Core Gameplay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Basic Mechanics</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Character control with hammer</li>
                  <li>Physics-based movement</li>
                  <li>Precise mouse controls</li>
                  <li>Challenging terrain navigation</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Unique Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Custom-designed levels</li>
                  <li>Modified physics engines</li>
                  <li>Creative adaptations</li>
                  <li>Varied difficulty levels</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Community Impact */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg mb-4">
              The Getting Over It phenomenon has created its own sub-community of developers and players who 
              continuously improve and iterate upon the concept. Notable examples include Griffpatch&apos;s recreation, 
              which has gained significant popularity within the Scratch community.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Community Highlights</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Active developer community</li>
                <li>Regular new versions</li>
                <li>Continuous improvements</li>
                <li>Varied skill level support</li>
              </ul>
            </div>
          </section>

          {/* Development Aspects */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Development Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Visual Style</h3>
                <p>Unique interpretations of the classic aesthetic</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Physics Engine</h3>
                <p>Custom-built movement systems</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Level Design</h3>
                <p>Creative and challenging courses</p>
              </div>
            </div>
          </section>
        </div>
      </article>

    </div>
  );
}