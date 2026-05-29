"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_EVENTS } from "@/lib/data";
import { BettingEvent } from "@/lib/types";
import { useCasinoStore } from "@/lib/store";
import { clsx } from "clsx";
import { Trophy, Zap, X, Plus, Trash2 } from "lucide-react";

const SPORTS = [
  { id: "all", label: "All Sports", emoji: "🏅" },
  { id: "Soccer", label: "Soccer", emoji: "⚽" },
  { id: "Basketball", label: "Basketball", emoji: "🏀" },
  { id: "Tennis", label: "Tennis", emoji: "🎾" },
  { id: "Baseball", label: "Baseball", emoji: "⚾" },
  { id: "MMA", label: "MMA/UFC", emoji: "🥊" },
  { id: "Ice Hockey", label: "Ice Hockey", emoji: "🏒" },
  { id: "Esports", label: "Esports", emoji: "🎮" },
];

interface BetSlipItem {
  eventId: string;
  team: string;
  odds: number;
  stake: number;
}

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState("all");
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const { isLoggedIn, setShowLoginModal, addNotification } = useCasinoStore();

  const filtered = MOCK_EVENTS.filter((e) => {
    if (activeSport !== "all" && e.sport !== activeSport) return false;
    if (showLiveOnly && !e.isLive) return false;
    return true;
  });

  const addToBetSlip = (event: BettingEvent, team: string, odds: number) => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    const existing = betSlip.find((b) => b.eventId === event.id);
    if (existing) {
      setBetSlip((prev) => prev.filter((b) => b.eventId !== event.id));
    } else {
      setBetSlip((prev) => [...prev, { eventId: event.id, team, odds, stake: 10 }]);
    }
  };

  const updateStake = (eventId: string, stake: number) => {
    setBetSlip((prev) => prev.map((b) => b.eventId === eventId ? { ...b, stake } : b));
  };

  const totalOdds = betSlip.reduce((acc, b) => acc * b.odds, 1);
  const totalStake = betSlip.reduce((acc, b) => acc + b.stake, 0);
  const potentialWin = totalStake * totalOdds;

  const placeBet = () => {
    addNotification(`Bet placed! Potential win: $${potentialWin.toFixed(2)}`, "success");
    setBetSlip([]);
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="w-6 h-6 text-brand-gold" />
            <h1 className="text-2xl font-black">Sports Betting</h1>
          </div>
          <p className="text-white/40 text-sm">
            Bet on 30+ sports with competitive odds and live betting
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="flex gap-2 overflow-x-auto">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setActiveSport(sport.id)}
                    className={clsx(
                      "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                      activeSport === sport.id
                        ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    <span>{sport.emoji}</span>
                    {sport.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowLiveOnly(!showLiveOnly)}
                className={clsx(
                  "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                  showLiveOnly
                    ? "bg-brand-red/10 border-brand-red/30 text-brand-red"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                Live Only
              </button>
            </div>

            {/* Events */}
            <div className="space-y-3">
              {filtered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBet={addToBetSlip}
                  selectedBets={betSlip}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-20 text-white/30">
                  <p className="text-4xl mb-3">⚽</p>
                  <p>No events found for this filter</p>
                </div>
              )}
            </div>
          </div>

          {/* Bet Slip */}
          <div className="w-72 shrink-0 hidden lg:block">
            <div className="sticky top-20 bg-brand-dark-2 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-gold" />
                  <span className="font-bold text-sm">Bet Slip</span>
                  {betSlip.length > 0 && (
                    <span className="bg-brand-gold text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {betSlip.length}
                    </span>
                  )}
                </div>
                {betSlip.length > 0 && (
                  <button onClick={() => setBetSlip([])} className="text-white/40 hover:text-brand-red text-xs">
                    Clear All
                  </button>
                )}
              </div>

              {betSlip.length === 0 ? (
                <div className="py-12 text-center text-white/30">
                  <p className="text-3xl mb-2">🎯</p>
                  <p className="text-sm">Click any odds to add to bet slip</p>
                </div>
              ) : (
                <div>
                  <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                    {betSlip.map((bet) => {
                      const event = MOCK_EVENTS.find((e) => e.id === bet.eventId);
                      return (
                        <div key={bet.eventId} className="px-4 py-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-xs text-brand-gold font-semibold">{bet.team}</p>
                              <p className="text-xs text-white/40">{event?.homeTeam} vs {event?.awayTeam}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-brand-gold">{bet.odds}</span>
                              <button onClick={() => setBetSlip((p) => p.filter((b) => b.eventId !== bet.eventId))} className="text-white/30 hover:text-brand-red">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">Stake:</span>
                            <div className="flex-1 relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white/40">$</span>
                              <input
                                type="number"
                                value={bet.stake}
                                onChange={(e) => updateStake(bet.eventId, Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded pl-5 pr-2 py-1 text-xs text-white focus:outline-none focus:border-brand-gold/50"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-3 border-t border-white/5 bg-brand-dark-3/50 space-y-2">
                    {betSlip.length > 1 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Combined Odds</span>
                        <span className="font-bold text-brand-gold">{totalOdds.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Total Stake</span>
                      <span className="font-bold">${totalStake.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60 font-semibold">Potential Win</span>
                      <span className="font-bold text-brand-green">${potentialWin.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={placeBet}
                      className="w-full bg-gold-gradient text-black font-bold py-2.5 rounded-xl text-sm mt-2 hover:opacity-90 transition-opacity"
                    >
                      Place Bet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({
  event,
  onBet,
  selectedBets,
}: {
  event: BettingEvent;
  onBet: (event: BettingEvent, team: string, odds: number) => void;
  selectedBets: BetSlipItem[];
}) {
  const isSelected = selectedBets.some((b) => b.eventId === event.id);

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className={clsx(
        "bg-brand-dark-2 border rounded-xl overflow-hidden transition-colors",
        isSelected ? "border-brand-gold/30" : "border-white/5"
      )}
    >
      <div className="flex items-center gap-3 px-4 py-2 border-b border-white/5">
        <span className="text-xs text-white/40">{event.sport} — {event.league}</span>
        {event.isLive ? (
          <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-brand-red">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            LIVE
          </span>
        ) : (
          <span className="ml-auto text-xs text-white/30">{event.startTime}</span>
        )}
      </div>

      <div className="flex items-center px-4 py-4 gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">{event.homeTeam}</p>
            {event.score && <span className="text-xl font-black text-brand-gold ml-4">{event.score.home}</span>}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">{event.awayTeam}</p>
            {event.score && <span className="text-xl font-black text-brand-gold ml-4">{event.score.away}</span>}
          </div>
        </div>

        {/* Odds */}
        <div className="flex gap-2 shrink-0">
          <OddsButton label={event.homeTeam.split(" ").pop()!} odds={event.odds.home} onClick={() => onBet(event, event.homeTeam, event.odds.home)} isSelected={isSelected} />
          {event.odds.draw !== undefined && (
            <OddsButton label="Draw" odds={event.odds.draw} onClick={() => onBet(event, "Draw", event.odds.draw!)} isSelected={false} />
          )}
          <OddsButton label={event.awayTeam.split(" ").pop()!} odds={event.odds.away} onClick={() => onBet(event, event.awayTeam, event.odds.away)} isSelected={isSelected} />
        </div>
      </div>
    </motion.div>
  );
}

function OddsButton({ label, odds, onClick, isSelected }: { label: string; odds: number; onClick: () => void; isSelected: boolean }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center px-3 py-2 rounded-lg border text-xs font-semibold min-w-[52px] transition-all",
        isSelected
          ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold"
          : "bg-white/5 border-white/10 text-white/70 hover:bg-brand-gold/5 hover:border-brand-gold/20 hover:text-brand-gold"
      )}
    >
      <span className="text-[10px] text-white/40 mb-0.5 truncate max-w-[50px]">{label}</span>
      <span className="font-bold">{odds.toFixed(2)}</span>
    </button>
  );
}
