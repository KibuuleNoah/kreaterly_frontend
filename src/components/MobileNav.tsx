import React, { useState } from "react";






import type { CustomLink } from "../types";
import MobileNavLink from "./MobileNavLink";
import { IconDots } from "@tabler/icons-react";
import type { Interface } from "node:readline";

const MobileNav = ({
  items,
  Ctx
}: {
  items: CustomLink[];
  Ctx: React.Context<Interface>
}) => {
  const [showMore, setShowMore] = useState(false);

  const primaryLinks = items.length > 5 ? items.slice(0, 4) : items;
  const secondaryItems = items.length > 5 ? items.slice(4) : [];

  return (
    <>
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] md:hidden w-[90%] max-w-sm">
    <nav className="flex items-center justify-between p-2 bg-[#0D1117]/90 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    {primaryLinks.map(link => <MobileNavLink link={link} Ctx={Ctx} /> )}

    {items.length > 5 ? (
      <button
      onClick={() => setShowMore(!showMore)}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
        showMore
          ? "bg-white/10 text-white rotate-90"
          : "text-gray-500"
      }`}
      >
      <div className="scale-125"><IconDots /></div>
      </button>
    ) : null}
    </nav>
    </div>

    {showMore && (
      <div className="fixed inset-0 z-[299] md:hidden animate-in fade-in duration-300">
      <div
      className="absolute inset-0 bg-[#0A0B0E]/80 backdrop-blur-sm"
      onClick={() => setShowMore(false)}
      />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-card border border-white/10 rounded-[40px] p-8 space-y-4 shadow-3xl animate-in slide-in-from-bottom-8 duration-500">
      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 text-center">
      Extended Terminal
      </h3>
      <div className="grid grid-cols-2 gap-4">
      {secondaryItems.map(item => {
        const isActive =
          location.pathname === item.path;
        return (
          <a
          key={item.path}
          onClick={() => setShowMore(false)}
          className={`flex flex-col items-center gap-3 p-5 rounded-3xl transition-all border ${
            isActive
              ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
              : "bg-white/5 border-transparent text-gray-500"
          }`}
          >
          <div
          className={
            isActive ? "scale-110" : ""
          }
          >
          {item.icon}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">
          {item.label}
          </span>
          </a>
        );
      })}
      </div>
      {/*onLogout && (
        <button
        onClick={onLogout}
        className="w-full py-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest"
        >
        Log Out Hub
        </button>
      )*/}
      </div>
      </div>
    )}
    </>
  );
};

export default MobileNav
