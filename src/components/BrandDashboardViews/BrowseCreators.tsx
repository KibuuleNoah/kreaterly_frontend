
import React, { useState, useMemo } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { IconFilter, IconTikTok, IconInstagram, IconYouTube, IconPlus } from '../components/Icons';
import { Creator, Platform } from '../types';

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'Nasser Ndugwa',
    bio: 'Multi-disciplinary digital storyteller specializing in high-fidelity travel and fashion content. Based in Kampala, reaching the world.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    country: '🇺🇬 Uganda',
    interests: ['Beauty', 'Fashion', 'Travel', 'Sport', 'Outdoor'],
    stats: {
      tiktok: { handle: '@nasser_tt', followers: '415.2k', engagement: '11.5%', avgViews: '639.1k' },
      instagram: { handle: '@nasser_ig', followers: '13.4k', engagement: '12.3%', avgViews: '7.7k' }
    },
    contentGallery: [
      'https://images.unsplash.com/photo-1529139572744-b1540a799c42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523910088395-d7457f8ee315?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 'c2',
    name: 'Nayebare Winnie',
    bio: 'Professional lifestyle creator and mother. Sharing authentic experiences about parenting, business, and beauty in East Africa.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    country: '🇺🇬 Uganda',
    interests: ['Beauty', 'Fashion', 'Parenting', 'Business'],
    stats: {
      tiktok: { handle: '@winnie_suc', followers: '204.3k', engagement: '8.6%', avgViews: '183.1k' },
      instagram: { handle: '@winnie_gram', followers: '30.4k', engagement: '7.8%', avgViews: '3.8k' }
    },
    contentGallery: [
      'https://images.unsplash.com/photo-1523910088395-d7457f8ee315?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 'c3',
    name: 'Sean Offixial',
    bio: 'Tech enthusiast and fashion forward. I build bridges between modern technology and African creative culture through high-impact visuals.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    country: '🇺🇬 Uganda',
    interests: ['Fashion', 'Technology', 'Outdoor', 'Business'],
    stats: {
      tiktok: { handle: '@sean_off', followers: '435.8k', engagement: '11.1%', avgViews: '78.7k' },
      instagram: { handle: '@sean_gram', followers: '47.1k', engagement: '8.0%', avgViews: '30.2k' }
    },
    contentGallery: [
      'https://images.unsplash.com/photo-1526080652727-5b77f74e9290?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80',
    ]
  }
];

const ALL_INTERESTS = Array.from(new Set(MOCK_CREATORS.flatMap(c => c.interests))).sort();

