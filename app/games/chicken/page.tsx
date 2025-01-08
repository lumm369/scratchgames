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
    title: 'scratch games chicken - ScratchGames.info',
    description: 'Play the best free online chicken scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/chicken`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('chicken');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Chicken", href: "/games/chicken" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Chicken Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/chicken' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Chicken Games on Scratch</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          {/* 第一段：介绍 */}
          <section className="mb-8">
            <p className="text-lg mb-4">
              The phenomenon of <strong>chicken games</strong> on the 
              <span className="text-primary"> Scratch programming platform</span> represents 
              a fascinating subset of user-created content that has captured the imagination 
              of both developers and players alike.
            </p>
          </section>

          {/* 第二段：特点介绍 */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Game Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Physics-based chicken movement</li>
              <li>Realistic chicken behavior patterns</li>
              <li>Engaging chicken-centric storylines</li>
              <li>Multiple game variants and styles</li>
            </ul>
          </section>

          {/* 第三段：教育价值 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Educational Value</h2>
            <p className="text-lg">
              These chicken-focused projects demonstrate fundamental programming concepts 
              while maintaining an engaging and often humorous chicken-themed narrative.
            </p>
          </section>

          {/* 第四段：社区影响 */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg">
              The success of chicken games has led to dedicated development communities, 
              featuring advanced mechanics such as:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Multiplayer functionality</li>
              <li>Procedurally generated worlds</li>
              <li>Complex AI systems</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}