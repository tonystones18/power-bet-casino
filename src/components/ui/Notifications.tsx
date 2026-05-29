"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCasinoStore } from "@/lib/store";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "border-brand-green bg-brand-green/10 text-brand-green",
  error: "border-brand-red bg-brand-red/10 text-brand-red",
  info: "border-brand-blue bg-brand-blue/10 text-brand-blue",
  warning: "border-brand-gold bg-brand-gold/10 text-brand-gold",
};

export default function Notifications() {
  const { notifications, removeNotification } = useCasinoStore();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border ${colors[n.type]} backdrop-blur-lg bg-brand-dark-3/90 shadow-card`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="flex-1 text-sm text-white/90">{n.message}</p>
              <button
                onClick={() => removeNotification(n.id)}
                className="text-white/40 hover:text-white shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