const BrowseCreators: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState<number>(0);
  const [minEngagement, setMinEngagement] = useState<number>(0);
  const [activePlatform, setActivePlatform] = useState<Platform | 'All'>('All');
  
  const navigate = useNavigate();

  const parseMetric = (val: string) => {
    const num = parseFloat(val.replace(/[^\d.]/g, ''));
    if (val.toLowerCase().includes('k')) return num * 1000;
    if (val.toLowerCase().includes('m')) return num * 1000000;
    return num;
  };

  /**
   * BACKEND DEVELOPER NOTE:
   * Currently, this filtering is client-side.
   * PRODUCTION RECOMMENDATION:
   * 1. Use Elasticsearch or Algolia for high-performance 'MatchesSearch' (Autocomplete).
   * 2. For range filters (Followers/Engagement), ensure your SQL/NoSQL DB has GIN/B-Tree indices on these numeric fields.
   * 3. API Request: GET /api/v1/creators?min_followers=10000&interests=tech,fashion&platform=tiktok
   * 4. Use server-side pagination (limit/offset) to prevent fetching all creators at once.
   */
  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(search.toLowerCase()) || 
                          creator.stats.tiktok.handle.toLowerCase().includes(search.toLowerCase());
      
      const matchesInterests = selectedInterests.length === 0 || 
                             selectedInterests.some(interest => creator.interests.includes(interest));

      const totalFollowers = parseMetric(creator.stats.tiktok.followers) + parseMetric(creator.stats.instagram.followers);
      const matchesFollowers = totalFollowers >= minFollowers;

      const avgEngagement = (parseFloat(creator.stats.tiktok.engagement) + parseFloat(creator.stats.instagram.engagement)) / 2;
      const matchesEngagement = avgEngagement >= minEngagement;

      const matchesPlatform = activePlatform === 'All' || 
                             (activePlatform === Platform.TIKTOK && parseMetric(creator.stats.tiktok.followers) > 0) ||
                             (activePlatform === Platform.INSTAGRAM && parseMetric(creator.stats.instagram.followers) > 0);

      return matchesSearch && matchesInterests && matchesFollowers && matchesEngagement && matchesPlatform;
    });
  }, [search, selectedInterests, minFollowers, minEngagement, activePlatform]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedInterests([]);
    setMinFollowers(0);
    setMinEngagement(0);
    setActivePlatform('All');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">Creator Node Discovery</p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display">Talent Hub</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest btn-bubble ${showFilters ? 'bg-teal-500 text-black border-teal-500' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}`}
            >
              <IconFilter />
              <span>{showFilters ? 'Close Filters' : 'Refine Results'}</span>
            </button>
            <button className="bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-white/10 transition-all">
              Shortlisted (0)
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder="Search by name, handle, or expertise..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#11141A] border border-white/5 rounded-[28px] py-6 pl-16 pr-8 text-white focus:outline-none focus:border-teal-500/50 transition-all font-bold text-lg shadow-2xl"
          />
        </div>

        {showFilters && (
          <div className="bg-[#11141A] border border-white/10 rounded-[40px] p-8 md:p-12 space-y-10 animate-in slide-in-from-top-4 duration-500 shadow-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Target Niche</label>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{selectedInterests.length} Filtered</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_INTERESTS.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${
                        selectedInterests.includes(interest)
                          ? 'bg-teal-500 text-black border-teal-500 shadow-lg shadow-teal-500/20'
                          : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Primary Platform</label>
                  <div className="flex gap-2">
                    {['All', Platform.TIKTOK, Platform.INSTAGRAM].map(p => (
                      <button 
                        key={p}
                        onClick={() => setActivePlatform(p as any)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activePlatform === p ? 'bg-teal-500 text-black border-teal-500' : 'bg-white/5 text-gray-500 border-white/5'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Minimum Followers (Combined)</label>
                    <span className="text-lg font-black text-white tracking-tighter">
                      {minFollowers >= 1000000 ? `${(minFollowers / 1000000).toFixed(1)}M+` : `${(minFollowers / 1000).toFixed(0)}k+`}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000000" 
                    step="5000"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-2 rounded-full bg-white/10"
                  />
                  <div className="flex justify-between text-[9px] font-black text-gray-700 uppercase">
                    <span>Low Reach</span>
                    <span>High Velocity</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Min. Engagement Index</label>
                    <span className="text-lg font-black text-white tracking-tighter">{minEngagement}%+</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="0.5"
                    value={minEngagement}
                    onChange={(e) => setMinEngagement(parseFloat(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-2 rounded-full bg-white/10"
                  />
                  <div className="flex justify-between text-[9px] font-black text-gray-700 uppercase">
                    <span>Passive</span>
                    <span>Viral Intent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">
                Scanned {filteredCreators.length} potential talent nodes
              </p>
              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={resetFilters}
                  className="flex-1 sm:flex-none px-10 py-4 text-[10px] font-black text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors border border-dashed border-white/10 rounded-2xl"
                >
                  Clear Protocols
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 sm:flex-none bg-teal-500 text-black font-black px-12 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
                >
                  Synchronize
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCreators.length > 0 ? (
          filteredCreators.map((creator) => (
            <div 
              key={creator.id} 
              onClick={() => navigate(`/creator/${creator.id}`)}
              className="group bg-[#11141A] border border-white/5 rounded-[40px] p-6 hover:border-teal-500/20 hover:bg-[#141921] transition-all duration-500 shadow-2xl flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img src={creator.avatar} className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" alt={creator.name} />
                  <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-lg px-1.5 py-0.5 border border-[#0A0B0E] text-[7px] font-black text-black">
                    {creator.country.split(' ')[0]}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white tracking-tight leading-none mb-1 uppercase font-display">{creator.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="scale-75 text-gray-500"><IconTikTok /></span>
                      <span className="text-[10px] font-black text-gray-400 uppercase">{creator.stats.tiktok.followers}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2">Engagement</p>
                  <p className="text-sm font-black text-teal-400">{creator.stats.tiktok.engagement}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2">Avg. Views</p>
                  <p className="text-sm font-black text-white">{creator.stats.tiktok.avgViews}</p>
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest pl-1">Primary Niches</p>
                <div className="flex flex-wrap gap-1.5">
                  {creator.interests.slice(0, 3).map((int, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-tight border border-white/5 group-hover:text-white transition-all">
                      {int}
                    </span>
                  ))}
                  {creator.interests.length > 3 && (
                    <span className="text-[9px] font-black text-gray-600">+{creator.interests.length - 3}</span>
                  )}
                </div>
              </div>

              <button 
                className="w-full mt-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/creator/${creator.id}`);
                }}
              >
                View Full Node Profile
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-40 text-center space-y-6">
            <span className="text-7xl opacity-20 block animate-bounce">👤</span>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase font-display">No talent nodes found</h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">Try broadening your parameters. The high-velocity creator pool is constantly shifting.</p>
            </div>
            <button onClick={resetFilters} className="bg-teal-500/10 text-teal-500 font-black px-12 py-4 rounded-2xl border border-teal-500/20 text-[10px] uppercase tracking-widest hover:bg-teal-500 hover:text-black transition-all">Reset All Protocols</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCreators;
