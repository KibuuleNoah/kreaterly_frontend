import React from 'react';
import type { KPI } from '../types';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';







const KPICard: React.FC<KPI> = ({ label, value, change, isPositive } ) => {
  return (
    <div className="rounded-xl bg-[#0D1117] border border-white/5 p-6 shadow-sm hover:border-white/10 transition-colors">
      {/* Header: Label & Trend Icon */}
      <div className="flex justify-between items-start mb-4">
          <span className="text-gray-400 text-sm font-medium">{label}</span>
          <div className={`p-1.5 rounded-lg ${isPositive ? 'bg-teal-500/10 text-teal-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {isPositive ? <IconTrendingUp size={18} /> : <IconTrendingDown size={18} />}
          </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-bold text-white tracking-tight">
              {value}
          </h3>
          <span className={`text-xs font-semibold ${isPositive ? 'text-teal-400' : 'text-rose-400'}`}>
              {isPositive ? '+' : ''}{change}%
          </span>
      </div>

      {/* Decorative Sparkline (optional) */}
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
              className={`h-full rounded-full ${isPositive ? 'bg-teal-500' : 'bg-rose-500'}`} 
              style={{ width: `${Math.abs(change * 4)}%`, maxWidth: '100%' }}
          />
      </div>
  </div>
  );
};

export default KPICard;
