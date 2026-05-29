"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Zap, Trophy, Users, Shield, ArrowRight, Clock, Star } from "lucide-react";
import { useCasinoStore } from "@/lib/store";
import { MOCK_GAMES, MOCK_PROMOTIONS, MOCK_EVENTS } from "@/lib/data";
import GameCard from "@/components/games/GameCard";

const HERO_SLIDES = [
  { id: 1, title: "Welcome Bonus", subtitle: "UP TO $3,000", description: "200 Free Spins + 100% match on your first 4 deposits", cta: "Claim Bonus", href: "/promotions", gradient: "from-yellow-900/90 via-amber-900/70 to-brand-dark", tag: "WELCOME PACKAGE", badge: "🎁 New Player Offer" },
  { id: 2, title: "Live Casino", subtitle: "REAL DEALERS", description: "Experience the thrill of a real casino from home — 24/7 live tables", cta: "Play Live", href: "/live-casino", gradient: "from-red-900/90 via-rose-900/70 to-brand-dark", tag: "LIVE CASINO", badge: "🔴 Live Now" },
  { id: 3, title: "Aviator Game", subtitle: "FLY TO WIN", description: "The most popular crash game — bet, fly, cash out before it crashes!", cta: "Play Aviator", href: "/crash", gradient: "from-blue-900/90 via-sky-900/70 to-brand-dark", tag: "CRASH GAMES", badge: "🔥 Most Popular" },
  { id: 4, title: "Sports Betting", subtitle: "30+ SPORTS", description: "Soccer, basketball, tennis, esports and hundreds of daily events", cta: "Bet Now", href: "/sports", gradient: "from-green-900/90 via-emerald-900/70 to-brand-dark", tag: "SPORTS BETTING", badge: "⚡ Live Betting" },
];

