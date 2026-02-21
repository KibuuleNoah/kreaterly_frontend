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

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <li className="relative list-none">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 hover:bg-gray-100 rounded-full transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
          <IconUser size={20} stroke={1.5} />
        </div>
        <span className="hidden sm:inline-block text-sm font-medium text-gray-700">Stebin Ben</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
                  <IconUser size={24} stroke={1.5} />
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-gray-900">Stebin Ben</h6>
                  <p className="text-xs text-gray-500">TiTok/Creator</p>
                </div>
              </div>
              <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <IconPower size={18} />
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'profile' 
                ? 'border-blue-600 text-blue-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconUser size={18} /> Profile
            </button>
            <button
              disabled={true}
              onClick={() => setActiveTab('setting')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-b-2 disabled${
                activeTab === 'setting' 
                ? 'border-blue-600 text-blue-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
            {/*<IconSettings size={18} /> Setting*/}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-2 max-h-[300px] overflow-y-auto">
            {activeTab === 'profile' ? (
              <div className="space-y-1">
                <DropdownLink icon={<IconEditCircle size={18} />} label="Edit Profile" />
                <DropdownLink icon={<IconUser size={18} />} label="View Profile" />
                <DropdownLink icon={<IconPower size={18} />} label="Logout" />
              </div>
            ) : (
              <div className="space-y-1">
                <DropdownLink icon={<IconHelp size={18} />} label="Support" />
                <DropdownLink icon={<IconSettings size={18} />} label="Account Settings" />
                <DropdownLink icon={<IconLock size={18} />} label="Privacy Center" />
                <DropdownLink icon={<IconMessages size={18} />} label="Feedback" />
                <DropdownLink icon={<IconHistory size={18} />} label="History" />
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

// Sub-component for repeated menu items
const DropdownLink = ({ icon, label }: {icon: React.ReactNode, label: string}) => (
  <a
    href="#!"
    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
  >
    <span className="text-gray-400">{icon}</span>
    {label}
  </a>
);

export default UserProfileDropdown;
