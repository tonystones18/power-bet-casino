"use client";

import { useState } from "react";
import { useCasinoStore } from "@/lib/store";
import { PAYMENT_METHODS } from "@/lib/data";
import { ArrowUpRight, ArrowDownLeft, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";

type Mode = "deposit" | "withdraw";

const AMOUNTS = [20, 50, 100, 250, 500, 1000];

export default function DepositPage() {
  const [mode, setMode] = useState<Mode>("deposit");
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const { isLoggedIn, user, updateBalance, setShowLoginModal, addNotification } = useCasinoStore();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Please log in to deposit or withdraw</p>
          <button onClick={() => setShowLoginModal(true)} className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-xl">Login</button>
        </div>
      </div>
    );
  }

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;
  const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod)!;

  const handleConfirm = () => {
    if (isNaN(finalAmount) || finalAmount <= 0) return;
    if (mode === "deposit") {
      updateBalance(user.balance + finalAmount);
      addNotification(`$${finalAmount} deposited successfully!`, "success");
    } else {
      if (finalAmount > user.balance) {
        addNotification("Insufficient balance for this withdrawal.", "error");
        return;
      }
      updateBalance(user.balance - finalAmount);
      addNotification(`Withdrawal of $${finalAmount} requested. Processing in 1-24h.`, "info");
    }
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-black">💳 Cashier</h1>
          <p className="text-white/40 text-sm mt-0.5">Deposit and withdraw funds securely</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-6">
        {step === "success" ? (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-2">{mode === "deposit" ? "Deposit Successful!" : "Withdrawal Requested!"}</h2>
            <p className="text-white/40 mb-2">
              {mode === "deposit"
                ? `$${finalAmount} has been added to your balance.`
                : `Your withdrawal of $${finalAmount} is being processed.`}
            </p>
            <p className="text-white/20 text-sm mb-8">New balance: <strong className="text-white">${user.balance.toFixed(2)}</strong></p>
            <button onClick={() => { setStep("select"); setCustomAmount(""); }} className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-xl">
              {mode === "deposit" ? "Make Another Deposit" : "Back to Cashier"}
            </button>
          </div>
        ) : (
          <>
            {/* Mode toggle */}
            <div className="flex p-1 bg-brand-dark-2 rounded-xl border border-white/5 mb-6">
              {(["deposit", "withdraw"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={clsx(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize",
                    mode === m ? "bg-white/10 text-white shadow" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {m === "deposit" ? <ArrowDownLeft className="w-4 h-4 text-green-400" /> : <ArrowUpRight className="w-4 h-4 text-blue-400" />}
                  {m}
                </button>
              ))}
            </div>

            {/* Balance */}
            <div className="bg-brand-dark-2 border border-white/5 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
              <span className="text-sm text-white/40">Current Balance</span>
              <span className="font-black text-brand-gold text-lg">${user.balance.toFixed(2)}</span>
            </div>

            {/* Payment method */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedMethod(pm.id)}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                      selectedMethod === pm.id
                        ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                        : "bg-white/3 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    <div>
                      <p className="text-xs font-bold">{pm.name}</p>
                      <p className="text-[10px] text-white/30">{pm.processingTime}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Amount</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAmount(a); setCustomAmount(""); }}
                    className={clsx(
                      "py-2.5 rounded-xl text-sm font-bold border transition-all",
                      amount === a && !customAmount
                        ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
                        : "bg-white/3 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    )}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50"
                />
              </div>
              {method && (
                <p className="text-xs text-white/30 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Min {mode === "deposit" ? "deposit" : "withdrawal"}: ${method.minDeposit} · Max: ${method.maxDeposit}
                </p>
              )}
            </div>

            {/* Bonus banner for deposits */}
            {mode === "deposit" && (
              <div className="bg-green-900/20 border border-green-800/30 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
                <span className="text-green-400 text-lg">🎁</span>
                <div>
                  <p className="text-sm font-semibold text-green-300">100% Match Bonus</p>
                  <p className="text-xs text-white/40">Your first deposit is matched 100% up to $1,000. 35x wagering applies.</p>
                </div>
              </div>
            )}

            {mode === "withdraw" && (
              <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-white/40">Withdrawals are subject to identity verification. Please ensure your account is verified before requesting a withdrawal.</p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleConfirm}
              disabled={!finalAmount || finalAmount <= 0}
              className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl text-base hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {mode === "deposit" ? `Deposit $${finalAmount || "—"}` : `Withdraw $${finalAmount || "—"}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
