import React, { useContext, useState, type ReactNode } from "react";

import type { CreatorDashboardContextType } from "../types";
import { FormatUGXCurrency } from "../lib/helpers";
import {
  IconLayoutDashboard,
  IconRocket,
  IconWallet,
  IconUserCircle,
} from "@tabler/icons-react";
import CreatorTopNavLink from "../components/CreatorTopNavLink";
import { KreaterlyLogo } from "../components/Icons";
import MobileNav from "../components/MobileNav";

const NAV_LINKS = [
  {
    path: "/",
    label: "Home",
    icon: <IconLayoutDashboard size={25} stroke={1.5} />,
  },
  {
    path: "/campaigns",
    label: "Campaigns",
    icon: <IconRocket size={25} stroke={1.5} />,
  },
  {
    path: "/wallet",
    label: "Wallet",
    icon: <IconWallet size={25} stroke={1.5} />,
  },
];

const CreatorDashboardLayout: React.FC<{
  children: React.ReactNode;
  Ctx: React.Context<CreatorDashboardContextType>;
}> = ({ children, Ctx }) => {
  const { activeView } = useContext(Ctx);
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0B0E] selection:bg-teal-500/30 text-white">
      <MobileNav links={NAV_LINKS} Ctx={Ctx} />

      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 bg-[#0D1117]/80 backdrop-blur-3xl border-b border-white/5 flex items-center">
        <div className="max-w-[1600px] mx-auto w-full flex items-center">
          {/* Left: Logo - Flex-1 pushes center column */}
          <div className="flex-1 flex items-center justify-start">
            <a className="flex items-center gap-3 group">
              <KreaterlyLogo />
              <span className="hidden lg:block font-display text-3xl tracking-tight text-white uppercase pt-1 group-hover:text-teal-400 transition-colors duration-300">
                Kreaterly
              </span>
            </a>
          </div>

          {/* Center: Balanced Navigation Pill */}
          <div className="hidden md:flex flex-none items-center justify-center">
            <nav className="flex items-center gap-1 p-1 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              {NAV_LINKS.map((link, idx) => {
                return <CreatorTopNavLink key={idx} link={link} Ctx={Ctx} />;
              })}
            </nav>
          </div>

          {/* Right: Actions - Flex-1 balances Left column */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <a className="flex items-center gap-3 bg-[#161B22] border border-white/5 px-4 py-2.5 rounded-xl hover:border-teal-500/30 transition-all group/wallet shadow-lg">
              <div className="text-right hidden sm:block">
                <p className="text-[7px] font-black text-gray-500 uppercase tracking-[0.3em] leading-none mb-1">
                  BALANCE
                </p>
                <p className="text-teal-400 font-black text-sm tracking-tighter leading-none">
                  {FormatUGXCurrency(12000)}
                </p>
              </div>
              <div className="text-teal-400 opacity-80 group-hover/wallet:opacity-100 transition-opacity">
                <span>
                  <IconWallet />
                </span>
              </div>
            </a>
            <div className="hidden md:flex items-center bg-[#1C2128] border border-white/5 p-1 rounded-xl gap-1">
              <a className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">
                <span>
                  <IconUserCircle />
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mt-24 lg:mt-28">
        <div className="px-4 md:px-10 lg:px-12 max-w-7xl mx-auto h-full pb-32 md:pb-10">
          {children} {activeView}
        </div>
      </main>

      <div className="fixed top-[72px] left-0 right-0 h-[1px] z-[101] pointer-events-none">
        <div className="h-full bg-teal-500/20 w-full shadow-[0_0_15px_rgba(20,184,166,0.1)]"></div>
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
