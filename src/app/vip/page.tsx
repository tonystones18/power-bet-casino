"use client";

import { VIP_LEVELS } from "@/lib/data";
import { useCasinoStore } from "@/lib/store";
import { Crown, Star, Zap, Gift, Shield, Headphones, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const VIP_PERKS = [
  { icon: Gift, title: "Exclusive Bonuses", desc: "Personalized reload bonuses, free spins and cashback deals crafted just for your play style." },
  { icon: Zap, title: "Faster Withdrawals", desc: "Priority processing — Diamond members get same-day withdrawals in under 1 hour." },
  { icon: Headphones, title: "Dedicated Account Manager", desc: "Gold and above get a personal VIP manager reachable 24/7 via phone, chat and email." },
  { icon: Shield, title: "Higher Limits", desc: "Increased deposit, withdrawal and betting limits as your VIP level grows." },
  { icon: Crown, title: "VIP Events & Trips", desc: "Exclusive invitations to real-world casino events, sports tournaments and luxury experiences." },
  { icon: Star, title: "Loyalty Points", desc: "Earn points on every bet and convert them to bonus cash at any time." },
];

export default function VIPPage() {
  const { isLoggedIn, user, setShowRegisterModal } = useCasinoStore();

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-950/80 via-amber-950/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <Crown className="w-12 h-12 text-brand-gold mx-auto mb-4" />
          <h1 className="text-5xl font-black mb-3">VIP Club</h1>
          <p className="text-white/50 max-w-lg mx-auto text-lg mb-8">
            The more you play, the more you're rewarded. Five exclusive tiers packed with perks, bonuses and privileges.
          </p>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gold-gradient text-black font-bold px-8 py-3 rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Join the VIP Club
            </button>
          ) : (
            <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 rounded-xl px-6 py-3">
              <p className="text-brand-gold font-bold">Welcome back, {user?.username}! You're a {user?.vipLevel} member.</p>
            </div>
          )}
        </div>
      </div>

      {/* VIP tiers */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-black text-center mb-8">VIP Tiers</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {VIP_LEVELS.map((level, i) => {
            const isCurrentLevel = isLoggedIn && user?.vipLevel === level.name;
            const colors: Record<string, string> = {
              Bronze: "border-amber-700/40 bg-amber-900/10",
              Silver: "border-slate-400/30 bg-slate-700/10",
              Gold: "border-brand-gold/40 bg-brand-gold/10",
              Platinum: "border-blue-400/30 bg-blue-900/10",
              Diamond: "border-purple-400/30 bg-purple-900/10",
            };
            const textColors: Record<string, string> = {
              Bronze: "text-amber-600",
              Silver: "text-slate-400",
              Gold: "text-brand-gold",
              Platinum: "text-blue-300",
              Diamond: "text-purple-400",
            };
            return (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={clsx(
                  "relative rounded-2xl border p-5 text-center",
                  colors[level.name] || "border-white/10 bg-white/3",
                  isCurrentLevel && "ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-dark"
                )}
              >
                {isCurrentLevel && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Current</div>
                )}
                <div className="text-3xl mb-2">{level.icon}</div>
                <h3 className={clsx("font-black text-lg", textColors[level.name])}>{level.name}</h3>
                <p className="text-xs text-white/40 mt-1 mb-4">
                  {level.minPoints.toLocaleString('en-US')}+ pts
                </p>
                <ul className="space-y-1.5 text-left">
                  {level.benefits.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-1.5">
                      <span className={clsx("text-xs mt-0.5", textColors[level.name])}>✓</span>
                      <span className="text-xs text-white/60">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-white/40">Cashback</p>
                  <p className={clsx("font-black text-lg", textColors[level.name])}>{level.cashbackRate}%</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Perks */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <h2 className="text-2xl font-black text-center mb-8 mt-4">VIP Member Perks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIP_PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5 hover:border-brand-gold/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-bold mb-2">{perk.title}</h3>
                <p className="text-sm text-white/40">{perk.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      {!isLoggedIn && (
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="bg-gradient-to-r from-brand-gold/10 via-amber-900/10 to-brand-gold/5 border border-brand-gold/20 rounded-2xl p-8 text-center">
            <Crown className="w-10 h-10 text-brand-gold mx-auto mb-3" />
            <h2 className="text-2xl font-black mb-2">Start Your VIP Journey Today</h2>
            <p className="text-white/40 mb-6">Create a free account and begin earning VIP points immediately.</p>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gold-gradient text-black font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

