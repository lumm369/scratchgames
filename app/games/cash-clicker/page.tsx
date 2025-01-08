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
    title: 'scratch games cash clicker - ScratchGames.info',
    description: 'Play the best free online cash clicker scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/cash-clicker`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('cash-clicker');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Cash Clicker", href: "/games/cash-clicker" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Cash Clicker Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/cash-clicker' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Cash Clicker</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            <strong>Cash Clicker</strong> has emerged as one of the most engaging game genres on the 
            <span className="text-primary"> Scratch programming platform</span>, captivating users with 
            its simple yet addictive gameplay mechanics. At its core, Cash Clicker games embody the 
            essence of incremental gaming, where players begin their journey with basic clicking actions 
            to generate virtual currency.
          </p>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Accessibility and endless progression system</li>
              <li>Strategic resource management</li>
              <li>Automated income generators and multipliers</li>
              <li>Various gameplay elements and achievements</li>
            </ul>
          </section>

          <p className="text-lg">
            The educational value of Cash Clicker games extends beyond entertainment, teaching basic 
            economic principles and mathematical concepts through engaging gameplay. Many aspiring 
            developers begin their journey creating Cash Clicker games, making it a perfect 
            starting point for learning programming.
          </p>
        </div>
      </article>
    </div>
  );
}