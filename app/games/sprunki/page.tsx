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
    title: 'scratch games sprunki - ScratchGames.info',
    description: 'Play the best free online sprunki scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/sprunki`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('sprunki');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Sprunki", href: "/games/sprunki" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Sprunki Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/sprunki' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Sprunki on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg">
              <strong>Sprunki</strong> has emerged as one of the most fascinating game phenomena on the 
              <span className="text-primary"> Scratch platform</span>, captivating users with its unique 
              blend of creativity and entertainment.
            </p>
          </section>

          {/* Core Features */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Gameplay Elements</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Interactive musical elements</li>
                  <li>Rhythmic compositions</li>
                  <li>Character interactions</li>
                  <li>User-friendly interface</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Enhanced Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Visual effects</li>
                  <li>Modified mechanics</li>
                  <li>Expanded sound libraries</li>
                  <li>Theme variations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
            <p className="text-lg mb-4">
              What makes Sprunki games particularly appealing is their accessibility and user-friendly interface. 
              Players can easily jump into the experience and start creating, regardless of skill level.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Simple drag-and-drop interactions</li>
                <li>Intuitive controls</li>
                <li>All skill levels welcome</li>
                <li>Quick learning curve</li>
              </ul>
            </div>
          </section>

          {/* Community Impact */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <p className="text-lg">
              The evolution of Sprunki on Scratch has demonstrated the platform&apos;s potential for creative 
              game development. Each new remake brings unique elements while inspiring young developers 
              to explore game creation.
            </p>
          </section>

          {/* Future Prospects */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Future Prospects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Innovation</h3>
                <p>Continuous new variations</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Growth</h3>
                <p>Expanding community</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Development</h3>
                <p>Platform advancement</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}