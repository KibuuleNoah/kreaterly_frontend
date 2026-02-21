
import React from 'react';
import KPICard from '../KPICard';








import { PerformanceChart, SocialAnalytics } from '../Charts';
import ActivitySection from '../ActivitySection';
import YourCampaigns from './sections/YourCampaigns';


const Home: React.FC = () => {

  const KPIS = [
    { label: 'Total Views', value: '12.4M', change: 12.5, isPositive: true },
    { label: 'Engagement Rate', value: '6.21%', change: -1.4, isPositive: false },
    { label: 'Active Creators', value: '142', change: 8.0, isPositive: true },
  ];

    // <div className="h-full min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-1000 relative">
  return (
    <div className="h-full min-h-[70vh]animate-in fade-in duration-1000 relative">
      
    {/* KPI Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
      {KPIS.map(kpi => <KPICard label={kpi.label} value={kpi.value} change={kpi.change} isPositive={kpi.isPositive}/>)}                
     
    </div>

    {/* Charts Middle Section */}
    <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-2">
      
      <div className="lg:col-span-2 bg-[#0D1117] border border-white/5 p-6 rounded-3xl relative min-h-[400px] shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Campaign Views Over Time</h3>
                  <p className="text-gray-500 text-xs mt-1">Comparison between organic vs paid reach</p>
              </div>
              
              {/* Custom Legend with Brand-Consistent Typography */}
              <div className="flex items-center gap-6 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_rgba(45,212,191,0.4)]"></span>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_rgba(139,92,246,0.4)]"></span>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Engagement</span>
                  </div>
              </div>
          </div>

          {/* The Chart Component */}
          <div className="w-full">
          <PerformanceChart />
          </div>
      </div>
      <div>
      {/*<SocialAnalytics />*/}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-4">
      
      {/* LEFT: The Performance Chart (Takes 2 columns on LG) */}
      <div className="md:col-span-2">
        {/* Your PerformanceChart Component from before goes here */}
        <div className="h-full min-h-[450px] bg-[#0D1117] border border-white/5 rounded-3xl p-6">
          <SocialAnalytics />
        </div>
      </div>

      {/* RIGHT: Your Campaigns Section */}
      <section className="bg-[#0D1117] border border-white/5 rounded-3xl p-6 flex flex-col h-[600px]">
        <YourCampaigns />
      </section>
      
    </div>

    <ActivitySection />


    {/* Dark Node Network Background Visual */}
      <div className="hidden absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Connection Lines (Subtle glow) */}
        <svg className="absolute inset-0 w-full h-full stroke-white/[0.03] stroke-[1px] fill-none">
          <path d="M 25% 30% Q 50% 20% 70% 30%" />
          <path d="M 25% 30% Q 40% 60% 70% 60%" />
          <path d="M 70% 30% Q 80% 45% 70% 60%" />
          <path d="M 25% 30% Q 15% 50% 30% 70%" />
          <path d="M 30% 70% Q 50% 80% 70% 60%" />
        </svg>

        {/* Junction Points (Teal glowing dots) */}
        <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[30%] left-[70%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[70%] left-[30%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>

        {/* Blurred Avatar Nodes */}
        <div className="absolute top-[20%] left-[65%] w-24 h-24 rounded-full overflow-hidden opacity-30 blur-[2px] border border-white/5 shadow-3xl">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute top-[55%] left-[65%] w-32 h-32 rounded-full overflow-hidden opacity-20 blur-[1px] border border-white/5 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute top-[65%] left-[25%] w-20 h-20 rounded-full overflow-hidden opacity-10 blur-[3px] border border-white/5">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute top-[25%] left-[20%] w-28 h-28 rounded-full overflow-hidden opacity-15 blur-[2px] border border-white/5">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10 px-6">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase font-display">
            Create your <br/><span className="text-teal-500">first campaign</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium tracking-tight">
            Deploy your mission and find Africa's best creators in minutes.
          </p>
        </div>

        <div className="flex flex-col items-center">
           <button 
             className="bg-white text-black font-black px-12 py-5 rounded-2xl text-[12px] uppercase tracking-[0.2em] transition-all shadow-[0_20px_50px_rgba(20,184,166,0.15)] hover:bg-teal-500 active:scale-95 btn-bubble"
           >
            New campaign
          </button>
        </div>
      </div>

      {/* Global Status Footer */}
      <div className="absolute bottom-4 left-0 right-0 py-8 flex justify-center opacity-10 text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">
        KAMPALA PRIMARY NODE • SECURE ENDPOINT ACTIVE
      </div>
    </div>
  );
};

export default Home;
