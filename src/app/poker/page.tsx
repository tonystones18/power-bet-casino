"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_GAMES } from "@/lib/data";
import GameCard from "@/components/games/GameCard";
import { clsx } from "clsx";
import { Spade, Trophy, Users } from "lucide-react";

const POKER_TABS = [
  { id: "games", label: "Poker Games" },
  { id: "tables", label: "Live Tables" },
  { id: "tournaments", label: "MTTs" },
];

const POKER_GAMES = [
  { id: "texas", name: "Texas Hold'em", emoji: "♠️", desc: "The world's most popular poker variant", players: "2-9", minBuy: "$10", maxBuy: "$10,000" },
  { id: "omaha", name: "Omaha", emoji: "🃏", desc: "4 hole cards, more action and bigger pots", players: "2-9", minBuy: "$20", maxBuy: "$5,000" },
  { id: "stud", name: "7-Card Stud", emoji: "🂡", desc: "Classic poker with no community cards", players: "2-8", minBuy: "$10", maxBuy: "$2,000" },
  { id: "3card", name: "3 Card Poker", emoji: "🎴", desc: "Fast-paced casino poker against the dealer", players: "1-7", minBuy: "$5", maxBuy: "$1,000" },
  { id: "plo", name: "Pot Limit Omaha", emoji: "🀄", desc: "High variance, big pots, serious action", players: "2-9", minBuy: "$50", maxBuy: "$50,000" },
  { id: "razz", name: "Razz", emoji: "🂾", desc: "Lowball stud — lowest hand wins", players: "2-8", minBuy: "$10", maxBuy: "$2,000" },
];

const LIVE_TABLES = [
  { id: "1", name: "Texas Hold'em VIP", stakes: "$25/$50", players: "4/9", status: "open" },
  { id: "2", name: "Texas Hold'em Micro", stakes: "$0.50/$1", players: "9/9", status: "full" },
  { id: "3", name: "Omaha High", stakes: "$5/$10", players: "6/9", status: "open" },
  { id: "4", name: "Private Table #112", stakes: "$10/$20", players: "3/9", status: "open" },
  { id: "5", name: "PLO Mega Stack", stakes: "$50/$100", players: "7/9", status: "open" },
  { id: "6", name: "Texas Hold'em Regular", stakes: "$2/$5", players: "8/9", status: "open" },
];

const MTTS = [
  { id: "1", name: "Daily Deep Stack", prizePool: "$5,000", buyIn: "$20", players: "182 / 500", status: "registering", start: "Today 21:00" },
  { id: "2", name: "Sunday Major", prizePool: "$100,000", buyIn: "$100", players: "423 / 2000", status: "registering", start: "Sun 18:00" },
  { id: "3", name: "Micro Monthly", prizePool: "$1,000", buyIn: "$5", players: "310 / 1000", status: "live", start: "In Progress" },
  { id: "4", name: "Freeroll Special", prizePool: "$500", buyIn: "FREE", players: "887 / 2000", status: "registering", start: "Tomorrow 20:00" },
];

export default function PokerPage() {
  const [activeTab, setActiveTab] = useState("games");

  const pokerGames = MOCK_GAMES.filter((g) => g.category === "poker");

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900/80 via-slate-800/40 to-brand-dark border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-2">
            <Spade className="w-6 h-6 text-white" />
            <span className="font-bold uppercase tracking-widest text-sm text-white/60">Poker Room</span>
          </div>
          <h1 className="text-4xl font-black mb-2">♠️ Poker</h1>
          <p className="text-white/50">Texas Hold'em, Omaha, Stud and more — live tables and tournaments running 24/7</p>
          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-white/40">
              <Users className="w-4 h-4" />
              <span>3,200 players online</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Trophy className="w-4 h-4" />
              <span>$2.1M in prizes this month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-brand-dark-2 rounded-xl w-fit mb-6 border border-white/5">
          {POKER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === tab.id
                  ? "bg-white/10 text-white shadow"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "games" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {POKER_GAMES.map((game) => (
                <div key={game.id} className="bg-brand-dark-2 border border-white/5 rounded-xl p-4 hover:border-white/15 transition-colors">
                  <div className="text-3xl mb-2">{game.emoji}</div>
                  <h3 className="font-bold mb-1">{game.name}</h3>
                  <p className="text-xs text-white/40 mb-3">{game.desc}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                    <div><p className="text-white/30">Players</p><p className="font-semibold">{game.players}</p></div>
                    <div><p className="text-white/30">Min Buy</p><p className="font-semibold text-green-400">{game.minBuy}</p></div>
                    <div><p className="text-white/30">Max Buy</p><p className="font-semibold">{game.maxBuy}</p></div>
                  </div>
                  <button className="w-full bg-white/5 border border-white/10 hover:bg-brand-gold/10 hover:border-brand-gold/20 text-white/70 hover:text-brand-gold text-sm font-semibold py-2 rounded-lg transition-all">
                    Play Now
                  </button>
                </div>
              ))}
            </div>
            {pokerGames.length > 0 && (
              <>
                <h2 className="font-bold mb-4 text-white/60 text-sm uppercase tracking-widest">Video Poker</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {pokerGames.map((g) => <GameCard key={g.id} game={g} size="sm" />)}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === "tables" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-brand-dark-2 border border-white/5 rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 px-4 py-2.5 border-b border-white/5 text-xs text-white/30 font-semibold uppercase tracking-wider">
                <span>Table</span>
                <span>Stakes</span>
                <span>Players</span>
                <span>Action</span>
              </div>
              {LIVE_TABLES.map((table) => (
                <div key={table.id} className="grid grid-cols-4 px-4 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors items-center">
                  <p className="font-semibold text-sm">{table.name}</p>
                  <p className="text-sm text-brand-gold font-bold">{table.stakes}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold rounded-full"
                        style={{ width: `${(parseInt(table.players) / parseInt(table.players.split("/")[1])) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40">{table.players}</span>
                  </div>
                  <button
                    disabled={table.status === "full"}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-gold/10 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-fit"
                  >
                    {table.status === "full" ? "Full" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "tournaments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {MTTS.map((mtt) => (
              <div key={mtt.id} className="bg-brand-dark-2 border border-white/5 rounded-xl p-4 hover:border-white/15 transition-colors flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{mtt.name}</h3>
                    <span className={clsx(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                      mtt.status === "live" ? "bg-brand-red/20 text-brand-red" : "bg-green-900/30 text-green-400"
                    )}>
                      {mtt.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-white/40">
                    <span>Buy-In: <strong className="text-white">{mtt.buyIn}</strong></span>
                    <span>Players: <strong className="text-white">{mtt.players}</strong></span>
                    <span>Start: <strong className="text-white">{mtt.start}</strong></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-brand-gold font-black text-lg">{mtt.prizePool}</p>
                  <p className="text-xs text-white/30">Prize Pool</p>
                </div>
                <button className="shrink-0 bg-gold-gradient text-black font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
                  Register
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
