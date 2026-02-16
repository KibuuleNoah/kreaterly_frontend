
import React, { useState } from 'react';
// Fix: Ignore potential type definition issues with react-router-dom in this environment
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('kreaterly_user') || '{}');
  const role = localStorage.getItem('kreaterly_role');

  const [userData, setUserData] = useState({
    name: storedUser.name || 'Kigozi John',
    email: storedUser.email || 'kigozi.john@creators.ug',
    phone: storedUser.phone || '0772 123 456',
    bio: storedUser.bio || 'Digital storyteller based in Kampala.',
    niche: 'Tech & Lifestyle'
  });

  const handleLogout = () => {
    localStorage.removeItem('kreaterly_role');
    localStorage.removeItem('kreaterly_user');
    navigate('/welcome');
    window.location.reload();
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[42px] overflow-hidden border-4 border-teal-500/20 shadow-2xl relative">
              <img src={`https://picsum.photos/seed/${userData.name}/300/300`} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                <span className="text-white text-xl">📸</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-[#0A0B0E]">
              <span className="text-xs font-black">✔</span>
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-1 flex-1">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">{userData.name}</h1>
            <p className="text-teal-500 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs pt-1">
              {role} Account • Kampala, UG
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400">Verified Member</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400">Node Hub v3.5</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="md:self-start bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 font-black px-6 py-4 rounded-xl transition-all text-[9px] uppercase tracking-widest active:scale-95"
          >
            End Session
          </button>
        </div>
      </header>

      <div className="bg-[#101217] border border-white/5 p-6 md:p-10 rounded-[32px] md:rounded-[48px] space-y-8 shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase font-display">Account Identity</h3>
          <p className="text-gray-500 text-xs md:text-sm font-medium">Manage your public information and secure billing data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Legal Name / Entity</label>
            <input 
              type="text" 
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full bg-[#0A0B0E] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-teal-500 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Secure Email</label>
            <input 
              type="email" 
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              className="w-full bg-[#0A0B0E] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-teal-500 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Billing Phone (MoMo)</label>
            <input 
              type="text" 
              value={userData.phone}
              onChange={(e) => setUserData({...userData, phone: e.target.value})}
              className="w-full bg-[#0A0B0E] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-teal-500 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Creative Category</label>
            <select 
              value={userData.niche}
              onChange={(e) => setUserData({...userData, niche: e.target.value})}
              className="w-full bg-[#0A0B0E] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-teal-500 transition-all shadow-inner"
            >
              <option>Tech & Lifestyle</option>
              <option>Music & Ent</option>
              <option>Food & Travel</option>
              <option>Comedy & Gaming</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-white/5">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Data secured by kampala cluster protocol</p>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <button 
               onClick={handleLogout}
               className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-gray-400 font-black px-8 py-5 rounded-[24px] text-[10px] uppercase tracking-widest transition-all"
             >
               Sign Out
             </button>
             <button className="flex-1 md:flex-none bg-teal-500 hover:bg-teal-400 text-black font-black px-12 py-5 rounded-[24px] shadow-xl shadow-teal-500/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest">
               Update Profile
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
