"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_PROMOTIONS } from "@/lib/data";
import { useCasinoStore } from "@/lib/store";
import { Gift, Clock, CheckCircle, Info } from "lucide-react";
import { clsx } from "clsx";

const TYPES = ["all", "welcome", "deposit", "cashback", "free-spins", "vip", "referral"];

export default function PromotionsPage() {
  const [activeType, setActiveType] = useState("all");
  const { isLoggedIn, setShowRegisterModal, setShowLoginModal, addNotification } = useCasinoStore();

  const filtered =
    activeType === "all"
      ? MOCK_PROMOTIONS
      : MOCK_PROMOTIONS.filter((p) => p.type === activeType);

  const handleClaim = (promoTitle: string) => {
    if (!isLoggedIn) {
      setShowRegisterModal(true);
      return;
    }
    addNotification(`🎉 "${promoTitle}" bonus activated!`, "success");
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-brand-dark border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-brand-gold" />
            <span className="text-brand-gold font-bold text-sm uppercase tracking-widest">Bonuses & Promotions</span>
          </div>
          <h1 className="text-4xl font-black mb-2">Claim Your Rewards</h1>
          <p className="text-white/50 max-w-xl">
            Boost your bankroll with exclusive bonuses — from massive welcome packages to VIP rewards and daily cashback.
          </p>
          {!isLoggedIn && (
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowRegisterModal(true)} className="bg-gold-gradient text-black font-bold px-5 py-2.5 rounded-xl">Register & Claim</button>
              <button onClick={() => setShowLoginModal(true)} className="border border-white/20 text-white/70 font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors">Already a member?</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={clsx(
                "shrink-0 px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-all",
                activeType === t
                  ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              )}
            >
              {t === "all" ? "All Bonuses" : t === "free-spins" ? "Free Spins" : t}
            </button>
          ))}
        </div>

        {/* Promos */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-brand-dark-2 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-gold/20 transition-colors"
            >
              {/* Color banner */}
              <div className={`h-2 bg-gradient-to-r ${promo.image}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold/60 bg-brand-gold/10 px-2 py-0.5 rounded-full">{promo.type}</span>
                    <h3 className="text-lg font-bold mt-2">{promo.title}</h3>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-2xl font-black text-brand-gold">{promo.bonus}</p>
                  </div>
                </div>

                <p className="text-sm text-white/50 mb-4">{promo.description}</p>

                {/* Terms grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {promo.minDeposit != null && promo.minDeposit > 0 && (
                    <div className="bg-white/3 rounded-lg p-3">
                      <p className="text-xs text-white/30">Min. Deposit</p>
                      <p className="font-bold text-sm">${promo.minDeposit}</p>
                    </div>
                  )}
                  {promo.wagering > 0 && (
                    <div className="bg-white/3 rounded-lg p-3">
                      <p className="text-xs text-white/30">Wagering Req.</p>
                      <p className="font-bold text-sm">{promo.wagering}x</p>
                    </div>
                  )}
                  {promo.maxBonus && (
                    <div className="bg-white/3 rounded-lg p-3">
                      <p className="text-xs text-white/30">Max Bonus</p>
                      <p className="font-bold text-sm">{promo.maxBonus}</p>
                    </div>
                  )}
                  {promo.expiresIn && (
                    <div className="bg-white/3 rounded-lg p-3">
                      <p className="text-xs text-white/30">Valid For</p>
                      <p className="font-bold text-sm flex items-center gap-1"><Clock className="w-3 h-3" />{promo.expiresIn}</p>
                    </div>
                  )}
                </div>

                {/* Valid games */}
                {promo.validGames && promo.validGames.length > 0 && (
                  <div className="mb-4 flex gap-1.5 flex-wrap">
                    {promo.validGames.map((g) => (
                      <span key={g} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-0.5 text-white/50">{g}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleClaim(promo.title)}
                    className="flex-1 bg-gold-gradient text-black font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    {isLoggedIn ? "Activate Bonus" : "Register & Claim"}
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsible gambling note */}
        <div className="mt-10 bg-brand-dark-2 border border-white/5 rounded-xl p-5 flex gap-3">
          <CheckCircle className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold mb-1">Responsible Bonus Use</p>
            <p className="text-xs text-white/40 leading-relaxed">
              All bonuses are subject to our <span className="underline cursor-pointer">Terms &amp; Conditions</span> and wagering requirements. 
              Please gamble responsibly. Bonuses are intended to enhance entertainment, not as a way to solve financial problems. 
              18+ only. If you feel gambling is causing harm, visit <span className="text-brand-gold">GamCare.org.uk</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
