"use client";

import { useState } from "react";
import { useCasinoStore } from "@/lib/store";
import { ArrowUpRight, ArrowDownLeft, Trophy, Download, Filter } from "lucide-react";
import { clsx } from "clsx";

const ALL_TRANSACTIONS = [
  { id: "1", type: "deposit", amount: 500, method: "Visa ****4242", date: "2024-01-15 14:23", status: "completed", game: null },
  { id: "2", type: "win", amount: 240, method: null, date: "2024-01-15 13:01", status: "completed", game: "Sweet Bonanza" },
  { id: "3", type: "bet", amount: -50, method: null, date: "2024-01-15 12:44", status: "completed", game: "Gates of Olympus" },
  { id: "4", type: "withdrawal", amount: -300, method: "Bitcoin", date: "2024-01-14 18:30", status: "processing", game: null },
  { id: "5", type: "win", amount: 1250, method: null, date: "2024-01-14 16:12", status: "completed", game: "Aviator" },
  { id: "6", type: "bet", amount: -100, method: null, date: "2024-01-14 15:55", status: "completed", game: "Aviator" },
  { id: "7", type: "bet", amount: -200, method: null, date: "2024-01-14 15:30", status: "completed", game: "Roulette Live" },
  { id: "8", type: "win", amount: 520, method: null, date: "2024-01-14 15:28", status: "completed", game: "Roulette Live" },
  { id: "9", type: "deposit", amount: 1000, method: "Mastercard ****8801", date: "2024-01-13 10:00", status: "completed", game: null },
  { id: "10", type: "bonus", amount: 1000, method: null, date: "2024-01-13 10:01", status: "completed", game: "Welcome Bonus" },
  { id: "11", type: "bet", amount: -25, method: null, date: "2024-01-12 20:14", status: "completed", game: "Book of Dead" },
  { id: "12", type: "withdrawal", amount: -750, method: "Skrill", date: "2024-01-11 12:00", status: "completed", game: null },
];

const FILTERS = ["all", "deposit", "withdrawal", "win", "bet", "bonus"];

const TYPE_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  deposit: { label: "Deposit", icon: <ArrowDownLeft className="w-4 h-4 text-green-400" />, color: "text-green-400", bg: "bg-green-900/20" },
  withdrawal: { label: "Withdrawal", icon: <ArrowUpRight className="w-4 h-4 text-blue-400" />, color: "text-blue-400", bg: "bg-blue-900/20" },
  win: { label: "Win", icon: <Trophy className="w-4 h-4 text-brand-gold" />, color: "text-brand-gold", bg: "bg-brand-gold/10" },
  bet: { label: "Bet", icon: <ArrowUpRight className="w-4 h-4 text-brand-red" />, color: "text-brand-red", bg: "bg-brand-red/10" },
  bonus: { label: "Bonus", icon: <span className="text-purple-400 text-sm">🎁</span>, color: "text-purple-400", bg: "bg-purple-900/20" },
};

export default function HistoryPage() {
  const { isLoggedIn, user, setShowLoginModal } = useCasinoStore();
  const [activeFilter, setActiveFilter] = useState("all");

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Please log in to view your history</p>
          <button onClick={() => setShowLoginModal(true)} className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-xl">Login</button>
        </div>
      </div>
    );
  }

  const filtered = activeFilter === "all" ? ALL_TRANSACTIONS : ALL_TRANSACTIONS.filter((t) => t.type === activeFilter);

  const totalIn = ALL_TRANSACTIONS.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = ALL_TRANSACTIONS.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const net = totalIn - totalOut;

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">📋 Transaction History</h1>
            <p className="text-white/40 text-sm mt-0.5">All your deposits, withdrawals and game history</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-900/10 border border-green-900/20 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Total In</p>
            <p className="text-green-400 font-black text-lg">${totalIn.toLocaleString('en-US')}</p>
          </div>
          <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Total Out</p>
            <p className="text-brand-red font-black text-lg">${totalOut.toLocaleString('en-US')}</p>
          </div>
          <div className={clsx("rounded-xl p-4 border", net >= 0 ? "bg-brand-gold/10 border-brand-gold/20" : "bg-brand-red/10 border-brand-red/20")}>
            <p className="text-xs text-white/40 mb-1">Net P&L</p>
            <p className={clsx("font-black text-lg", net >= 0 ? "text-brand-gold" : "text-brand-red")}>
              {net >= 0 ? "+" : ""}${net.toLocaleString('en-US')}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={clsx(
                "shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border capitalize transition-all",
                activeFilter === f
                  ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              )}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-brand-dark-2 border border-white/5 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2.5 border-b border-white/5 text-xs text-white/25 font-semibold uppercase tracking-wider">
            <span className="col-span-1">Type</span>
            <span className="col-span-4">Description</span>
            <span className="col-span-3">Date</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2 text-right">Amount</span>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((tx) => {
              const cfg = TYPE_CONFIG[tx.type] || TYPE_CONFIG.bet;
              return (
                <div key={tx.id} className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-white/3 transition-colors">
                  <div className="col-span-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}>{cfg.icon}</div>
                  </div>
                  <div className="col-span-4">
                    <p className="text-sm font-semibold">{cfg.label}</p>
                    <p className="text-xs text-white/30 truncate">{tx.game || tx.method || "—"}</p>
                  </div>
                  <div className="col-span-3 text-xs text-white/40">{tx.date}</div>
                  <div className="col-span-2">
                    <span className={clsx(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                      tx.status === "completed" ? "bg-green-900/30 text-green-400" : "bg-amber-900/30 text-amber-400"
                    )}>
                      {tx.status}
                    </span>
                  </div>
                  <div className={clsx("col-span-2 text-right font-bold text-sm", tx.amount > 0 ? cfg.color : "text-brand-red")}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

