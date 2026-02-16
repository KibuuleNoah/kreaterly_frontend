
import React from 'react';

const Accounts: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Linked Accounts</h1>
          <p className="text-gray-400 text-sm">Connect your social media to start submitting videos.</p>
        </header>
        <button className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl px-4 py-2 text-sm font-bold transition-all">
          ➕ Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1A1D23] border border-gray-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl flex items-center justify-center text-3xl shadow-lg">
             🔗
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white">No Linked Accounts</h3>
             <p className="text-gray-500 text-sm max-w-xs">Connecting your accounts allows our AI to track your views and automate payouts.</p>
           </div>
           <button className="w-full bg-white text-black font-bold py-3 rounded-2xl hover:bg-gray-200 transition-all">
             Connect My First Account
           </button>
        </div>

        {/* Placeholder linked accounts showing platforms */}
        {[
          { name: 'TikTok', icon: '🎵', color: 'from-pink-500 to-rose-600' },
          { name: 'Instagram', icon: '📸', color: 'from-purple-500 to-orange-500' },
          { name: 'YouTube', icon: '🎥', color: 'from-red-500 to-red-600' }
        ].map((plat) => (
          <div key={plat.name} className="bg-[#1A1D23]/50 border border-gray-800/50 p-6 rounded-3xl flex items-center justify-between opacity-50 cursor-not-allowed grayscale">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-tr ${plat.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {plat.icon}
              </div>
              <div>
                <h4 className="font-bold text-white">{plat.name}</h4>
                <p className="text-xs text-gray-500">Not Connected</p>
              </div>
            </div>
            <button className="text-xs font-bold text-gray-400 hover:text-white">Connect</button>
          </div>
        ))}
      </div>

      <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-3xl">
        <h4 className="font-bold text-orange-400 mb-2">Why link accounts?</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li className="flex gap-2">✅ Automatic view tracking</li>
          <li className="flex gap-2">✅ Faster payment verification</li>
          <li className="flex gap-2">✅ Eligibility for high-budget brand campaigns</li>
        </ul>
      </div>
    </div>
  );
};

export default Accounts;
