
import React from 'react';

const Submissions: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Submissions</h1>
        <p className="text-gray-400 text-sm">Track your content approvals and payouts.</p>
      </header>

      <div className="flex gap-4 border-b border-gray-800 overflow-x-auto pb-px">
        {['All', 'Pending', 'Approved', 'Rejected', 'Flagged'].map((tab, idx) => (
          <button 
            key={tab} 
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${idx === 0 ? 'text-orange-500 border-orange-500' : 'text-gray-500 border-transparent'}`}
          >
            {tab} <span className="ml-1 text-xs px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">0</span>
          </button>
        ))}
      </div>

      <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-gray-800/30 rounded-full flex items-center justify-center text-4xl grayscale opacity-50">
          📥
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">No submissions found</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">You haven't submitted any content yet. Find a campaign and start earning!</p>
        </div>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl shadow-orange-500/20 transition-all">
          Browse Campaigns
        </button>
      </div>
    </div>
  );
};

export default Submissions;
