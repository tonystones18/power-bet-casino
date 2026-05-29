"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Zap, Lock, Mail, User, Phone } from "lucide-react";
import { useCasinoStore } from "@/lib/store";

export default function AuthModals() {
  const {
    showLoginModal,
    showRegisterModal,
    setShowLoginModal,
    setShowRegisterModal,
    login,
    addNotification,
  } = useCasinoStore();

  return (
    <>
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSwitchToRegister={() => setShowRegisterModal(true)}
            login={login}
            addNotification={addNotification}
          />
        )}
        {showRegisterModal && (
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => setShowLoginModal(true)}
            login={login}
            addNotification={addNotification}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function LoginModal({
  onClose,
  onSwitchToRegister,
  login,
  addNotification,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
  login: (user: any) => void;
  addNotification: (msg: string, type: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Simulate login
    await new Promise((r) => setTimeout(r, 1000));
    login({
      id: "user1",
      username: email.split("@")[0],
      email,
      balance: 1250.0,
      bonusBalance: 50.0,
      vipLevel: "Gold",
      loyaltyPoints: 7500,
    });
    addNotification("Welcome back! You are now logged in.", "success");
    onClose();
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full max-w-md">
        <ModalHeader title="Welcome Back" subtitle="Sign in to your account" onClose={onClose} />
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            placeholder="you@example.com"
          />
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-xs text-brand-gold hover:underline">
                Forgot password?
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-brand-gold font-semibold hover:underline"
            >
              Register Now
            </button>
          </p>
        </form>
      </div>
    </ModalWrapper>
  );
}

function RegisterModal({
  onClose,
  onSwitchToLogin,
  login,
  addNotification,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
  login: (user: any) => void;
  addNotification: (msg: string, type: any) => void;
}) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    agree: false,
    age: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const update = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }
    if (!form.agree || !form.age) {
      setError("You must agree to the terms and confirm your age");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({
      id: "user_new",
      username: form.username,
      email: form.email,
      balance: 0,
      bonusBalance: 0,
      vipLevel: "Bronze",
      loyaltyPoints: 0,
    });
    addNotification(
      "🎉 Welcome to POWER.BET! Your account is ready.",
      "success"
    );
    onClose();
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full max-w-md">
        <ModalHeader
          title="Create Account"
          subtitle="Join thousands of players today"
          onClose={onClose}
        />

        {/* Welcome bonus callout */}
        <div className="mt-4 bg-gold-gradient/10 border border-brand-gold/20 rounded-xl p-3 flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <div>
            <p className="text-sm font-bold text-brand-gold">Welcome Bonus</p>
            <p className="text-xs text-white/60">
              Get up to $3,000 + 200 Free Spins on registration!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <InputField
            label="Username"
            type="text"
            value={form.username}
            onChange={(v) => update("username", v)}
            icon={User}
            placeholder="coolplayer123"
          />
          <InputField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            icon={Mail}
            placeholder="you@example.com"
          />
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <InputField
            label="Phone (optional)"
            type="tel"
            value={form.phone}
            onChange={(v) => update("phone", v)}
            icon={Phone}
            placeholder="+1 555 0100"
          />

          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.age}
                onChange={(e) => update("age", e.target.checked)}
                className="mt-0.5 accent-brand-gold"
              />
              <span className="text-xs text-white/50">
                I confirm that I am 18 years or older and gambling is legal in
                my jurisdiction.
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => update("agree", e.target.checked)}
                className="mt-0.5 accent-brand-gold"
              />
              <span className="text-xs text-white/50">
                I agree to the{" "}
                <a href="/terms" className="text-brand-gold hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-brand-gold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account & Claim Bonus"}
          </button>
          <p className="text-center text-sm text-white/40">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-brand-gold font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </ModalWrapper>
  );
}

function ModalWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-brand-dark-3 border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-card"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gold-gradient flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <span className="font-black text-lg">
            POWER<span className="text-brand-gold">.BET</span>
          </span>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-white/40">{subtitle}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white/40 hover:text-white transition-colors p-1"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  icon: Icon,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ComponentType<any>;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
        />
      </div>
    </div>
  );
}
