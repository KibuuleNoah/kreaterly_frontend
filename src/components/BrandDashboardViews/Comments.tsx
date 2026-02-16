import { IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react';
import React from 'react';

const MOCK_COMMENTS = [
  { id: 1, creator: 'Nasser Ndugwa', platform: 'TikTok', text: 'Where can I get this 5G router in Entebbe?', user: '@steve_ug', time: '12m ago', sentiment: 'Positive' },
  { id: 2, creator: 'Sean Offixial', platform: 'Instagram', text: 'Is the Zinger burger available in Mbarara?', user: '@grace_k', time: '45m ago', sentiment: 'Neutral' },
  { id: 3, creator: 'Nayebare Winnie', platform: 'TikTok', text: 'The speed in Gulu is actually amazing!', user: '@opiyo_tech', time: '2h ago', sentiment: 'Positive' },
];

const Comments: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="space-y-2">
        <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">Engagement Hub</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display">Social Monitoring</h1>
        <p className="text-gray-500 text-lg font-medium">Monitor and reply to conversations on your creator campaigns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Filtering & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#11141A] p-8 rounded-[40px] border border-white/5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white tracking-tight">Sentiments</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase">Positive</span>
                  <span className="text-teal-400 font-black">78%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-teal-500" />
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 space-y-4">
              <h3 className="text-xl font-black text-white tracking-tight">Platforms</h3>
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex flex-col items-center gap-2">
                  <IconBrandTiktok />
                  <span className="text-[9px] font-black uppercase text-teal-400">1.2k Comments</span>
                </button>
                <button className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center gap-2 grayscale opacity-50">
                  <IconBrandInstagram />
                  <span className="text-[9px] font-black uppercase text-gray-500">430 Comments</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Comments Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xl font-black text-white tracking-tight">Recent Activity</h3>
            <button className="text-teal-500 text-[10px] font-black uppercase tracking-widest">View All Insights →</button>
          </div>

          <div className="space-y-4">
            {MOCK_COMMENTS.map(comment => (
              <div key={comment.id} className="bg-[#11141A] border border-white/5 p-8 rounded-[40px] hover:border-teal-500/20 transition-all group flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-teal-500"><IconBrandTiktok /></span>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      On <span className="text-white">{comment.creator}'s</span> post • {comment.time}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-white flex items-center gap-2">
                      <span className="text-teal-400">{comment.user}:</span>
                      {comment.text}
                    </p>
                    <div className="inline-block px-3 py-1 bg-teal-500/10 rounded-lg text-[9px] font-black text-teal-500 uppercase tracking-widest">
                      Sentiment: {comment.sentiment}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Ignore</button>
                  <button className="px-6 py-3 bg-teal-500 text-black rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
