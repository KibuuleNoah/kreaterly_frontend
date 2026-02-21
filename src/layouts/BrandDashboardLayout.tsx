import React from "react";
import MobileNav from "../components/MobileNav";






import type { BrandDashboardContextType } from "../types";
import { 
  IconHome, 
  IconUsers, 
  IconCoin, 
  IconFileCheck, 
  IconSettings,
  IconUserPlus, 
  IconLayoutDashboard,
} from '@tabler/icons-react';
import RetractableSidebar, { RetractableSidebarItem } from "../components/RetractableSidebar";

const BRAND_NAV_ITEMS = [
  { path: '/', label: 'Home', icon: <IconHome size={25} /> },
  { path: '/new', label: 'New', icon: <IconUserPlus size={25} /> },
  { path: '/creators', label: 'Creators', icon: <IconUsers size={25} /> },
  { path: '/funds', label: 'Funds', icon: <IconCoin size={25} /> },
  // { path: '/messaging', label: 'Messaging', icon: <IconMessage size={25} /> },
  // { path: '/comments', label: 'Comments', icon: <IconMessageDots size={25} /> },
  { path: '/review', label: 'Review Content', icon: <IconFileCheck size={25} /> },
  // { path: '/calendar', label: 'Calendar', icon: <IconCalendar size={25} /> },
  { path: '/settings', label: 'Settings', icon: <IconSettings size={25} /> },
];


const BrandDashboardLayout: React.FC<{ children: React.ReactNode, Ctx: React.Context<BrandDashboardContextType> }> = ({ children, Ctx }) => {
    return (
        <div className="flex min-h-screen bg-[#050505]">
            {/* Sidebar */}
            <RetractableSidebar links={BRAND_NAV_ITEMS} Ctx={Ctx}/>
                
            {/* Main Content Area */}
            {/* ml-20 matches the width of the retracted sidebar */}
            <main className="flex-1 md:ml-20 p-8 transition-all">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Project Overview</h1>
                    <p className="text-gray-400">Welcome back to your dashboard.</p>
                </header>

                {/* Dashboard Grid */}
                
                {children}
                
                <div className="mt-8 h-96 rounded-xl bg-[#0D1117] border border-white/5" />
            </main>
        </div>
    );
}

// const BrandDashboardLayout: React.FC<{ children: React.ReactNode, Ctx: React.Context<BrandDashboardContextType> }> = ({ children, Ctx }) => {
//
//         // <ASidebar links={BRAND_NAV_ITEMS} Ctx={Ctx} />
//     return (
//       <div className="min-h-screen flex bg-[#0A0B0E] font-['Plus_Jakarta_Sans'] text-white">
//
// {/* 1. Wrapper to reserve space (optional) or use 'fixed' to float entirely */}
// <div className="fixed left-0 top-0 h-screen z-50">
//   <RetractableSidebar>
//     <div className="group flex flex-col h-full bg-zinc-950 border-r border-zinc-800 shadow-2xl transition-[width] duration-300 ease-in-out w-16 hover:w-64">
//
//       {/* 2. Your Sidebar Item */}
//       <RetractableSidebarItem 
//         icon={<IconHome size={20} />} 
//         text="Home" 
//         // Use group-hover to show text only when parent is expanded
//         className="flex items-center p-4 hover:bg-zinc-900 transition-colors cursor-pointer overflow-hidden whitespace-nowrap"
//       />
//
//     </div>
//   </RetractableSidebar>
// </div>
//         <MobileNav links={BRAND_NAV_ITEMS} Ctx={Ctx} />
//         <main className="flex-1 ml-0 md:ml-[280px] bg-[#0A0B0E] min-h-screen">
//         <div className="p-4 md:p-10 max-w-7xl mx-auto h-full pb-32 md:pb-10">
//             {children}
//           </div>
//         </main>
//       </div>
//     );
//   }
//

export default BrandDashboardLayout;
