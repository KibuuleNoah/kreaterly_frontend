import React from 'react';
import type { Campaign} from '../types';
import { Platform } from '../types';
import { formatCurrency } from '../constants';
import { Icon } from './Icons';

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  switch (platform) {
    case Platform.TIKTOK: return <Icon />;
    case Platform.INSTAGRAM: return <Icon />;
    case Platform.YOUTUBE: return <Icon />;
    case Platform.TWITTER: return <Icon />;
    default: return null;
  }
};

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const progress = (campaign.paidOutUGX / campaign.totalBudgetUGX) * 100;

  return (
    <div 
      className="group bg-[#11141A] border border-white/[0.04] rounded-[32px] overflow-hidden hover:border-teal-500/20 hover:bg-[#151921] transition-all duration-500 flex flex-col shadow-2xl relative active:scale-[0.98]"
    >
      {/* Reduced Height Cover */}
      <div className="h-36 relative overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-[#11141A]/20 to-transparent" />
        
        {/* Verification Badge Over Image */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-teal-500 text-black text-[7px] font-black uppercase px-2 py-0.5 rounded-md tracking-widest shadow-xl">
            {campaign.type}
          </span>
          {campaign.isVerified && (
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-md tracking-widest">
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 -mt-8 relative z-10 space-y-3">
        {/* Brand Meta */}
        <div className="flex items-end gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#11141A] bg-black shadow-2xl">
            <img src={campaign.brandLogo} alt={campaign.brandName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest leading-none">{campaign.brandName}</p>
            <h3 className="text-base font-black text-white tracking-tight leading-tight line-clamp-1">{campaign.title}</h3>
          </div>
        </div>

        {/* Tightened Financial Panel */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
          <div>
            <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Payout / 1k</p>
            <p className="text-xs font-black text-white tracking-tighter">{formatCurrency(campaign.cpmUGX)}</p>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Nodes</p>
            <div className="flex justify-end gap-1 opacity-50">
              {campaign.platforms.map(p => <div key={p} className="scale-50 -mr-1"><PlatformIcon platform={p} /></div>)}
            </div>
          </div>
        </div>

        {/* Progress System */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-widest text-gray-600">
            <span>Utilization</span>
            <span className={progress > 80 ? 'text-red-500' : 'text-teal-500'}>{Math.round(progress)}% Filled</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${progress > 80 ? 'bg-red-500' : 'bg-teal-500'}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
