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
  { href: "/live-casino", label: "Live Casino", icon: Tv2, badge: "LIVE", badgeColor: "bg-brand-red" },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/crash", label: "Crash Games", icon: Zap },
  { href: "/poker", label: "Poker", icon: Spade },
  { href: "/promotions", label: "Promotions", icon: Gift, badge: "HOT", badgeColor: "bg-brand-gold text-black" },
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
          "bg-brand-dark-sidebar border-r border-white/5 flex flex-col",
          "w-60 shrink-0",
          "lg:translate-x-0 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-black text-xl tracking-tight">
              POWER<span className="text-brand-gold">.BET</span>
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) toggleSidebar();
                }}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/20"
                    : "text-white/55 hover:text-white hover:bg-white/[0.06]"
                )}
              >
                <Icon
                  className={clsx(
                    "w-[18px] h-[18px] shrink-0",
                    isActive ? "text-brand-gold" : "text-white/35 group-hover:text-white/60"
                  )}
                />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={clsx(
                    "ml-auto text-[9px] px-1.5 py-0.5 rounded font-bold text-white",
                    item.badgeColor || "bg-brand-red"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Game categories */}
          <div className="pt-5 pb-2 px-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Game Categories
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand-purple/20 text-brand-purple-light border border-brand-purple/20"
                    : "text-white/45 hover:text-white hover:bg-white/[0.06]"
                )}
              >
                <Icon className="w-[17px] h-[17px] shrink-0" />
                <span>{cat.label}</span>
                <ChevronRight
                  className={clsx(
                    "w-3 h-3 ml-auto transition-transform",
                    isActive ? "rotate-90 text-brand-purple-light" : "text-white/15"
                  )}
                />
              </button>
            );
          })}
        </nav>

        {/* Bottom promo */}
        <div className="p-3 border-t border-white/[0.07]">
          <div className="bg-gradient-to-br from-brand-purple/40 to-brand-purple-2/60 rounded-xl p-3 border border-brand-purple/20">
            <p className="text-white font-bold text-sm">🎁 Welcome Bonus</p>
            <p className="text-white/60 text-xs mt-0.5">Up to $3,000 + 200 FS</p>
            <Link
              href="/promotions"
              className="mt-2 flex items-center gap-1 text-brand-gold text-xs font-semibold hover:underline"
            >
              Claim Now <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

