import React from "react";
import { FormatUGXCurrency } from "../../lib/helpers";

interface PlatformPayout {
  platform: string;
  rate: number;
}

interface PayoutTiersProps {
  platform_payouts?: PlatformPayout[];
}

export const PayoutTiers: React.FC<PayoutTiersProps> = ({
  platform_payouts = [],
}) => {
  return (
    <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
      {/* Header Label */}
      <h3 className="font-bold uppercase text-[10px] tracking-widest text-gray-500">
        Payout Tiers
      </h3>

      <div className="space-y-3">
        {platform_payouts.length > 0 ? (
          platform_payouts.map((p, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-teal-500/20 transition-colors"
            >
              {/* Platform Info */}
              <div className="flex items-center gap-3 font-bold text-sm text-white">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-black text-[10px]">
                  {p.platform[0]?.toUpperCase()}
                </div>
                <span className="capitalize">{p.platform}</span>
              </div>

              {/* Rate Value */}
              <span className="text-teal-400 font-black text-sm">
                {FormatUGXCurrency(p.rate)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-600 italic">
            No payout data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PayoutTiers;