const STATS = [
  { label: "Active Players", value: "1.2M+", icon: Users },
  { label: "Games Available", value: "5,000+", icon: Zap },
  { label: "Total Paid Out", value: "$850M+", icon: Trophy },
  { label: "Avg Payout Speed", value: "< 1hr", icon: Clock },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setShowRegisterModal, isLoggedIn } = useCasinoStore();

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const hotGames = MOCK_GAMES.filter((g) => g.isHot).slice(0, 6);
  const newGames = MOCK_GAMES.filter((g) => g.isNew).slice(0, 6);
  const liveGames = MOCK_GAMES.filter((g) => g.isLive).slice(0, 6);
  const liveEvents = MOCK_EVENTS.filter((e) => e.isLive).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }} className={`absolute inset-0 bg-gradient-to-r ${HERO_SLIDES[currentSlide].gradient}`}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/3 blur-3xl" />
            </div>
            <div className="relative h-full flex items-center px-6 md:px-12 max-w-5xl mx-auto">
              <div className="max-w-xl">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-block bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  {HERO_SLIDES[currentSlide].tag}
                </motion.span>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <p className="text-lg font-semibold text-white/70 mb-1">{HERO_SLIDES[currentSlide].title}</p>
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-3 leading-none">{HERO_SLIDES[currentSlide].subtitle}</h1>
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-white/60 mb-8">{HERO_SLIDES[currentSlide].description}</motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-4">
                  <Link href={HERO_SLIDES[currentSlide].href} className="bg-gold-gradient text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Play className="w-4 h-4 fill-current" />
                    {HERO_SLIDES[currentSlide].cta}
                  </Link>
                  {!isLoggedIn && (
                    <button onClick={() => setShowRegisterModal(true)} className="text-white font-semibold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors">Register Free</button>
                  )}
                </motion.div>
                <p className="mt-5 text-sm text-white/40">{HERO_SLIDES[currentSlide].badge}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`transition-all duration-300 rounded-full ${i === currentSlide ? "bg-brand-gold w-6 h-2" : "bg-white/30 w-2 h-2"}`} />
          ))}
        </div>
        <button onClick={() => setCurrentSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
      </section>

      {/* Stats */}
      <section className="bg-brand-dark-2 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-brand-gold" /></div>
                <div><p className="font-bold text-white">{stat.value}</p><p className="text-xs text-white/40">{stat.label}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pt-8 max-w-6xl mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { label: "🔥 Hot Games", href: "/casino" }, { label: "🎰 Slots", href: "/casino" }, { label: "🎲 Live Casino", href: "/live-casino" },
            { label: "⚽ Sports", href: "/sports" }, { label: "✈️ Crash", href: "/crash" }, { label: "♠️ Poker", href: "/poker" },
            { label: "🏆 Jackpots", href: "/casino" }, { label: "🆕 New Games", href: "/casino" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="shrink-0 bg-white/5 hover:bg-brand-gold/10 border border-white/10 hover:border-brand-gold/30 text-white/70 hover:text-brand-gold text-sm font-medium px-4 py-2 rounded-full transition-all">{item.label}</Link>
          ))}
        </div>
      </section>

      {/* Live events */}
      {liveEvents.length > 0 && (
        <section className="px-6 pt-6 max-w-6xl mx-auto">
          <div className="bg-brand-dark-2 border border-white/5 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-xs font-bold text-brand-red"><span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />LIVE NOW</span>
              <span className="text-xs text-white/40">{liveEvents.length} events in progress</span>
            </div>
            <div className="grid md:grid-cols-3 divide-x divide-white/5">
              {liveEvents.map((event) => (
                <Link key={event.id} href="/sports" className="flex items-center justify-between p-4 hover:bg-white/3 transition-colors">
                  <div><p className="text-xs text-white/40 mb-1">{event.league}</p><p className="text-sm font-semibold">{event.homeTeam}</p><p className="text-xs text-white/40">vs</p><p className="text-sm font-semibold">{event.awayTeam}</p></div>
                  {event.score && <div className="text-center"><div className="text-xl font-black text-brand-gold">{event.score.home}:{event.score.away}</div><span className="text-[10px] text-brand-red font-bold">LIVE</span></div>}
                  <div className="text-right space-y-1">
                    <div className="bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/70">{event.odds.home}</div>
                    {event.odds.draw && <div className="bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/70">{event.odds.draw}</div>}
                    <div className="bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/70">{event.odds.away}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hot Games */}
      <GameSection title="🔥 Hot Games" subtitle="Most played by our community right now" games={hotGames} href="/casino" />
      <GameSection title="🎲 Live Casino" subtitle="Real dealers, real action — available 24/7" games={liveGames} href="/live-casino" />
      <GameSection title="⭐ New Arrivals" subtitle="Freshly added to our collection" games={newGames} href="/casino" />

      {/* Promotions */}
      <section className="px-6 pt-8 pb-12 max-w-6xl mx-auto">
        <SectionHeader title="🎁 Bonuses & Promotions" subtitle="Claim your rewards and boost your play" href="/promotions" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {MOCK_PROMOTIONS.slice(0, 3).map((promo) => (
            <motion.div key={promo.id} whileHover={{ scale: 1.02 }} className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${promo.image} border border-white/10 p-5`}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-white/10 px-2 py-1 rounded">{promo.type}</span>
                <h3 className="text-lg font-bold mt-2 mb-1">{promo.title}</h3>
                <p className="text-sm text-white/70 mb-4">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <div><p className="text-brand-gold font-bold">{promo.bonus}</p>{promo.wagering > 0 && <p className="text-xs text-white/40">{promo.wagering}x wagering</p>}</div>
                  <Link href="/promotions" className="bg-brand-gold text-black text-xs font-bold px-3 py-1.5 rounded-lg">Claim</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-brand-dark-2 border-t border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-8">Why Choose POWER.BET</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Licensed & Safe", desc: "MGA & UKGC licensed" },
              { icon: Zap, title: "Fast Payouts", desc: "Same-day withdrawals" },
              { icon: Star, title: "5,000+ Games", desc: "Top providers worldwide" },
              { icon: Users, title: "24/7 Support", desc: "Live chat, email & phone" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-brand-gold" /></div>
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function GameSection({ title, subtitle, games, href }: { title: string; subtitle: string; games: typeof MOCK_GAMES; href: string }) {
  return (
    <section className="px-6 pt-8 max-w-6xl mx-auto">
      <SectionHeader title={title} subtitle={subtitle} href={href} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-5">
        {games.map((game) => <GameCard key={game.id} game={game} size="sm" />)}
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>
      </div>
      <Link href={href} className="shrink-0 flex items-center gap-1 text-brand-gold text-sm font-semibold hover:gap-2 transition-all">View All <ArrowRight className="w-4 h-4" /></Link>
    </div>
  );
}
