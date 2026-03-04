import type React from "react";

export const AnalyticTile: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="bg-[#11141A] border border-white/5 p-5 rounded-3xl hover:border-white/10 transition-colors">
    <div className="text-gray-500 mb-3">{icon}</div>
    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
      {label}
    </p>
    <p className="text-sm font-bold text-white uppercase tracking-tighter">
      {value}
    </p>
  </div>
);
