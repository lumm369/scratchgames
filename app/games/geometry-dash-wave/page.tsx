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
    title: 'scratch games geometry dash wave - ScratchGames.info',
    description: 'Play the best free online geometry dash wave scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/geometry-dash-wave`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('geometry-dash-wave');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Geometry Dash Wave", href: "/games/geometry-dash-wave" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Geometry Dash Wave Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/geometry-dash-wave' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Geometry Dash Wave on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg">
              <strong>Geometry Dash Wave</strong> has emerged as one of the most captivating game adaptations within the 
              <span className="text-primary"> Scratch programming community</span>, showcasing the platform&apos;s creative potential. 
              This unique interpretation of the Geometry Dash Wave gameplay mechanics has spawned numerous remakes and variations, 
              each offering its own twist on the core concept.
            </p>
          </section>

          {/* Gameplay Mechanics */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Core Gameplay</h2>
            <p className="text-lg mb-4">
              In the traditional Geometry Dash Wave format, players control a wave-shaped character that moves 
              in a distinctive diagonal pattern, requiring precise timing and careful control to navigate through 
              increasingly challenging obstacle courses.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Custom music track integration</li>
                <li>Unique visual effects</li>
                <li>Innovative level designs</li>
                <li>Rhythmic flow mechanics</li>
              </ul>
            </div>
          </section>

          {/* Community & Creation */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Community Creation</h2>
            <p className="text-lg mb-4">
              The community&apos;s creative approach to level design has led to an extensive collection 
              of user-created versions. Many creators have developed their own Geometry Dash Wave variations, 
              featuring everything from basic training levels to extremely challenging courses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Community Support</h3>
                <p>Numerous tutorials and workshops helping aspiring developers create their own levels.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Technical Achievement</h3>
                <p>Innovative solutions for smooth wave movement and precise collision detection.</p>
              </div>
            </div>
          </section>

          {/* Additional Features */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Extended Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Custom Effects</h3>
                <p>Unique death animations and visual feedback</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Practice Mode</h3>
                <p>Training system for skill improvement</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Level Editor</h3>
                <p>Tools for creating custom challenges</p>
              </div>
            </div>
          </section>
        </div>
      </article>

    </div>
  );
}