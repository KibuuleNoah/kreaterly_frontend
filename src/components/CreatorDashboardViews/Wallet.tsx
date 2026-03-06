import React, { useState } from "react";
import {
  IconWallet,
  IconLock,
  IconArrowUpRight,
  IconDeviceMobile,
  IconHistory,
  IconInfoCircle,
} from "@tabler/icons-react";
import { FormatUGXCurrency, MIN_WITHDRAWAL_UGX } from "../../lib/helpers";

const Wallet: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"MTN" | "Airtel">("MTN");
  const [isProcessing, setIsProcessing] = useState(false);
  const balance = 120000;

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700 pb-20 max-w-6xl mx-auto">
      {/* Header with Quick Actions */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-teal-500/30"></span> Financial
            Overview
          </p>
          <h1 className="text-5xl font-black text-white tracking-tighter">
            My Wallet<span className="text-teal-500">.</span>
          </h1>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white/10 transition-all">
          <IconHistory size={16} /> Transaction History
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Balances */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Card: Glassy Gradient */}
          <div className="group p-10 md:p-14 rounded-[48px] relative overflow-hidden bg-[#11141A] border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <IconWallet size={120} stroke={1} className="text-teal-400" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">
                  Available Now
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 pl-1">
                  Total Balance
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                  {FormatUGXCurrency(balance)}
                </h2>
              </div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
          </div>

          {/* Sub-stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#11141A]/50 backdrop-blur-md border border-white/[0.03] p-8 rounded-[40px] space-y-4 group">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  In Review
                </p>
                <IconLock
                  size={18}
                  className="text-gray-600 group-hover:text-amber-500 transition-colors"
                />
              </div>
              <p className="text-3xl font-black text-white tracking-tight">
                {FormatUGXCurrency(867999)}
              </p>
              <p className="text-[9px] text-gray-500 leading-relaxed border-t border-white/5 pt-4">
                Verification of campaign reach data active.{" "}
                <span className="text-teal-500 font-bold">ETA 4 Days.</span>
              </p>
            </div>

            <div className="bg-[#11141A]/50 backdrop-blur-md border border-white/[0.03] p-8 rounded-[40px] space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Lifetime Earnings
              </p>
              <p className="text-3xl font-black text-white tracking-tight">
                {FormatUGXCurrency(46778)}
              </p>
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <div className="p-1 bg-teal-500/20 rounded">
                  <IconArrowUpRight size={12} className="text-teal-400" />
                </div>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                  Growth Trend: +12%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Withdrawal Hub */}
        <div className="lg:col-span-5">
          <div className="bg-[#11141A] border border-white/10 p-8 md:p-10 rounded-[48px] space-y-8 shadow-3xl relative overflow-hidden">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Withdraw Funds
              </h3>
              <p className="text-xs text-gray-500">
                Secure payout to mobile money
              </p>
            </div>

            <div className="space-y-6">
              {/* Payment Methods */}
              <div className="grid grid-cols-2 gap-3">
                {(["MTN", "Airtel"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`relative overflow-hidden py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                      method === m
                        ? "border-teal-500 bg-teal-500/5"
                        : "border-white/5 bg-white/[0.02] grayscale opacity-60"
                    }`}
                  >
                    <IconDeviceMobile
                      size={20}
                      className={
                        method === m ? "text-teal-400" : "text-gray-500"
                      }
                    />
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${method === m ? "text-white" : "text-gray-500"}`}
                    >
                      {m} Money
                    </span>
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Amount (UGX)
                  </label>
                  <button
                    onClick={() => setAmount(balance.toString())}
                    className="text-[10px] font-black text-teal-500 uppercase tracking-widest hover:text-teal-400"
                  >
                    Maximize
                  </button>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/40 border border-white/5 rounded-3xl py-7 px-8 text-white font-black text-4xl tracking-tighter focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 outline-none transition-all placeholder:opacity-20"
                />
              </div>
            </div>

            {/* Final Calculation Table */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
                <span className="flex items-center gap-1">
                  Platform Fee <IconInfoCircle size={12} />
                </span>
                <span className="text-red-400/80">
                  -{FormatUGXCurrency(5000)}
                </span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Settlement Amount
                  </p>
                  <p className="text-white font-black text-4xl tracking-tighter">
                    {FormatUGXCurrency(
                      Number(amount) > 5000 ? Number(amount) - 5000 : 0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={Number(amount) < MIN_WITHDRAWAL_UGX || isProcessing}
              className="group w-full bg-teal-500 disabled:bg-zinc-800 text-black disabled:text-gray-600 font-black py-6 rounded-3xl text-lg uppercase tracking-tight shadow-xl shadow-teal-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  Withdraw Now{" "}
                  <IconArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 opacity-30">
              <IconLock size={12} className="text-teal-500" />
              <p className="text-[8px] text-white font-black uppercase tracking-[0.4em]">
                Encrypted Node: KLA-01
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
