import { IconBell } from "@tabler/icons-react";
import BrandUserProfileDropdown from "./BrandUserProfileDropdown";
import { KreaterlyLogo } from "../../Icons";

const BrandTopBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0D1117]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center z-[150] transition-all">
      <div className="sm:hidden flex items-center gap-4 flex-shrink-0 lg:ml-20">
        <div className="flex items-center gap-2">
          <KreaterlyLogo />
          <span className="text-white font-bold tracking-tighter text-lg">
            Kreaterly
          </span>
        </div>
      </div>

      <div className="flex-grow flex justify-center px-8 max-w-2xl mx-auto">
        {/*<div className="relative w-full hidden md:block">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search campaigns or creators..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
          />
        </div>*/}
      </div>

      {/* RIGHT SECTION: Actions & Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Quick Action Button
        <button className="hidden sm:flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-[#0D1117] px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-teal-500/10">
          <IconPlus size={18} />
          <span>Create</span>
        </button>
          */}

        <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-teal-400 hover:bg-white/5 rounded-xl relative transition-all">
          <IconBell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-400 rounded-full border-2 border-[#0D1117]"></span>
        </button>

        {/* User Profile Area */}
        <div className="ml-2">
          <BrandUserProfileDropdown />
        </div>
      </div>
    </header>
  );
};
export default BrandTopBar;
