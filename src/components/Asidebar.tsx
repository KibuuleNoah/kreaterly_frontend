import { IconLifebuoy, IconPlus } from "@tabler/icons-react";
import AsideNavLink from "./AsideNavLink";
import { Icon, KreaterlyLogo } from "./Icons";
import type { Interface } from "readline";
import type { CustomLink } from "../types";
import type React from "react";

const ASidebar: React.FC<{ links: CustomLink[], Ctx: React.Context<Interface> }> = ({ links, Ctx }) => {

  return (
    <aside className="flex w-[280px] h-screen bg-[#0D1117] border-r border-white/5 flex-col fixed left-0 top-0 z-[200] py-8">
      <div className="px-8 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KreaterlyLogo />
          <span className="font-display text-3xl tracking-tight text-white uppercase pt-1">Kreaterly</span>
        </div>
        <button className="text-gray-500 hover:text-red-400 transition-colors">
          <Icon />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map(link => <AsideNavLink link={link} Ctx={Ctx} /> )}
      </nav>

      <div className="px-4 space-y-1 pt-8 border-t border-white/5">
        <button 
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white font-bold text-sm tracking-tight transition-all"
        >
        <IconPlus size={20} stroke={1.5} />
          <span>New campaign</span>
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white font-bold text-sm tracking-tight transition-all">
        <IconLifebuoy size={20} stroke={1.5} />
          <span>Support</span>
        </button>

      </div>
    </aside>
  );
};

export default ASidebar

