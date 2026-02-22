
import React, { useContext } from 'react';
import KPICard from '../KPICard';








import { PerformanceChart, SocialAnalytics } from '../Charts';
import ActivitySection from '../ActivitySection';
import YourCampaigns from './sections/YourCampaigns';
import type { BrandDashboardContextType } from '../../types';


const Home: React.FC<{Ctx: React.Context<BrandDashboardContextType> }> = ({Ctx}) => {
  
  // const {  } = useContext<BrandDashboardContextType>(Ctx)
  
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
                    
      {KPIS.map((kpi, idx) => <KPICard key={idx} label={kpi.label} value={kpi.value} change={kpi.change} isPositive={kpi.isPositive}/>)}                
     
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
        <YourCampaigns Ctx={Ctx}/>
      </section>
      
    </div>

    <ActivitySection />


    
      {/* Global Status Footer */}
      <div className="absolute bottom-4 left-0 right-0 py-8 flex justify-center opacity-10 text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">
        KAMPALA PRIMARY NODE • SECURE ENDPOINT ACTIVE
      </div>
    </div>
  );
};

export default Home;
