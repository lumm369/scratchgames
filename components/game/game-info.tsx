import { Badge } from "@/components/ui/badge";
import type { Game } from "@/actions/games";

interface GameInfoProps {
  game: Game;
}

export default function GameInfo({ game }: GameInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Game Introduction</h2>
          <p className="text-gray-600">{game.description}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">How To Play</h2>
          <p className="text-gray-600">{game.instructions}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Author</h2>
          <p className="text-gray-600">{game.author}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Category</h2>
          <div className="flex flex-wrap gap-2">
            {/* {game.tags?.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))} */}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Game Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Game Popularity</p>
              <p className="font-medium">{game.views} views</p>
            </div>
            <div>
              <p className="text-gray-500">Collection Count</p>
              <p className="font-medium">{game.favorites} favorites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}