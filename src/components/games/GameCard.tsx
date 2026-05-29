"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Play, Heart, Zap, Trophy } from "lucide-react";
import Image from "next/image";
import { Game } from "@/lib/types";
import { useCasinoStore } from "@/lib/store";
import { clsx } from "clsx";

interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}

// Category emoji fallbacks
const CATEGORY_EMOJI: Record<string, string> = {
  slots: "🎰",
  "live-casino": "🎲",
  crash: "✈️",
  poker: "♠️",
  jackpot: "🏆",
  "table-games": "🃏",
  sports: "⚽",
  "provably-fair": "🔐",
};

export default function GameCard({ game, size = "md" }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const showImage = game.imageUrl && !imgError;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={clsx(
        "relative rounded-2xl overflow-hidden cursor-pointer group",
        "border border-white/[0.06]",
        size === "sm" && "aspect-[3/4]",
        size === "md" && "aspect-[3/4]",
        size === "lg" && "aspect-[4/3]"
      )}
      onClick={handlePlay}
    >
      {/* Background — image or gradient fallback */}
      {showImage ? (
        <Image
          src={game.imageUrl!}
          alt={game.title}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
        />
      ) : (
        <div className={clsx("absolute inset-0 bg-gradient-to-br", game.thumbnail)}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="text-4xl">{CATEGORY_EMOJI[game.category] || "🎮"}</div>
            <p className="text-white font-bold text-xs px-3 text-center drop-shadow-lg leading-tight">
              {game.title}
            </p>
          </div>
        </div>
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Badges — top left */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {game.isNew && (
          <span className="text-[9px] font-bold bg-brand-blue text-white px-1.5 py-0.5 rounded-md">
            NEW
          </span>
        )}
        {game.isHot && !game.isNew && (
          <span className="text-[9px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded-md">
            HOT
          </span>
        )}
        {game.isLive && (
          <span className="text-[9px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse inline-block" />
            LIVE
          </span>
        )}
        {game.category === "jackpot" && (
          <span className="text-[9px] font-bold bg-brand-gold text-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <Trophy className="w-2 h-2" />
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
            ? "bg-brand-red text-white opacity-100"
            : "bg-black/50 text-white/70 opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart className={clsx("w-3 h-3", isFavorite && "fill-current")} />
      </button>

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-2.5"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className="flex items-center gap-1.5 bg-gold-gradient text-black font-bold px-5 py-2 rounded-full text-xs shadow-gold"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Play
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.stopPropagation();
            addNotification(`Opening demo for ${game.title}`, "info");
          }}
          className="flex items-center gap-1.5 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs border border-white/20"
        >
          <Zap className="w-3 h-3" />
          Demo
        </motion.button>
        <div className="flex items-center gap-2.5 text-[10px] text-white/55">
          <span className="flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-brand-gold text-brand-gold" />
            {game.rating}
          </span>
          <span>RTP {game.rtp}%</span>
          {game.players && (
            <span className="flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" />
              {game.players.toLocaleString("en-US")}
            </span>
          )}
        </div>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-white font-semibold text-xs leading-tight truncate">{game.title}</p>
        <p className="text-white/45 text-[10px] truncate mt-0.5">{game.provider}</p>
      </div>
    </motion.div>
  );
}


interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}
