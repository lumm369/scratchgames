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
    title: 'scratch games fnaf - ScratchGames.info',
    description: 'Play the best free online fnaf scratch games on ScratchGames.info. No registration required!',
    alternates: {
      canonical: `${siteConfig.url}/fnaf`,
    },
  };
}

export default async function Popular() {
  const result = await searchGames('fnaf-');
  const games = result.data || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: "Fnaf", href: "/games/fnaf" }
        ]} 
      />
      <div className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Fnaf Scratch Games</h2>
      </div>

      <ErrorBoundary fallback={<ErrorUI />}>
        <Suspense fallback={<LoadingUI />}>
          {games.length > 0 ? (
            <GameList games={games} prepage='games/fnaf' />
          ) : (
            <NoGamesUI />
          )}
        </Suspense>
      </ErrorBoundary>

      <article className="game-description max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Five Nights at Freddy&apos;s on Scratch</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* 介绍段落 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">What is FNAF on Scratch?</h2>
            <p className="text-lg">
              The <strong>FNAF phenomenon</strong> has found a unique expression within the 
              <span className="text-primary"> Scratch programming platform</span>, where countless enthusiasts 
              recreate and reimagine the iconic Five Nights at Freddy&apos;s experience. These FNAF adaptations 
              showcase the versatility of Scratch&apos;s block-based coding system, enabling creators to build 
              their own FNAF-inspired survival horror games.
            </p>
          </section>

          {/* 特色功能 */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Security camera management systems</li>
              <li>Animatronic threat defense mechanics</li>
              <li>Power management gameplay</li>
              <li>Custom-designed characters and locations</li>
              <li>Jump-scare mechanics implementation</li>
            </ul>
          </section>

          {/* 社区贡献 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Community & Development</h2>
            <p className="text-lg">
              The Scratch FNAF community actively shares knowledge and resources, helping new developers 
              understand how to implement FNAF game mechanics effectively. Despite Scratch&apos;s technical 
              limitations, dedicated creators have found ingenious ways to incorporate essential FNAF features.
            </p>
          </section>

          {/* 教育价值 */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Educational Benefits</h2>
            <div className="space-y-4">
              <p className="text-lg">
                Through developing FNAF projects, young programmers learn crucial coding concepts while 
                working with a familiar and engaging theme.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Technical Skills</h3>
                  <ul className="list-disc list-inside">
                    <li>Sprite manipulation</li>
                    <li>Event handling</li>
                    <li>State management</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Game Design</h3>
                  <ul className="list-disc list-inside">
                    <li>Atmosphere creation</li>
                    <li>Gameplay balance</li>
                    <li>User experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}