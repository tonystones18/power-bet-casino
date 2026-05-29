"use client";

import { useState } from "react";
import { useCasinoStore } from "@/lib/store";
import { Shield, Bell, Lock, User, Eye, EyeOff, LogOut, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "responsible", label: "Responsible Gambling", icon: Shield },
];

export default function SettingsPage() {
  const { isLoggedIn, user, logout, setShowLoginModal, addNotification } = useCasinoStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(500);
  const [weeklyLimit, setWeeklyLimit] = useState(2000);
  const [sessionLimit, setSessionLimit] = useState(60);
  const [selfExclusion, setSelfExclusion] = useState("");
  const [coolingOff, setCoolingOff] = useState("");
  const [saved, setSaved] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Please log in to access settings</p>
          <button onClick={() => setShowLoginModal(true)} className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-xl">Login</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    addNotification("Settings saved successfully!", "success");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black">⚙️ Settings</h1>
          <p className="text-white/40 text-sm mt-0.5">Manage your account, security and responsible gambling preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-48 shrink-0 hidden md:block">
          <nav className="space-y-1">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    activeSection === s.id
                      ? "bg-brand-gold/10 border border-brand-gold/20 text-brand-gold"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-0 md:hidden w-full">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className={clsx("shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all", activeSection === s.id ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold" : "bg-white/5 border-white/10 text-white/50")}>{s.label}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeSection === "profile" && (
            <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
              <h2 className="font-bold mb-5">Profile Information</h2>
              <div className="space-y-4">
                {[
                  { label: "Username", value: user.username, type: "text" },
                  { label: "Email", value: user.email, type: "email" },
                  { label: "Phone", value: user.phone || "", type: "tel", placeholder: "Add phone number" },
                  { label: "Date of Birth", value: user.dateOfBirth || "", type: "date" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1.5 block">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold/50"
                    />
                  </div>
                ))}
                <button onClick={handleSave} className="bg-gold-gradient text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
                  {saved ? <CheckCircle className="w-4 h-4" /> : null}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-4">
              <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
                <h2 className="font-bold mb-4">Change Password</h2>
                <div className="space-y-3">
                  <div className="relative">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1.5 block">Current Password</label>
                    <input type={showPassword ? "text" : "password"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white pr-10 focus:outline-none focus:border-brand-gold/50" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-3 text-white/30 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1.5 block">New Password</label>
                    <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold/50" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1.5 block">Confirm New Password</label>
                    <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold/50" />
                  </div>
                  <button onClick={handleSave} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl transition-colors">Update Password</button>
                </div>
              </div>

              <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
                <h2 className="font-bold mb-2">Two-Factor Authentication</h2>
                <p className="text-sm text-white/40 mb-4">Add an extra layer of security to your account using Google Authenticator or SMS.</p>
                <button className="bg-green-900/20 border border-green-800/30 text-green-400 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-green-900/30 transition-colors">Enable 2FA</button>
              </div>

              <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
                <h2 className="font-bold mb-2">Active Sessions</h2>
                <p className="text-sm text-white/40 mb-4">You are currently logged in on 1 device.</p>
                <button onClick={logout} className="flex items-center gap-2 text-brand-red text-sm font-semibold hover:underline">
                  <LogOut className="w-4 h-4" />
                  Log Out All Devices
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
              <h2 className="font-bold mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Promotional emails", desc: "Bonuses, new games and special offers", default: true },
                  { label: "Deposit confirmations", desc: "Email when deposits are processed", default: true },
                  { label: "Withdrawal updates", desc: "Status updates on your withdrawals", default: true },
                  { label: "VIP rewards", desc: "Notifications about your VIP level and rewards", default: true },
                  { label: "Tournament alerts", desc: "Reminders when tournaments you've joined start", default: false },
                  { label: "Big win notifications", desc: "Celebrate your big wins with us", default: false },
                  { label: "SMS notifications", desc: "Important account alerts via SMS", default: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">{pref.label}</p>
                      <p className="text-xs text-white/30">{pref.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                      <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-gold" />
                    </label>
                  </div>
                ))}
                <button onClick={handleSave} className="bg-gold-gradient text-black font-bold px-5 py-2.5 rounded-xl mt-2">Save Preferences</button>
              </div>
            </div>
          )}

          {activeSection === "responsible" && (
            <div className="space-y-4">
              <div className="bg-amber-900/10 border border-amber-800/20 rounded-2xl p-4 flex gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-300 mb-1">Responsible Gambling Tools</p>
                  <p className="text-sm text-white/40">Use these tools to manage your gambling habits and keep it fun. Limits take effect immediately and can only be lowered, not raised, for 24–72 hours.</p>
                </div>
              </div>

              <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
                <h2 className="font-bold mb-4">Deposit Limits</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Daily Limit ($)", value: dailyLimit, onChange: setDailyLimit },
                    { label: "Weekly Limit ($)", value: weeklyLimit, onChange: setWeeklyLimit },
                    { label: "Session Limit (min)", value: sessionLimit, onChange: setSessionLimit },
                  ].map((limit) => (
                    <div key={limit.label}>
                      <label className="text-xs text-white/30 mb-1.5 block">{limit.label}</label>
                      <input
                        type="number"
                        value={limit.value}
                        onChange={(e) => limit.onChange(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold/50"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={handleSave} className="mt-4 bg-gold-gradient text-black font-bold px-5 py-2.5 rounded-xl text-sm">Apply Limits</button>
              </div>

              <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-5">
                <h2 className="font-bold mb-2">Cooling-Off Period</h2>
                <p className="text-sm text-white/40 mb-4">Take a short break from gambling. Your account will be restricted for this period.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {["24 hours", "1 week", "1 month", "3 months"].map((opt) => (
                    <button key={opt} onClick={() => setCoolingOff(opt)} className={clsx("px-3 py-1.5 rounded-xl text-sm border transition-all", coolingOff === opt ? "bg-amber-900/20 border-amber-800/30 text-amber-400" : "bg-white/5 border-white/10 text-white/50 hover:text-white")}>{opt}</button>
                  ))}
                </div>
                {coolingOff && (
                  <button onClick={() => { addNotification(`Cooling-off period of ${coolingOff} activated. Take care!`, "info"); setCoolingOff(""); }} className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    Activate {coolingOff} Break
                  </button>
                )}
              </div>

              <div className="bg-brand-dark-2 border border-brand-red/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h2 className="font-bold mb-2 text-brand-red">Self-Exclusion</h2>
                    <p className="text-sm text-white/40 mb-4">Permanently exclude yourself from our platform. This action is irreversible for the selected period and cannot be undone once confirmed.</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {["6 months", "1 year", "2 years", "Permanent"].map((opt) => (
                        <button key={opt} onClick={() => setSelfExclusion(opt)} className={clsx("px-3 py-1.5 rounded-xl text-sm border transition-all", selfExclusion === opt ? "bg-brand-red/20 border-brand-red/40 text-brand-red" : "bg-white/5 border-white/10 text-white/50 hover:text-white")}>{opt}</button>
                      ))}
                    </div>
                    {selfExclusion && (
                      <button className="bg-brand-red hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Self-Exclude for {selfExclusion}
                      </button>
                    )}
                    <p className="mt-3 text-xs text-white/30">If you need help, please contact <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">GamCare.org.uk</a> or <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">BeGambleAware.org</a>.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
