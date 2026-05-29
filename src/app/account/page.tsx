"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCasinoStore } from "@/lib/store";
import { VIP_LEVELS } from "@/lib/data";
import { Wallet, History, Settings, Crown, TrendingUp, ArrowUpRight, ArrowDownLeft, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const QUICK_TRANSACTIONS = [
  { type: "deposit", amount: 500, method: "Visa ****4242", date: "Today, 14:23", status: "completed" },
  { type: "win", amount: 240, game: "Sweet Bonanza", date: "Today, 13:01", status: "completed" },
  { type: "loss", amount: -50, game: "Gates of Olympus", date: "Today, 12:44", status: "completed" },
  { type: "withdrawal", amount: -300, method: "Bitcoin", date: "Yesterday", status: "processing" },
  { type: "win", amount: 1250, game: "Aviator", date: "Yesterday", status: "completed" },
];

export default function AccountPage() {
  const { isLoggedIn, user, setShowLoginModal } = useCasinoStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) setShowLoginModal(true);
  }, [isLoggedIn, setShowLoginModal]);

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">You must be logged in to view your account</p>
          <button onClick={() => setShowLoginModal(true)} className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-xl">Login</button>
        </div>
      </div>
    );
  }

  const vipLevel = VIP_LEVELS.find((v) => v.name === user.vipLevel) || VIP_LEVELS[0];
  const nextLevel = VIP_LEVELS[VIP_LEVELS.findIndex((v) => v.name === user.vipLevel) + 1];
  const points = user.loyaltyPoints || 0;
  const progress = nextLevel ? Math.min((points / nextLevel.minPoints) * 100, 100) : 100;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">My Account</h1>
            <p className="text-white/40 text-sm mt-0.5">Welcome back, {user.username}</p>
          </div>
          <div className="flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-xl px-4 py-2">
            <span className="text-lg">{vipLevel.icon}</span>
            <div>
              <p className="text-xs text-white/40">VIP Status</p>
              <p className="text-brand-gold font-bold text-sm">{user.vipLevel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-5">
        {/* Balance cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Balance", value: `$${user.balance.toFixed(2)}`, icon: Wallet, color: "text-brand-gold" },
            { label: "Bonus Balance", value: `$${user.bonusBalance?.toFixed(2) || "0.00"}`, icon: Crown, color: "text-purple-400" },
            { label: "Loyalty Points", value: (user.loyaltyPoints || 0).toLocaleString('en-US'), icon: TrendingUp, color: "text-green-400" },
            { label: "Lifetime Wins", value: "$4,820", icon: TrendingUp, color: "text-blue-400" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-brand-dark-2 border border-white/5 rounded-xl p-4">
                <Icon className={`w-4 h-4 mb-2 ${card.color}`} />
                <p className={`font-black text-xl ${card.color}`}>{card.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{card.label}</p>
              </div>
            );
          })}
        </div>

        {/* VIP progress */}
        {nextLevel && (
          <div className="bg-brand-dark-2 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{vipLevel.icon}</span>
                <span className="font-bold">{user.vipLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <span className="text-sm">→</span>
                <span className="text-xl">{nextLevel.icon}</span>
                <span className="font-semibold text-sm">{nextLevel.name}</span>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gold-gradient rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-white/30 mt-1.5">
              <span>{points.toLocaleString('en-US')} pts</span>
              <span>{nextLevel.minPoints.toLocaleString('en-US')} pts needed</span>
            </div>
          </div>
        )}

        {/* Quick nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: ArrowUpRight, label: "Deposit", desc: "Add funds instantly", href: "/account/deposit", color: "text-green-400", bg: "bg-green-900/10 border-green-900/20" },
            { icon: ArrowDownLeft, label: "Withdraw", desc: "Cash out winnings", href: "/account/deposit", color: "text-blue-400", bg: "bg-blue-900/10 border-blue-900/20" },
            { icon: History, label: "History", desc: "View transactions", href: "/account/history", color: "text-purple-400", bg: "bg-purple-900/10 border-purple-900/20" },
            { icon: Settings, label: "Settings", desc: "Manage account", href: "/account/settings", color: "text-white/60", bg: "bg-white/3 border-white/10" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className={`flex items-center gap-3 p-4 rounded-xl border hover:brightness-110 transition-all ${item.bg}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-white/30">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent transactions */}
        <div className="bg-brand-dark-2 border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="font-bold">Recent Transactions</h2>
            <Link href="/account/history" className="text-brand-gold text-sm font-semibold flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {QUICK_TRANSACTIONS.map((tx, i) => {
              const isPositive = tx.amount > 0;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isPositive ? "bg-green-900/30" : "bg-brand-red/10"}`}>
                    {isPositive ? <ArrowDownLeft className="w-4 h-4 text-green-400" /> : <ArrowUpRight className="w-4 h-4 text-brand-red" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold capitalize">{tx.type}</p>
                    <p className="text-xs text-white/30">{tx.method || tx.game} · {tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${isPositive ? "text-green-400" : "text-brand-red"}`}>
                      {isPositive ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <p className={`text-xs ${tx.status === "processing" ? "text-brand-gold" : "text-white/30"}`}>{tx.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsible gambling note */}
        <div className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl px-4 py-3">
          <Shield className="w-4 h-4 text-white/30 shrink-0" />
          <p className="text-xs text-white/30">
            Gamble responsibly. Set deposit limits and cooling-off periods in{" "}
            <Link href="/account/settings" className="text-brand-gold underline">Settings</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

