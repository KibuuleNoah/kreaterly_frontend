
import React, { useState, useMemo } from 'react';
import CampaignCard from '../components/CampaignCard';
import { MOCK_CAMPAIGNS, formatCurrency } from '../constants';
import { CampaignCategory, Platform } from '../types';
import { IconFilter, IconSearch } from '@tabler/icons-react';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [minPayout, setMinPayout] = useState<number>(0);

  const filteredCampaigns = useMemo(() => {
    return MOCK_CAMPAIGNS.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.brandName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      const matchesPlatform = activePlatform === 'All' || c.platforms.includes(activePlatform as Platform);
      const matchesPayout = c.cpmUGX >= minPayout;
      
      return matchesSearch && matchesCategory && matchesPlatform && matchesPayout;
    });
  }, [searchTerm, activeCategory, activePlatform, minPayout]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActivePlatform('All');
    setMinPayout(0);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white selection:bg-teal-500/30 font-['Plus_Jakarta_Sans'] p-3 md:p-5">
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.2em]">Create. Earn. Grow.</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">Discover</h1>
          </div>
        </div>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          Connect with African brands and monetize your creativity with seamless UGX payouts.
        </p>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400">
              <IconSearch />
            </div>
            <input 
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#101217] border border-white/5 rounded-[24px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-600 font-medium shadow-xl shadow-black/20"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[15px] border transition-all font-bold text-sm btn-bubble ${showFilters ? 'bg-teal-500 text-black border-teal-500' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}`}
          >
            <IconFilter />
            <span>Refine</span>
          </button>
        </div>

        {/* Advanced Filter Panel */}
        {showFilters && (
          <div className="bg-[#101217] border border-white/10 rounded-[32px] p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Niche</label>
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-teal-500/50 text-sm"
              >
                <option value="All">All Niches</option>
                {Object.values(CampaignCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Platform</label>
              <select 
                value={activePlatform}
                onChange={(e) => setActivePlatform(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-teal-500/50 text-sm"
              >
                <option value="All">All Platforms</option>
                {Object.values(Platform).map(plat => <option key={plat} value={plat}>{plat}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Min. Rate</label>
              <div className="flex flex-col gap-4">
                <input 
                  type="range" 
                  min="0" 
                  max="15000" 
                  step="1000"
                  value={minPayout}
                  onChange={(e) => setMinPayout(parseInt(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-1.5 rounded-full bg-white/10"
                />
                <span className="text-[10px] font-bold text-teal-400">{minPayout > 0 ? formatCurrency(minPayout) : 'Any Payout'}</span>
              </div>
            </div>
            <div className="flex items-end">
              <button 
                onClick={resetFilters}
                className="w-full py-4 text-[10px] font-black text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors border border-dashed border-white/10 rounded-2xl btn-bubble"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        ) : (
          <div className="col-span-full py-32 text-center space-y-6">
            <span className="text-7xl opacity-20 block animate-bounce">🔎</span>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">No campaigns found</h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">We couldn't find any opportunities matching these filters.</p>
            </div>
            <button onClick={resetFilters} className="bg-teal-500/10 text-teal-500 font-black px-10 py-4 rounded-2xl border border-teal-500/20 text-sm hover:bg-teal-500 hover:text-black transition-all btn-bubble">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
