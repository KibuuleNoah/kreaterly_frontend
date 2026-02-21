import { 
  IconMenu2, IconBell
} from '@tabler/icons-react';
import UserProfileDropdown from './UserProfileDropdown';

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center z-50">
      {/* LEFT SECTION: Logo & Toggle */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
      </div>

      {/* MIDDLE SECTION: Search (Wider) */}
      <div className="flex-grow flex justify-center px-8">
        {/*<div className="relative w-full max-w-2xl">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch size={18} className="text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            placeholder="Search dashboard..."
          />
        </div>*/}
      </div>

      {/* RIGHT SECTION: Actions & Profile */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <IconBell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        <UserProfileDropdown />
      </div>
    </header>
  );
};

// const UserProfileDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');
//
//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 p-1 pr-3 hover:bg-gray-100 rounded-full transition-all"
//       >
//         <img
//           src="/static/assets/images/user/avatar-2.jpg"
//           alt="user"
//           className="w-8 h-8 rounded-full object-cover border border-gray-200"
//         />
//         <span className="hidden sm:inline-block text-sm font-medium text-gray-700">Stebin Ben</span>
//       </button>
//
//       {isOpen && (
//         <>
//           {/* Overlay to close on click-away */}
//           <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
//
//           <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 animate-in fade-in zoom-in duration-150">
//             {/* Header */}
//             <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <img src="/static/assets/images/user/avatar-2.jpg" alt="user" className="w-10 h-10 rounded-xl" />
//                   <div>
//                     <h6 className="text-sm font-bold text-gray-900">Stebin Ben</h6>
//                     <p className="text-xs text-gray-500">TiTok/Creator</p>
//                   </div>
//                 </div>
//                 <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
//                   <IconPower size={18} />
//                 </button>
//               </div>
//             </div>
//
//             {/* Tabs */}
//             <div className="flex p-1 bg-gray-100/50 m-2 rounded-lg">
//               <button
//                 onClick={() => setActiveTab('profile')}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all ${
//                   activeTab === 'profile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <IconUser size={16} /> Profile
//               </button>
//               <button
//                 onClick={() => setActiveTab('setting')}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all ${
//                   activeTab === 'setting' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <IconSettings size={16} /> Setting
//               </button>
//             </div>
//
//             {/* List */}
//             <div className="p-2">
//               {activeTab === 'profile' ? (
//                 <div className="grid gap-1">
//                   <DropdownLink icon={<IconEditCircle size={18} />} label="Edit Profile" />
//                   <DropdownLink icon={<IconUser size={18} />} label="View Profile" />
//                   <DropdownLink icon={<IconPower size={18} />} label="Logout" isDanger />
//                 </div>
//               ) : (
//                 <div className="grid gap-1">
//                   <DropdownLink icon={<IconHelp size={18} />} label="Support" />
//                   <DropdownLink icon={<IconSettings size={18} />} label="Account Settings" />
//                   <DropdownLink icon={<IconLock size={18} />} label="Privacy" />
//                   <DropdownLink icon={<IconMessages size={18} />} label="Feedback" />
//                   <DropdownLink icon={<IconHistory size={18} />} label="History" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
//
// const DropdownLink = ({ icon, label, isDanger }) => (
//   <a
//     href="#!"
//     className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
//       isDanger ? 'text-red-600 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
//     }`}
//   >
//     <span className={isDanger ? 'text-red-400' : 'text-gray-400 group-hover:text-blue-500'}>{icon}</span>
//     {label}
//   </a>
// );

export default TopBar;
