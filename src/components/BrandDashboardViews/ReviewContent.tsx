
import React, { useState } from 'react';

const MOCK_SUBMISSIONS = [
  { id: 1, creator: 'Nasser Ndugwa', campaign: 'Airtel 5G Revolution', thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', status: 'Pending', type: 'TikTok Video' },
  { id: 2, creator: 'Nayebare Winnie', campaign: 'Mumford Clipping', thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300', status: 'Action Required', type: 'IG Reel' },
  { id: 3, creator: 'Sean Offixial', campaign: 'KFC Zinger', thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', status: 'Approved', type: 'UGC' },
];

const ReviewContent: React.FC = () => {
  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-teal-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Submission Pipeline</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-none">Review Queue</h1>
          <p className="text-gray-500 text-sm md:text-lg font-medium max-w-xl">Verify campaign content matches the brief before releasing treasury funds.</p>
        </div>
        <div className="flex bg-white/5 p-1.5 rounded-xl md:rounded-2xl border border-white/5">
          <button className="px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[11px] font-black text-black bg-teal-500 rounded-lg md:rounded-xl shadow-lg uppercase tracking-widest">To Do (12)</button>
          <button className="px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[11px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest">History</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {MOCK_SUBMISSIONS.map(sub => (
          <div key={sub.id} className="bg-[#11141A] border border-white/5 rounded-3xl md:rounded-[48px] overflow-hidden group hover:border-teal-500/20 transition-all shadow-3xl flex flex-col">
            <div className="h-56 md:h-64 relative bg-black/40">
              <img src={sub.thumbnail} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" alt="" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl md:text-2xl shadow-2xl">▶</div>
              </div>
              <div className="absolute top-4 md:top-6 left-4 md:left-6">
                <span className={`px-2.5 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest ${
                  sub.status === 'Pending' ? 'bg-amber-500 text-black' : 
                  sub.status === 'Approved' ? 'bg-teal-500 text-black' : 'bg-red-500 text-white'
                }`}>
                  {sub.status}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-4 md:space-y-6 flex-1 flex flex-col">
              <div className="space-y-1 min-w-0">
                <p className="text-[9px] md:text-[10px] font-black text-teal-500 uppercase tracking-widest leading-none truncate">{sub.campaign}</p>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight font-display leading-tight truncate">{sub.creator}</h3>
                <p className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">{sub.type}</p>
              </div>
              
              <div className="pt-4 md:pt-6 border-t border-white/5 grid grid-cols-2 gap-3 mt-auto">
                <button className="py-3 md:py-4 bg-red-500/10 border border-red-500/20 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Reject</button>
                <button className="py-3 md:py-4 bg-teal-500 text-black rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all">Approve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewContent;
