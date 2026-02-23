import { IconBuilding } from '@tabler/icons-react';
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const storedUser = JSON.parse(localStorage.getItem('kreaterly_user') || '{}');

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-none">Brand Settings</h1>
        <p className="text-gray-500 text-sm md:text-lg font-medium leading-snug">Manage your identity, billing methods, and team access.</p>
      </header>

      {/* Responsive Tab Navigation */}
      <div className="flex bg-white/5 p-1 rounded-2xl md:rounded-[28px] border border-white/5 overflow-x-auto no-scrollbar">
        {['Profile', 'Billing'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[100px] py-3 md:py-4 px-4 rounded-xl md:rounded-[22px] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#11141A] border border-white/5 p-6 md:p-12 rounded-[32px] md:rounded-[56px] shadow-3xl space-y-8 md:space-y-10">
        {activeTab === 'Profile' && (
          <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 text-center sm:text-left">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[32px] bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-3xl md:text-4xl relative group cursor-pointer overflow-hidden flex-shrink-0">
                 
               <IconBuilding className='text-teal-500' size={40}/>
                 <div className="absolute inset-0 bg-teal-500/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-black text-[10px] font-black uppercase transition-all">Upload</div>
               </div>
               <div className="space-y-1">
                 <h3 className="text-2xl md:text-3xl font-black text-white uppercase font-display leading-tight">Brand Identity</h3>
                 <p className="text-gray-500 text-xs md:text-sm font-medium">This profile is visible to all potential creator partners.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Brand Name</label>
                <input type="text" defaultValue={storedUser.company || 'Nile Breweries'} className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl py-4 px-6 text-white font-bold focus:border-teal-500/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Support Email</label>
                <input type="email" defaultValue={storedUser.email} className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl py-4 px-6 text-white font-bold focus:border-teal-500/50 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Brand Description</label>
              <textarea rows={4} className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl py-5 px-6 md:px-8 text-white font-bold focus:border-teal-500/50 outline-none resize-none transition-all" defaultValue="Uganda's premier beverages company. Cultivating culture and community through high-quality experiences." />
            </div>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
            <div className="bg-teal-500/5 border border-teal-500/10 p-6 md:p-8 rounded-3xl md:rounded-[40px] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Prize Pool Balance</p>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">UGX 25,000,000</p>
              </div>
              <button className="w-full sm:w-auto bg-teal-500 text-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 active:scale-95 transition-all">Deposit Funds</button>
            </div>

            <div className="space-y-4">
               <h3 className="text-lg md:text-xl font-black text-white tracking-tight px-1">Payment Gateways</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-5 md:p-6 bg-black/20 border border-teal-500/20 rounded-2xl md:rounded-3xl flex items-center justify-between">
                   <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-black text-xs md:text-sm">MTN</div>
                     <div className="min-w-0">
                       <p className="text-xs md:text-sm font-black text-white truncate">MoMo Gateway</p>
                       <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-black truncate">Linked: 0772 *** 456</p>
                     </div>
                   </div>
                   <span className="text-[10px] font-black text-teal-500 uppercase">Verified</span>
                 </div>
                 <div className="p-5 md:p-6 bg-black/20 border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-between grayscale opacity-40 group hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                   <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-xs md:text-sm">A</div>
                     <div className="min-w-0">
                       <p className="text-xs md:text-sm font-black text-white truncate">Airtel Money</p>
                       <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-black truncate">Not Connected</p>
                     </div>
                   </div>
                   <button className="text-[10px] font-black text-teal-500 uppercase tracking-widest group-hover:scale-110 transition-transform">Connect</button>
                 </div>
               </div>
            </div>
          </div>
        )}

        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-4">
           <button className="w-full sm:w-auto bg-white/5 text-gray-500 font-black px-8 py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] uppercase tracking-widest transition-all">Reset Defaults</button>
           <button className="w-full sm:w-auto bg-white text-black font-black px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-3xl text-[10px] md:text-[11px] uppercase tracking-widest shadow-2xl hover:bg-teal-500 transition-all active:scale-95">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
