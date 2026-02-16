import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CAMPAIGNS } from '../constants';
import { Platform } from '../types';
import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from '@tabler/icons-react';

const CPM_CHART_DATA = [
  { name: 'Feb 6', cpm: 1 },
  { name: 'Feb 6 4:44 AM', cpm: 1 },
  { name: 'Feb 7', cpm: 1 },
];

const CampaignDetail: React.FC = () => {
  
  const campaign = MOCK_CAMPAIGNS[0];
  const [showSubmit, setShowSubmit] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!campaign) {
    return <div className="p-20 text-center text-white font-display text-2xl">Campaign Not Found</div>;
  }

  const budgetProgress = (campaign.paidOutUSD / campaign.totalBudgetUSD) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmissionLink('');
      setTimeout(() => setShowSubmit(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-white pb-20 space-y-12">
      {/* Header Info */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{campaign.title}</h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-4xl">{campaign.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
          <span className="bg-magenta-600/20 text-magenta-400 border border-magenta-500/30 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest bg-[#E91E63]/10 text-[#E91E63]">
            {campaign.type}
          </span>
          <span className="bg-magenta-600/20 text-magenta-400 border border-magenta-500/30 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest bg-[#E91E63]/10 text-[#E91E63]">
            {campaign.category}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-white">{campaign.cpmUSD} / 1k views</span>
          <span className="text-gray-500">•</span>
          <div className="flex gap-2">
            <IconBrandTiktok />
            <IconBrandInstagram />
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">Avg review time: <span className="text-green-500">{campaign.avgReviewTime}</span></span>
          <span className="text-gray-500">•</span>
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs">{campaign.approvalRate}% Approval Rate</span>
        </div>
      </div>

      {/* Main Campaign Image */}
      <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <img src={campaign.image} className="w-full h-[500px] object-cover" alt="Campaign Banner" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 space-y-12">
          
          {/* Campaign Overview Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Campaign Details</h2>
            
            <div className="space-y-4">
              {/* Budget Card */}
              <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Budget Remaining</p>
                  <h3 className="text-4xl font-black">${(campaign.totalBudgetUSD - campaign.paidOutUSD).toLocaleString()}k</h3>
                  <p className="text-xs text-gray-400">Paid Out: ${campaign.paidOutUSD} / ${campaign.totalBudgetUSD / 1000}k</p>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500/40" style={{ width: `${budgetProgress}%` }}></div>
                </div>
              </div>

              {/* Detail List */}
              <div className="bg-[#11141A] border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
                <div className="flex justify-between items-center p-6">
                  <span className="text-sm text-gray-400">Category</span>
                  <span className="text-sm font-bold">{campaign.category}</span>
                </div>
                <div className="flex justify-between items-center p-6">
                  <span className="text-sm text-gray-400">Platforms</span>
                  <div className="flex gap-2"><IconBrandTiktok /><IconBrandInstagram /></div>
                </div>
                <div className="flex justify-between items-center p-6">
                  <span className="text-sm text-gray-400">Last Updated</span>
                  <span className="text-sm font-bold">{campaign.lastUpdated}</span>
                </div>
                <div className="flex justify-between items-center p-6">
                  <span className="text-sm text-gray-400">Launched on</span>
                  <span className="text-sm font-bold text-gray-500">{campaign.launchedOn}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={() => setShowSubmit(!showSubmit)}
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F1C40F] to-[#D4AF37] text-black font-black py-5 rounded-xl text-lg uppercase shadow-2xl hover:brightness-110 active:scale-95 transition-all"
              >
                Submit Video
              </button>
              
              {showSubmit && (
                <div className="p-8 bg-[#151921] border border-teal-500/20 rounded-3xl animate-in slide-in-from-top-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      required 
                      type="url" 
                      placeholder="Paste your video link here (TikTok or Instagram)"
                      value={submissionLink}
                      onChange={e => setSubmissionLink(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-teal-500"
                    />
                    <button className="w-full bg-teal-500 text-black font-black py-4 rounded-xl uppercase tracking-widest text-sm">
                      {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                    </button>
                    {submitSuccess && <p className="text-teal-400 text-center text-xs font-bold animate-pulse">✓ Submission received. Monitoring stats...</p>}
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Requirements</h2>
            <p className="text-xl font-bold">{campaign.requirementsText}</p>
          </div>

          {/* Payouts */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Payouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaign.platformPayouts.map(p => (
                <div key={p.platform} className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
                  <div className="flex items-center gap-3">
                    {p.platform === Platform.TIKTOK ? <IconBrandTiktok /> : <IconBrandInstagram />}
                    <h4 className="text-xl font-bold">{p.platform}</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-black text-white">{p.rate}</p>
                    <div className="flex justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
                      <div>
                        <p className="uppercase text-[9px] mb-1">Min. payout</p>
                        <p className="text-white font-bold">{p.minPayout}</p>
                      </div>
                      <div className="text-right">
                        <p className="uppercase text-[9px] mb-1">Max. payout</p>
                        <p className="text-white font-bold">{p.maxPayout}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Links */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Content Links</h2>
            <div className="bg-[#11141A] border border-white/5 p-6 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-500"><IconBrandYoutube /></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white mb-1">Campaign Requirements</h4>
                <p className="text-blue-400 text-xs truncate hover:underline cursor-pointer">https://docs.google.com/document/d/1poTey4xJWtQUVjHGLrMuUKCzFg0q7hCESu4Vvi7xO2k/edit?usp=sharing</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">FAQs</h2>
            <div className="space-y-4">
              {campaign.faqs.map((faq, i) => (
                <div key={i} className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-3">
                  <h4 className="text-xl font-bold text-white">{faq.question}</h4>
                  <p className="text-gray-400 text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Videos */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-2">
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500">Top Performing Videos</h2>
              <span className="text-gray-400 text-[10px] font-bold">Get inspired by what's going viral</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {campaign.topVideos.map((video, idx) => (
                <div key={video.id} className="bg-[#11141A] border border-white/5 rounded-3xl overflow-hidden flex flex-col group">
                  <div className="h-48 relative overflow-hidden bg-black/50">
                    <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={video.title} />
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/80 border border-white/20 flex items-center justify-center font-black text-xs text-orange-500">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <h4 className="font-bold text-white line-clamp-2 min-h-[3rem]">{video.title}</h4>
                    <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
                      <div className="text-center">
                        <p className="text-gray-600 mb-1">Views</p>
                        <p className="text-white">{video.views}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 mb-1">Est. Payout</p>
                        <p className="text-white">{video.payout}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={video.creatorAvatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-white truncate leading-none">{video.creatorName}</p>
                        <p className="text-[8px] text-gray-500 font-bold truncate mt-1">{video.creatorHandle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CPM History Chart */}
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500">CPM History</h2>
               <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                 <button className="px-3 py-1.5 text-[10px] font-black text-yellow-500 bg-yellow-500/10 rounded-lg">CPM</button>
                 <button className="px-3 py-1.5 text-[10px] font-black text-gray-500">Min Payout</button>
                 <button className="px-3 py-1.5 text-[10px] font-black text-gray-500">Max Payout</button>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                 👁️ Show My Submissions
               </button>
             </div>
             
             <div className="bg-[#11141A] border border-white/5 p-10 rounded-3xl h-[400px] min-h-0 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CPM_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorCpm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F1C40F" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#F1C40F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} domain={[0.8, 1.2]} tickFormatter={(val) => `${val}`} label={{ value: 'CPM ($)', angle: -90, position: 'insideLeft', offset: 10, fill: '#6b7280', fontSize: 10, fontWeight: 900 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#11141A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                      itemStyle={{ color: '#F1C40F' }}
                    />
                    <Area type="stepAfter" dataKey="cpm" stroke="#F1C40F" strokeWidth={3} fillOpacity={1} fill="url(#colorCpm)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(241,196,15,0.6)]"></div>
                    <span className="text-[10px] font-black uppercase text-gray-500">All Platforms</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
