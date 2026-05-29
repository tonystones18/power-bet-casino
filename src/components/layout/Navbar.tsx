"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Wallet,
  LogOut,
  User,
  Settings,
  History,
  Zap,
  X,
} from "lucide-react";
import { useCasinoStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function Navbar() {
  const {
    user,
    isLoggedIn,
    toggleSidebar,
    setShowLoginModal,
    setShowRegisterModal,
    logout,
    setSearchQuery,
    searchQuery,
  } = useCasinoStore();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      msg: "Your withdrawal of $250 has been processed",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      msg: "New promotion: 50 Free Spins on Gates of Olympus!",
      time: "1 hr ago",
      type: "info",
    },
    {
      id: 3,
      msg: "You've reached Gold VIP status 🥇",
      time: "3 hr ago",
      type: "success",
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-brand-dark-2/95 backdrop-blur-lg border-b border-white/5 h-16 flex items-center px-4 gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white/70 hover:text-white transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Logo (mobile) */}
      <Link
        href="/"
        className="lg:hidden flex items-center gap-1.5 font-black text-lg"
      >
        <Zap className="w-5 h-5 text-brand-gold" />
        POWER<span className="text-brand-gold">.BET</span>
      </Link>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-sm relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Mobile search */}
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="md:hidden text-white/70 hover:text-white"
      >
        {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </button>

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {isLoggedIn && user ? (
          <>
            {/* Balance */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-semibold text-brand-gold">
                ${user.balance.toFixed(2)}
              </span>
            </div>

            {/* Deposit button */}
            <Link
              href="/account/deposit"
              className="hidden sm:flex items-center gap-1.5 bg-gold-gradient text-black rounded-lg px-3 py-2 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              + Deposit
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-red" />
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-12 w-80 bg-brand-dark-3 border border-white/10 rounded-xl shadow-card overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                      <span className="font-semibold text-sm">
                        Notifications
                      </span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-white/40 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                      >
                        <p className="text-sm text-white/80">{n.msg}</p>
                        <p className="text-xs text-white/30 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center text-black text-xs font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user.username}
                </span>
                <ChevronDown
                  className={clsx(
                    "w-3 h-3 text-white/40 transition-transform",
                    showUserMenu && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-12 w-52 bg-brand-dark-3 border border-white/10 rounded-xl shadow-card overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold">{user.username}</p>
                      <p className="text-xs text-white/40">{user.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-brand-gold font-semibold">
                          {user.vipLevel} VIP
                        </span>
                        <span className="text-xs text-white/30">
                          {user.loyaltyPoints || 0} pts
                        </span>
                      </div>
                    </div>
                    {[
                      { href: "/account", icon: User, label: "My Account" },
                      {
                        href: "/account/deposit",
                        icon: Wallet,
                        label: "Deposit",
                      },
                      {
                        href: "/account/history",
                        icon: History,
                        label: "History",
                      },
                      {
                        href: "/account/settings",
                        icon: Settings,
                        label: "Settings",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-white/5">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-sm text-brand-red hover:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-medium text-white/80 hover:text-white px-3 py-2 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gold-gradient text-black text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 bg-brand-dark-2 border-b border-white/10 px-4 py-3 md:hidden"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
