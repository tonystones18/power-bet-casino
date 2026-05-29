"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, Star, Wallet, ArrowRight } from "lucide-react";
import { MOCK_GAMES } from "@/lib/data";
import GameCard from "@/components/games/GameCard";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "Popular", emoji: "🔥" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "slots", label: "Casino", emoji: "🎰" },
  { id: "live-casino", label: "Live", emoji: "🎲" },
  { id: "crash", label: "Crash", emoji: "✈️" },
  { id: "jackpot", label: "Jackpots", emoji: "🏆" },
  { id: "table-games", label: "Table", emoji: "🃏" },
  { id: "poker", label: "Poker", emoji: "♠️" },
];

const PROVIDERS = [
  "All", "Pragmatic Play", "NetEnt", "Play'n GO", "Evolution",
  "Microgaming", "Spribe", "SmartSoft", "Hacksaw", "BGaming",
];

const SORT_OPTIONS = [
  { id: "popular", label: "Popular" },
  { id: "new", label: "Newest" },
  { id: "rtp-high", label: "Highest RTP" },
  { id: "az", label: "A – Z" },
];

const PROMO_BANNERS = [
  {
    id: 1,
    icon: "₿",
    iconBg: "bg-brand-gold/20",
    title: "No Crypto?",
    desc: "Get started with popular payment methods",
    cta: "Learn More",
    href: "/account/deposit",
    gradient: "from-[#1A1A46] to-[#2D1B69]",
  },
  {
    id: 2,
    icon: "💰",
    iconBg: "bg-brand-green/20",
    title: "Daily Cashback",
    desc: "Get up to 20% daily — no BS cashback",
    cta: "Claim",
    href: "/promotions",
    gradient: "from-[#0D3B1E] to-[#1A5C36]",
  },
  {
    id: 3,
    icon: "👥",
    iconBg: "bg-brand-blue/20",
    title: "Refer and Earn",
    desc: "Invite friends, complete missions and earn",
    cta: "Invite",
    href: "/promotions",
    gradient: "from-[#1A2D4A] to-[#0D1F35]",
  },
];

export default function CasinoPage() {
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [showProviders, setShowProviders] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let games = [...MOCK_GAMES];
    if (category !== "all") {
      games = games.filter((g) => g.category === category);
    }
    if (provider !== "All") {
      games = games.filter((g) => g.provider.toLowerCase().includes(provider.toLowerCase()));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter((g) => g.title.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q));
    }
    switch (sort) {
      case "new": games = games.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "rtp-high": games = games.sort((a, b) => b.rtp - a.rtp); break;
      case "az": games = games.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: games = games.sort((a, b) => (b.players || 0) - (a.players || 0));
    }
    return games;
  }, [category, provider, search, sort]);

  const currentSort = SORT_OPTIONS.find((s) => s.id === sort)?.label || "Popular";

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Promo banners */}
      <div className="px-4 pt-4 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROMO_BANNERS.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className={`flex items-center gap-3 bg-gradient-to-r ${banner.gradient} rounded-2xl px-4 py-3 border border-white/[0.07] hover:border-white/15 transition-colors group`}
            >
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0", banner.iconBg)}>
                {banner.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{banner.title}</p>
                <p className="text-white/50 text-[11px] leading-tight truncate">{banner.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-dark-2 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-gold/40 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={clsx(
                "shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all",
                category === cat.id
                  ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/25"
                  : "bg-brand-dark-2 text-white/50 border border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <span className="text-base leading-none">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort & Filter row */}
      <div className="px-4 pb-4 flex items-center justify-between gap-3">
        <p className="text-white/40 text-sm">
          <span className="text-white/70 font-medium">{filtered.length}</span> games
        </p>
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => { setShowSort(!showSort); setShowProviders(false); }}
              className="flex items-center gap-1.5 bg-brand-dark-2 border border-white/[0.08] text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort: {currentSort}
              <ChevronDown className={clsx("w-3 h-3 transition-transform", showSort && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  className="absolute right-0 top-10 w-40 bg-brand-dark-3 border border-white/10 rounded-xl shadow-card overflow-hidden z-10"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => { setSort(opt.id); setShowSort(false); }}
                      className={clsx("w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.06]",
                        sort === opt.id ? "text-brand-gold" : "text-white/65"
                      )}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Providers */}
          <div className="relative">
            <button
              onClick={() => { setShowProviders(!showProviders); setShowSort(false); }}
              className="flex items-center gap-1.5 bg-brand-dark-2 border border-white/[0.08] text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
            >
              Providers: {provider}
              <ChevronDown className={clsx("w-3 h-3 transition-transform", showProviders && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showProviders && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  className="absolute right-0 top-10 w-48 bg-brand-dark-3 border border-white/10 rounded-xl shadow-card overflow-hidden z-10"
                >
                  {PROVIDERS.map((p) => (
                    <button key={p} onClick={() => { setProvider(p); setShowProviders(false); }}
                      className={clsx("w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.06]",
                        provider === p ? "text-brand-gold" : "text-white/65"
                      )}>
                      {p}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Games grid */}
      <div className="px-4 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-5xl mb-4">🎮</p>
            <p className="text-lg font-semibold text-white/50">No games found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
            <button onClick={() => { setCategory("all"); setProvider("All"); setSearch(""); }} className="mt-4 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm rounded-xl">
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            key={category + provider + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5"
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
