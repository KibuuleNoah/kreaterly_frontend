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
} from '@tabler/icons-react';
import ASidebar from "../components/Asidebar";

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
      <div className="min-h-screen flex bg-[#0A0B0E] font-['Plus_Jakarta_Sans'] text-white">
        <ASidebar links={BRAND_NAV_ITEMS} Ctx={Ctx} />
        <MobileNav links={BRAND_NAV_ITEMS} Ctx={Ctx} />
        <main className="flex-1 ml-0 md:ml-[280px] bg-[#0A0B0E] min-h-screen">
          <div className="p-4 md:p-10 max-w-7xl mx-auto h-full pb-32 md:pb-10">
            {children}
          </div>
        </main>
      </div>
    );
  }


export default BrandDashboardLayout;
