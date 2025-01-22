import type { Game } from '@/actions/games';
import GameCard from '@/components/game-card';

interface RelatedGamesProps {
  games: {
    success: boolean
    data: Game[]
    error?: string
  }
}

export default function RelatedGames({ games }: RelatedGamesProps) {
  if (!games.success || !games.data) {
    return null
  }
  return (
    <div className="space-y-6">
      <h2 className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Related Game Recommendations
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.data.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}