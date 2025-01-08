"use client";

import type { Game } from '@/actions/games';
import GameCard from "@/components/game-card";

interface GameListProps {
  games: Game[];
  prepage?: string;
}

export default function GameList({ games, prepage }: GameListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {games.map((game: Game) => (
        <GameCard key={game.id} {...game} prepage={prepage} />
      ))}
    </div>
  );
}