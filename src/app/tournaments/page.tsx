"use client";

import { useState } from "react";
import { MOCK_GAMES } from "@/lib/data";
import { useCasinoStore } from "@/lib/store";
import GameCard from "@/components/games/GameCard";
import { Trophy, Clock, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const TOURNAMENTS = [
  {
    id: "1",
    title: "Slots Championship",
    prize: "$50,000",
    prizePool: 50000,
    endTime: "2d 14h 32m",
    players: 1847,
    maxPlayers: 5000,
    type: "slots",
    status: "active",
    sponsor: "Pragmatic Play",
    image: "from-purple-900 to-pink-900",
    myPosition: null,
    leaderboard: [
      { rank: 1, username: "champion_x", score: 142800, prize: "$15,000" },
      { rank: 2, username: "spin_master", score: 138200, prize: "$8,000" },
      { rank: 3, username: "lucky_roll", score: 129500, prize: "$5,000" },
      { rank: 4, username: "gold_streak", score: 118700, prize: "$3,000" },
      { rank: 5, username: "night_gambler", score: 105300, prize: "$2,000" },
    ],
  },
  {
    id: "2",
    title: "Live Blackjack Series",
    prize: "$25,000",
    prizePool: 25000,
    endTime: "6h 15m",
    players: 423,
    maxPlayers: 500,
    type: "live-casino",
    status: "ending",
    sponsor: "Evolution",
    image: "from-green-900 to-teal-900",
    myPosition: null,
    leaderboard: [
      { rank: 1, username: "ace_dealer", score: 88200, prize: "$7,500" },
      { rank: 2, username: "21_king", score: 82100, prize: "$4,000" },
      { rank: 3, username: "card_shark", score: 79400, prize: "$3,000" },
      { rank: 4, username: "table_boss", score: 71200, prize: "$2,000" },
      { rank: 5, username: "hit_or_stand", score: 63800, prize: "$1,500" },
    ],
  },
  {
    id: "3",
    title: "Aviator High Flyers",
    prize: "$10,000",
    prizePool: 10000,
    endTime: "Starts in 1h",
    players: 0,
    maxPlayers: 2000,
    type: "crash",
    status: "upcoming",
    sponsor: "Spribe",
    image: "from-blue-900 to-sky-900",
    myPosition: null,
    leaderboard: [],
  },
  {
    id: "4",
    title: "Weekend Poker Open",
    prize: "$30,000",
    prizePool: 30000,
    endTime: "3d 8h",
    players: 762,
    maxPlayers: 1000,
    type: "poker",
    status: "active",
    sponsor: "POWER.BET",
    image: "from-red-900 to-orange-900",
    myPosition: 47,
    leaderboard: [
      { rank: 1, username: "poker_pro", score: 95600, prize: "$10,000" },
      { rank: 2, username: "bluff_master", score: 91200, prize: "$6,000" },
      { rank: 3, username: "all_in_anna", score: 87800, prize: "$4,000" },
      { rank: 4, username: "fold_never", score: 83400, prize: "$3,000" },
      { rank: 5, username: "river_rat", score: 78900, prize: "$2,000" },
    ],
  },
];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const { isLoggedIn, setShowRegisterModal, addNotification } = useCasinoStore();
  const tournament = TOURNAMENTS.find((t) => t.id === activeTab)!;

  const join = () => {
    if (!isLoggedIn) { setShowRegisterModal(true); return; }
    addNotification(`You've joined ${tournament.title}! Good luck!`, "success");
  };

  const statusColor: Record<string, string> = {
    active: "text-green-400 bg-green-400/10 border-green-400/20",
    ending: "text-brand-red bg-brand-red/10 border-brand-red/20",
    upcoming: "text-brand-gold bg-brand-gold/10 border-brand-gold/20",
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-brand-gold" />
            <h1 className="text-2xl font-black">Tournaments</h1>
          </div>
          <p className="text-white/40 text-sm">Compete against other players and win massive prize pools</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Tournament cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {TOURNAMENTS.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab(t.id)}
              className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                activeTab === t.id ? "border-brand-gold/40" : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.image} opacity-30`} />
              <div className="absolute inset-0 bg-brand-dark-2/70" />
              <div className="relative">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${statusColor[t.status]}`}>
                  {t.status}
                </span>
                <p className="font-bold mt-2 mb-1 text-sm leading-snug">{t.title}</p>
                <p className="text-brand-gold font-black text-lg">{t.prize}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {t.endTime}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tournament detail */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Info */}
          <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
            <div className={`h-1.5 rounded-full bg-gradient-to-r ${tournament.image} mb-4`} />
            <h2 className="text-xl font-black mb-1">{tournament.title}</h2>
            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border ${statusColor[tournament.status]}`}>
              {tournament.status}
            </span>
            
            <div className="mt-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-white/40 text-sm">Prize Pool</span>
                <span className="font-bold text-brand-gold">{tournament.prize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-sm">Time Left</span>
                <span className="font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />{tournament.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-sm">Players</span>
                <span className="font-semibold flex items-center gap-1"><Users className="w-3 h-3" />{tournament.players.toLocaleString()} / {tournament.maxPlayers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-sm">Sponsor</span>
                <span className="font-semibold">{tournament.sponsor}</span>
              </div>
              {tournament.myPosition && (
                <div className="flex justify-between bg-brand-gold/10 border border-brand-gold/20 rounded-lg px-3 py-2">
                  <span className="text-brand-gold text-sm font-semibold">Your Position</span>
                  <span className="font-bold text-brand-gold">#{tournament.myPosition}</span>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/30 mb-1">
                <span>Players registered</span>
                <span>{Math.round((tournament.players / tournament.maxPlayers) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full"
                  style={{ width: `${(tournament.players / tournament.maxPlayers) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={join}
              disabled={tournament.status === "ending" && tournament.players >= tournament.maxPlayers}
              className="w-full mt-5 bg-gold-gradient text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {tournament.status === "upcoming" ? "Pre-Register" : "Join Tournament"}
            </button>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2 bg-brand-dark-2 border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              <Award className="w-5 h-5 text-brand-gold" />
              <span className="font-bold">Leaderboard</span>
              <span className="text-xs text-white/30 ml-auto">Prize Distribution</span>
            </div>
            {tournament.leaderboard.length === 0 ? (
              <div className="py-16 text-center text-white/30">
                <Trophy className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>Tournament hasn't started yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {tournament.leaderboard.map((entry) => {
                  const medalColor = entry.rank === 1 ? "text-brand-gold" : entry.rank === 2 ? "text-slate-400" : entry.rank === 3 ? "text-amber-700" : "text-white/30";
                  return (
                    <div key={entry.rank} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
                      <span className={`font-black text-lg w-6 text-center ${medalColor}`}>
                        {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
                      </span>
                      <span className="flex-1 font-semibold text-sm">{entry.username}</span>
                      <span className="text-sm text-white/40">{entry.score.toLocaleString()} pts</span>
                      <span className="font-bold text-brand-gold text-sm">{entry.prize}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Featured games for this tournament */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Qualifying Games</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {MOCK_GAMES.filter((g) => g.category === tournament.type || tournament.type === "crash" && g.category === "crash").slice(0, 8).map((game) => (
              <GameCard key={game.id} game={game} size="sm" />
            ))}
            {MOCK_GAMES.slice(0, 8).map((game) => (
              <GameCard key={game.id + "-extra"} game={game} size="sm" />
            )).slice(0, Math.max(0, 8 - MOCK_GAMES.filter((g) => g.category === tournament.type).length))}
          </div>
        </div>
      </div>
    </div>
  );
}
