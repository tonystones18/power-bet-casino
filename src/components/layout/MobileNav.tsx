"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Trophy, Gift, User } from "lucide-react";
import { clsx } from "clsx";
import { useCasinoStore } from "@/lib/store";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/promotions", label: "Promos", icon: Gift },
  { href: "/account", label: "Profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn, setShowLoginModal } = useCasinoStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark-sidebar/95 backdrop-blur-xl border-t border-white/[0.07] safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          const handleClick =
            tab.href === "/account" && !isLoggedIn
              ? (e: React.MouseEvent) => {
                  e.preventDefault();
                  setShowLoginModal(true);
                }
              : undefined;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={handleClick}
              className="flex flex-col items-center gap-1 py-1 px-3 min-w-[60px]"
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  isActive
                    ? "bg-brand-gold/15 border border-brand-gold/20"
                    : "bg-transparent"
                )}
              >
                <Icon
                  className={clsx(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-brand-gold" : "text-white/40"
                  )}
                />
              </div>
              <span
                className={clsx(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-brand-gold" : "text-white/35"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
