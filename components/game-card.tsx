"use client";

import { Eye, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Game } from '../actions/games';
import Link from "next/link";

interface GameCardProps extends Game {
  prepage?: string;
}

export default function GameCard({ id, title, image, views, loves, favorites, prepage }: GameCardProps) {
  return (
    <Link href={{
      pathname: `/game/${id}`,
      query: {
        title: title,
        prepage: prepage
      }
    }}>
      <Card className="cursor-pointer overflow-hidden group hover:shadow-lg transition-shadow w-full max-w-[240px]">
        <CardContent className="p-0">
          <div className="relative w-full" style={{ paddingTop: "75%" }}> {/* 360/480 = 0.75 = 75% */}
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
        <CardFooter className="p-2">
          <div className="flex flex-col space-y-1 w-full">
            <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {views}
              </span>
              <span className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                {loves}
              </span>
              <span className="flex items-center">
                <Bookmark className="mr-1 h-4 w-4" />
                {favorites}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}