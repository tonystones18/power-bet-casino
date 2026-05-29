"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_GAMES } from "@/lib/data";
import GameCard from "@/components/games/GameCard";
import { Tv2, Users, Star } from "lucide-react";

const LIVE_CATEGORIES = [
  { id: "all", label: "All Live Games" },
  { id: "roulette", label: "Roulette" },
  { id: "blackjack", label: "Blackjack" },
  { id: "baccarat", label: "Baccarat" },
  { id: "game-show", label: "Game Shows" },
  { id: "poker", label: "Live Poker" },
];

export default function LiveCasinoPage() {
  const [activeTab, setActiveTab] = useState("all");
  const liveGames = MOCK_GAMES.filter((g) => g.isLive);

  const filtered =
    activeTab === "all"
      ? liveGames
      : liveGames.filter((g) => g.tags.includes(activeTab));

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-red-950/80 via-rose-950/60 to-brand-dark border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-brand-red font-bold text-sm uppercase tracking-widest">Live Now</span>
          </div>
          <h1 className="text-4xl font-black mb-2">🎲 Live Casino</h1>
          <p className="text-white/50 max-w-xl">
            Play with real dealers streamed in HD — roulette, blackjack, baccarat, game shows and more, available 24/7.
          </p>
          <div className="flex gap-6 mt-6">
            {[
              { icon: Tv2, label: "Live Tables", value: "200+" },
              { icon: Users, label: "Players Online", value: "12,400" },
              { icon: Star, label: "Avg Rating", value: "4.8/5" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-brand-red" />
                  <div>
                    <p className="text-white font-bold">{stat.value}</p>
                    <p className="text-xs text-white/40">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {LIVE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeTab === cat.id
                  ? "bg-brand-red/10 border-brand-red/30 text-brand-red"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live tables notice */}
        <div className="bg-brand-dark-2 border border-brand-red/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shrink-0" />
          <p className="text-sm text-white/60">
            All tables are streamed live in HD. Real dealers, real cards, real results. 
            <span className="text-brand-gold font-semibold ml-1">Min bet from $1.</span>
          </p>
        </div>

        {/* Games grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {(filtered.length > 0 ? filtered : liveGames).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </motion.div>

        {/* Evolution provider callout */}
        <div className="mt-12 bg-brand-dark-2 border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">Powered by World-Class Providers</h2>
          <p className="text-sm text-white/40 mb-4">Our live casino is powered by Evolution, the global leader in live dealer games.</p>
          <div className="flex flex-wrap gap-2">
            {["Evolution Gaming", "Pragmatic Play Live", "Ezugi", "Vivo Gaming"].map((p) => (
              <span key={p} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/60">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
