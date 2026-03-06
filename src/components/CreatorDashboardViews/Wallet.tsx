import React, { useState } from "react";
import { FormatUGXCurrency, MIN_WITHDRAWAL_UGX } from "../../lib/helpers";

const Wallet: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  // const [recipientPhone, setRecipientPhone] = useState<string>('0772 123 456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const balance = 120000;

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setAmount("");
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="space-y-2">
        <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">
          Earnings Hub
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          My Wallet
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 md:p-12 rounded-[48px] shadow-2xl relative overflow-hidden bg-gradient-to-br  from-teal-500 to-emerald-700">
            <div className="relative z-10 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/50">
                Current Balance
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tighter break-all">
                {FormatUGXCurrency(balance)}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#101217] border border-white/5 p-6 md:p-8 rounded-[40px] space-y-4">
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  In Review
                </p>
                <p className="text-2xl font-black text-white tracking-tight">
                  {FormatUGXCurrency(867999)}
                </p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-teal-500 text-[9px] font-black uppercase tracking-widest">
                  4-Day Hold Active
                </p>
                <p className="text-[9px] text-gray-600 mt-1 leading-relaxed">
                  Verification of campaign reach data in progress.
                </p>
              </div>
            </div>
            <div className="bg-[#101217] border border-white/5 p-6 md:p-8 rounded-[40px] space-y-4 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">
                  Lifetime Income
                </p>
                <p className="text-2xl font-black text-white tracking-tight">
                  {FormatUGXCurrency(46778)}
                </p>
              </div>
              <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest">
                Total Earned Since Joining
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#101217] border border-white/5 p-8 md:p-10 rounded-[48px] space-y-8 shadow-3xl">
            <h3 className="text-2xl font-black text-white tracking-tight">
              Withdrawal Hub
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">
                  Payment Method
                </label>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                    MTN MoMo
                  </button>
                  <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                    Airtel Money
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">
                  Amount (UGX)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/40 border border-white/10 rounded-[28px] py-6 px-8 text-white font-black text-3xl tracking-tighter focus:border-teal-500/50 focus:outline-none transition-all"
                />
                <div className="flex justify-between items-center px-1">
                  <p className="text-[9px] font-black text-gray-600 uppercase">
                    Min: {FormatUGXCurrency(MIN_WITHDRAWAL_UGX)}
                  </p>
                  <button
                    onClick={() => setAmount(balance.toString())}
                    className="text-[9px] font-black text-teal-500 uppercase tracking-widest hover:underline"
                  >
                    Use Max
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 space-y-3">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Fee 20%</span>
                <span className="text-red-400">-{FormatUGXCurrency(5000)}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    Final Total
                  </p>
                  <p className="text-white font-black text-3xl tracking-tighter">
                    {FormatUGXCurrency(50000)}
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={true}
              onClick={handleAction}
              className="w-full bg-teal-500 text-black font-black py-6 rounded-[28px] text-lg uppercase tracking-tighter shadow-xl transition-all active:scale-95 disabled:opacity-10"
            >
              {isProcessing ? "Processing..." : "Withdraw UGX"}
            </button>

            <p className="text-center text-[8px] text-gray-700 font-black uppercase tracking-[0.4em]">
              Encrypted Kampala Cluster Gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
