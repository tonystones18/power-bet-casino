"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useCasinoStore } from "@/lib/store";
import { TrendingUp, Users, Zap } from "lucide-react";

const MULTIPLIER_STEPS = [1.0, 1.2, 1.5, 1.8, 2.2, 2.6, 3.1, 3.8, 4.5, 5.5, 6.8, 8.2, 10.0, 12.5, 15.0, 20.0];

type GameState = "waiting" | "flying" | "crashed";

interface Player {
  username: string;
  bet: number;
  cashoutAt: number | null;
  profit: number | null;
}

const MOCK_PLAYERS: Player[] = [
  { username: "user_42", bet: 50, cashoutAt: 2.34, profit: 67 },
  { username: "bigwinner", bet: 200, cashoutAt: 1.55, profit: 110 },
  { username: "player99", bet: 25, cashoutAt: null, profit: null },
  { username: "crypto_king", bet: 500, cashoutAt: 5.10, profit: 2050 },
  { username: "lucky_star", bet: 10, cashoutAt: null, profit: null },
  { username: "ace_bet", bet: 100, cashoutAt: 3.20, profit: 220 },
];

export default function CrashPage() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [stepIndex, setStepIndex] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [autoCashout, setAutoCashout] = useState(2.0);
  const [hasBet, setHasBet] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [history, setHistory] = useState([8.32, 1.02, 14.56, 2.88, 1.34, 6.71, 3.22, 1.89, 42.10, 2.01]);
  const { isLoggedIn, setShowLoginModal, user, updateBalance, addNotification } = useCasinoStore();

  const crash = useCallback((crashAt: number) => {
    setGameState("crashed");
    setHistory((prev) => [crashAt, ...prev.slice(0, 9)]);
    if (hasBet && !cashedOut) {
      addNotification(`Crashed at ${crashAt.toFixed(2)}x — you lost $${betAmount}`, "error");
    }
    setTimeout(() => {
      setGameState("waiting");
      setMultiplier(1.0);
      setStepIndex(0);
      setHasBet(false);
      setCashedOut(false);
      setCountdown(5);
    }, 3000);
  }, [hasBet, cashedOut, betAmount, addNotification]);

  useEffect(() => {
    if (gameState === "waiting") {
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            setGameState("flying");
            return 5;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "flying") return;
    const crashAt = MULTIPLIER_STEPS[Math.floor(Math.random() * MULTIPLIER_STEPS.length)];
    const interval = setInterval(() => {
      setStepIndex((i) => {
        const next = i + 1;
        const nextMult = 1 + (next * 0.12);
        if (nextMult >= crashAt) {
          clearInterval(interval);
          crash(parseFloat(nextMult.toFixed(2)));
          return i;
        }
        setMultiplier(parseFloat(nextMult.toFixed(2)));
        if (hasBet && !cashedOut && nextMult >= autoCashout) {
          const profit = betAmount * autoCashout;
          updateBalance((user?.balance || 0) + profit - betAmount);
          addNotification(`Auto cashed out at ${autoCashout}x! Won $${(profit - betAmount).toFixed(2)}`, "success");
          setCashedOut(true);
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [gameState]);

  const placeBet = () => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    if (gameState !== "waiting") return;
    setHasBet(true);
  };

  const cashOut = () => {
    if (!hasBet || cashedOut || gameState !== "flying") return;
    const profit = betAmount * multiplier;
    updateBalance((user?.balance || 0) + profit - betAmount);
    addNotification(`Cashed out at ${multiplier.toFixed(2)}x! Won $${(profit - betAmount).toFixed(2)}`, "success");
    setCashedOut(true);
  };

  const multColor = gameState === "crashed" ? "text-brand-red" : multiplier >= 5 ? "text-brand-gold" : multiplier >= 2 ? "text-green-400" : "text-white";

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-brand-gold" />
            <h1 className="text-2xl font-black">✈️ Crash Games</h1>
          </div>
          <p className="text-white/40 text-sm">Bet, watch the multiplier rise, and cash out before it crashes!</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Game area */}
          <div className="flex-1">
            {/* History */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {history.map((h, i) => (
                <span key={i} className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${h < 2 ? "bg-brand-red/20 text-brand-red" : h >= 10 ? "bg-brand-gold/20 text-brand-gold" : "bg-green-900/30 text-green-400"}`}>
                  {h.toFixed(2)}x
                </span>
              ))}
            </div>

            {/* Main display */}
            <div className="relative bg-brand-dark-2 border border-white/5 rounded-2xl h-64 flex items-center justify-center overflow-hidden mb-4">
              <div className="absolute inset-0">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              </div>
              <div className="relative text-center">
                {gameState === "waiting" && (
                  <div>
                    <p className="text-white/40 text-sm mb-2">Next round starts in</p>
                    <p className="text-6xl font-black text-white">{countdown}</p>
                    <p className="text-white/30 text-sm mt-2">Place your bets!</p>
                  </div>
                )}
                {gameState === "flying" && (
                  <motion.div key={multiplier} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                    <p className="text-white/30 text-sm mb-1">MULTIPLIER</p>
                    <p className={`text-7xl font-black ${multColor} transition-colors`}>
                      {multiplier.toFixed(2)}x
                    </p>
                    {cashedOut && <p className="text-green-400 font-bold mt-2 text-lg">✓ Cashed Out!</p>}
                  </motion.div>
                )}
                {gameState === "crashed" && (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <p className="text-brand-red text-lg font-bold mb-1">CRASHED!</p>
                    <p className="text-6xl font-black text-brand-red">{multiplier.toFixed(2)}x</p>
                  </motion.div>
                )}
              </div>
              {/* Trajectory line */}
              {gameState === "flying" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 animate-shimmer" />
              )}
            </div>

            {/* Bet controls */}
            <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Bet Amount ($)</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(Number(e.target.value))}
                      disabled={gameState !== "waiting" || hasBet}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold/50 disabled:opacity-50"
                    />
                    {[10, 50, 100].map((v) => (
                      <button key={v} onClick={() => setBetAmount(v)} disabled={gameState !== "waiting" || hasBet} className="bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/60 hover:text-white disabled:opacity-40">${v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Auto Cashout (x)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.1"
                    value={autoCashout}
                    onChange={(e) => setAutoCashout(Number(e.target.value))}
                    disabled={gameState !== "waiting" || hasBet}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold/50 disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                {!hasBet ? (
                  <button onClick={placeBet} disabled={gameState !== "waiting"} className="flex-1 bg-gold-gradient text-black font-bold py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity">
                    {gameState === "waiting" ? `Bet $${betAmount}` : "Wait for next round"}
                  </button>
                ) : (
                  <button onClick={cashOut} disabled={gameState !== "flying" || cashedOut} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors">
                    {cashedOut ? `Cashed Out ✓` : `Cash Out @ ${multiplier.toFixed(2)}x ($${(betAmount * multiplier).toFixed(2)})`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Players list */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="bg-brand-dark-2 border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <Users className="w-4 h-4 text-white/40" />
                <span className="text-sm font-semibold">Players</span>
                <span className="ml-auto text-xs text-white/30">{MOCK_PLAYERS.length}</span>
              </div>
              <div className="divide-y divide-white/5">
                {MOCK_PLAYERS.map((p) => (
                  <div key={p.username} className="flex items-center justify-between px-4 py-2.5">
                    <div>
                      <p className="text-xs font-semibold">{p.username}</p>
                      <p className="text-xs text-white/40">${p.bet}</p>
                    </div>
                    {p.cashoutAt ? (
                      <div className="text-right">
                        <p className="text-xs font-bold text-green-400">{p.cashoutAt}x</p>
                        <p className="text-xs text-green-400/60">+${p.profit}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-brand-gold animate-pulse">Betting...</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
