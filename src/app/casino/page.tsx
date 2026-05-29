"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Star, Users } from "lucide-react";
import { MOCK_GAMES } from "@/lib/data";
import GameCard from "@/components/games/GameCard";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { GameCategory } from "@/lib/types";

const CATEGORIES: { id: string; label: string; emoji: string }[] = [
  { id: "all", label: "All Games", emoji: "🎮" },
  { id: "slots", label: "Slots", emoji: "🎰" },
  { id: "live-casino", label: "Live Casino", emoji: "🎲" },
  { id: "table-games", label: "Table Games", emoji: "🃏" },
  { id: "jackpot", label: "Jackpots", emoji: "🏆" },
  { id: "crash", label: "Crash Games", emoji: "✈️" },
  { id: "poker", label: "Poker", emoji: "♠️" },
  { id: "provably-fair", label: "Provably Fair", emoji: "🔐" },
];

const PROVIDERS = [
  "All Providers",
  "Pragmatic Play",
  "NetEnt",
  "Play'n GO",
  "Evolution",
  "Microgaming",
  "Spribe",
  "SmartSoft",
  "Scientific Games",
];

const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "new", label: "Newest First" },
  { id: "rtp-high", label: "Highest RTP" },
  { id: "rtp-low", label: "Lowest RTP" },
  { id: "az", label: "A to Z" },
];

export default function CasinoPage() {
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("All Providers");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let games = [...MOCK_GAMES];

    if (category !== "all") {
      games = games.filter((g) => g.category === category);
    }
    if (provider !== "All Providers") {
      games = games.filter((g) => g.provider === provider);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.provider.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "new":
        games = games.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rtp-high":
        games = games.sort((a, b) => b.rtp - a.rtp);
        break;
      case "rtp-low":
        games = games.sort((a, b) => a.rtp - b.rtp);
        break;
      case "az":
        games = games.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        games = games.sort(
          (a, b) => (b.players || 0) - (a.players || 0)
        );
    }

    return games;
  }, [category, provider, search, sort]);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-black">🎰 Casino</h1>
          <p className="text-white/40 text-sm mt-1">
            {filtered.length} games available
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Search and controls */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white/70 focus:outline-none focus:border-brand-gold/50 hidden sm:block"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-brand-dark-3">
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors",
              showFilters
                ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:block">Filters</span>
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-brand-dark-2 border border-white/5 rounded-xl p-4 mb-6"
          >
            <div className="flex flex-wrap gap-2">
              <p className="w-full text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">
                Provider
              </p>
              {PROVIDERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    provider === p
                      ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={clsx(
                "shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
                category === cat.id
                  ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Games grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-4xl mb-4">🎮</p>
            <p className="text-lg font-semibold">No games found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <motion.div
            key={category + provider + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
          >
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
