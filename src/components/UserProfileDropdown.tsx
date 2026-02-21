import React, { useState } from 'react';
import { 
  IconUser, 
  IconSettings, 
  IconPower, 
  IconEditCircle, 
  IconLock, 
  IconMessages, 
  IconHistory, 
  IconHelp 
} from '@tabler/icons-react';


export const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <li className="relative list-none">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/5"
      >
        <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
          <IconUser size={20} stroke={1.5} />
        </div>
        <span className="hidden sm:inline-block text-sm font-bold text-gray-300">Stebin Ben</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-[#0D1117] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center border border-white/10 text-[#0D1117] font-bold">
                  SB
                </div>
                <div>
                  <h6 className="text-sm font-bold text-white leading-none">Stebin Ben</h6>
                  <p className="text-[10px] text-teal-500/80 font-bold uppercase tracking-widest mt-1">Creator Pro</p>
                </div>
              </div>
              <button className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors">
                <IconPower size={18} />
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-white/5 bg-[#161B22]/50">
            {['profile', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab 
                  ? 'border-teal-500 text-teal-400 bg-teal-500/5' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'profile' ? <IconUser size={16} /> : <IconSettings size={16} />} 
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-2 max-h-[300px] overflow-y-auto">
            {activeTab === 'profile' ? (
              <div className="space-y-1">
                <DropdownLink icon={<IconEditCircle size={18} />} label="Edit Profile" />
                <DropdownLink icon={<IconUser size={18} />} label="Public View" />
                <DropdownLink icon={<IconHistory size={18} />} label="Activity Log" />
              </div>
            ) : (
              <div className="space-y-1">
                <DropdownLink icon={<IconSettings size={18} />} label="Account Settings" />
                <DropdownLink icon={<IconLock size={18} />} label="Privacy & Security" />
                <DropdownLink icon={<IconHelp size={18} />} label="Help Center" />
                <DropdownLink icon={<IconMessages size={18} />} label="Send Feedback" />
              </div>
            )}
            
            <div className="mt-2 pt-2 border-t border-white/5">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-400 font-bold rounded-lg hover:bg-rose-500/10 transition-colors">
                    <IconPower size={18} />
                    Logout
                </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

const DropdownLink = ({ icon, label }: {icon: React.ReactNode, label: string}) => (
  <a
    href="#!"
    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 font-medium rounded-xl hover:bg-white/5 hover:text-teal-400 transition-all group"
  >
    <span className="text-gray-600 group-hover:text-teal-500 transition-colors">{icon}</span>
    {label}
  </a>
);

export default UserProfileDropdown;
