"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Tv2,
  Gift,
  Star,
  Zap,
  ChevronRight,
  Dices,
  Target,
  Spade,
  X,
  Home,
  Flame,
} from "lucide-react";
import { useCasinoStore } from "@/lib/store";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/live-casino", label: "Live Casino", icon: Tv2 },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/crash", label: "Crash Games", icon: Zap },
  { href: "/poker", label: "Poker", icon: Spade },
  { href: "/promotions", label: "Promotions", icon: Gift },
  { href: "/vip", label: "VIP Club", icon: Star },
  { href: "/tournaments", label: "Tournaments", icon: Target },
];

const gameCategories = [
  { id: "all", label: "All Games", icon: Gamepad2 },
  { id: "new", label: "New Games", icon: Flame },
  { id: "hot", label: "Hot Games", icon: Zap },
  { id: "slots", label: "Slots", icon: Dices },
  { id: "jackpot", label: "Jackpots", icon: Trophy },
  { id: "table-games", label: "Table Games", icon: Spade },
  { id: "live-casino", label: "Live Casino", icon: Tv2 },
  { id: "crash", label: "Crash", icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setActiveCategory, activeCategory } =
    useCasinoStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : "-100%",
          width: sidebarOpen ? 240 : 240,
        }}
        className={clsx(
          "fixed lg:static top-0 left-0 h-full z-50 lg:z-auto",
          "bg-brand-dark-2 border-r border-white/5 flex flex-col",
          "w-60 shrink-0",
          "lg:translate-x-0 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-black text-xl tracking-tight">
              POWER
              <span className="text-brand-gold">.BET</span>
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon
                  className={clsx(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-brand-gold" : "text-white/40 group-hover:text-white/70"
                  )}
                />
                {item.label}
                {item.href === "/live-casino" && (
                  <span className="ml-auto text-[10px] bg-brand-red text-white px-1.5 py-0.5 rounded font-bold animate-pulse">
                    LIVE
                  </span>
                )}
                {item.href === "/promotions" && (
                  <span className="ml-auto text-[10px] bg-brand-gold text-black px-1.5 py-0.5 rounded font-bold">
                    HOT
                  </span>
                )}
              </Link>
            );
          })}

          {/* Game categories */}
          <div className="pt-4 pb-2 px-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
              Categories
            </p>
          </div>
          {gameCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {cat.label}
                <ChevronRight
                  className={clsx(
                    "w-3 h-3 ml-auto transition-transform",
                    isActive ? "rotate-90 text-brand-gold" : "text-white/20"
                  )}
                />
              </button>
            );
          })}
        </nav>

        {/* Bottom promo */}
        <div className="p-3 border-t border-white/5">
          <div className="bg-gold-gradient rounded-xl p-3">
            <p className="text-black font-bold text-sm">🎁 Welcome Bonus</p>
            <p className="text-black/70 text-xs mt-0.5">
              Up to $3,000 + 200 FS
            </p>
            <Link
              href="/promotions"
              className="mt-2 flex items-center gap-1 text-black text-xs font-semibold"
            >
              Claim Now <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
