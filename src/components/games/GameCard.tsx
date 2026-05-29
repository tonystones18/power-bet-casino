"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Play, Heart, Zap, Trophy } from "lucide-react";
import { Game } from "@/lib/types";
import { useCasinoStore } from "@/lib/store";
import { clsx } from "clsx";

interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}

export default function GameCard({ game, size = "md" }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isLoggedIn, setShowLoginModal, addNotification } = useCasinoStore();

  const handlePlay = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addNotification(`Launching ${game.title}...`, "info");
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsFavorite(!isFavorite);
    addNotification(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      "success"
    );
  };

  const thumbnailClasses = `bg-gradient-to-br ${game.thumbnail}`;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={clsx(
        "relative rounded-xl overflow-hidden cursor-pointer group",
        "bg-brand-dark-card border border-white/5",
        size === "sm" && "aspect-[3/4]",
        size === "md" && "aspect-[3/4]",
        size === "lg" && "aspect-[4/3]"
      )}
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <div className={clsx("absolute inset-0", thumbnailClasses)}>
        {/* Game title overlay in thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {game.category === "slots" ? "🎰" :
               game.category === "live-casino" ? "🎲" :
               game.category === "crash" ? "✈️" :
               game.category === "poker" ? "♠️" :
               game.category === "jackpot" ? "🏆" : "🃏"}
            </div>
            <p className="text-white font-bold text-sm px-2 text-center drop-shadow-lg">
              {game.title}
            </p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {game.isNew && (
          <span className="text-[10px] font-bold bg-brand-blue text-white px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
        {game.isHot && (
          <span className="text-[10px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded">
            HOT
          </span>
        )}
        {game.isLive && (
          <span className="text-[10px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            LIVE
          </span>
        )}
        {game.category === "jackpot" && (
          <span className="text-[10px] font-bold bg-brand-gold text-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Trophy className="w-2.5 h-2.5" />
            JACKPOT
          </span>
        )}
      </div>

      {/* Favorite button */}
      <button
        onClick={handleFavorite}
        className={clsx(
          "absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
          isFavorite
            ? "bg-brand-red text-white"
            : "bg-black/40 text-white/60 opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart className={clsx("w-3.5 h-3.5", isFavorite && "fill-current")} />
      </button>

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className="flex items-center gap-2 bg-gold-gradient text-black font-bold px-5 py-2 rounded-full text-sm"
        >
          <Play className="w-4 h-4 fill-current" />
          Play Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.stopPropagation();
            addNotification(`Opening demo for ${game.title}`, "info");
          }}
          className="flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full text-sm border border-white/20"
        >
          <Zap className="w-3.5 h-3.5" />
          Demo
        </motion.button>

        {/* Info */}
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
            {game.rating}
          </span>
          <span>RTP {game.rtp}%</span>
          {game.players && (
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {game.players.toLocaleString()}
            </span>
          )}
        </div>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white font-semibold text-xs truncate">{game.title}</p>
        <p className="text-white/50 text-[10px] truncate">{game.provider}</p>
      </div>
    </motion.div>
  );
}
