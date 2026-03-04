import React from "react";
import CampaignCard from "../CampaignCard";

const Campaigns: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="relative h-[300px] md:h-[400px] rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Background Visual */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-purple-600/20 z-0"></div>
        <div className="absolute inset-0 bg-[#0A0B0E]/60 backdrop-blur-[2px] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent z-0"></div>

        <div className="relative z-20 space-y-6 max-w-3xl">
          <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            215 Campaigns Live Now
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Discover{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
              Campaigns
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
            The infrastructure for African creators. Get paid for your
            creativity in Ugandan Shillings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="relative w-full sm:w-[400px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                🔍
              </div>
              <input
                type="text"
                placeholder="Find your next breakthrough..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all backdrop-blur-md"
              />
            </div>
            <button className="w-full sm:w-auto bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Featured Opportunities
          </h2>
          <div className="flex gap-2">
            {["All", "Music", "Tech", "Food"].map((cat) => (
              <button
                key={cat}
                className="hidden sm:block text-xs font-bold text-gray-400 hover:text-white bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-700/50"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[].slice(0, 3).map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
