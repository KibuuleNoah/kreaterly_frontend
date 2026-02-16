
import React from 'react';
import { IconTikTok, IconInstagram, IconYouTube, IconX } from '../components/Icons';

const Socials: React.FC = () => {
  return (
    <div className="space-y-8 md:space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Socials</h1>
        <p className="text-gray-500 text-sm md:text-base font-medium">Link your platforms to enable AI performance tracking.</p>
      </header>

      <div className="bg-[#101217] border border-white/5 p-6 md:p-10 rounded-[32px] md:rounded-[48px] space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Connections</h3>
            <p className="text-gray-500 text-xs md:text-sm font-medium">Verify your handles to qualify for high-budget campaigns.</p>
          </div>
          <button className="bg-white/5 hover:bg-teal-500 hover:text-black border border-white/10 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all">
            Link New Platform
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'TikTok', icon: <IconTikTok />, handle: '@kigozi_vibes', views: '2.4M', status: 'Connected', color: 'bg-[#000000]' },
            { name: 'Instagram', icon: <IconInstagram />, handle: '@kigozi_john', views: '840K', status: 'Connected', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
            { name: 'YouTube', icon: <IconYouTube />, handle: null, views: null, status: 'Not Connected', color: 'bg-[#FF0000]' },
            { name: 'X / Twitter', icon: <IconX />, handle: '@kigozi_j', views: '120K', status: 'Connected', color: 'bg-[#000000]' }
          ].map((plat) => (
            <div key={plat.name} className={`group bg-[#0A0B0E] border ${plat.handle ? 'border-teal-500/20 shadow-lg shadow-teal-500/5' : 'border-white/5 opacity-60'} p-6 rounded-[28px] flex items-center justify-between transition-all hover:border-teal-500/40`}>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${plat.color} rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-2xl`}>
                  {plat.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-black text-white text-lg tracking-tight">{plat.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    {plat.handle ? `${plat.handle} • ${plat.views} views` : plat.status}
                  </p>
                </div>
              </div>
              {plat.handle ? (
                <button className="text-xs font-black text-red-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Unlink</button>
              ) : (
                <button className="text-xs font-black text-teal-500 uppercase tracking-widest">Connect</button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-teal-500/5 border border-teal-500/10 p-6 rounded-[28px] flex items-start gap-4">
          <span className="text-xl mt-1">💡</span>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Linking accounts enables <span className="text-white font-bold">Kreaterly AI</span> to confirm your reach. Funds are typically held for <span className="text-white font-bold">4 days</span> post-campaign to verify analytics accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Socials;
