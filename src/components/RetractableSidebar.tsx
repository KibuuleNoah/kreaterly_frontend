











import { createContext, useContext, useState } from "react"
import { KreaterlyLogo } from "./Icons";
import type React from "react";
import { IconChevronLeft, IconChevronRight, IconDots } from "@tabler/icons-react"
import type { CustomLink } from "../types";
import type { Interface } from "readline";
import { boolean } from "zod";
import { pb } from "../lib/pocketbase";






// const AsideNavLink = ({ link, Ctx }: { link: CustomLink, Ctx: React.Context<Interface>}) => {
//
//   const {activeView, setActiveView} = useContext(Ctx)
//
//   return (
//     <a
//     key={link.path}
//     onClick={()=>{setActiveView(link.label)}}
//     className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-tight ${
//       activeView == link.label
//         ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
//         : 'text-gray-500 hover:bg-white/5 hover:text-white'
//     }`}
//     >
//     <div className={ activeView == link.label ? 'text-teal-400 scale-110' : 'text-gray-500 transition-transform'}>
//     {link.icon}
//     </div>
//     <span className="tracking-tight">{link.label}</span>
//     </a>
//   )
// }



export const RetractableSidebarItem = ({ link, Ctx, badge, sidebarExpanded }: { link: any, Ctx: React.Context<any>, badge?: boolean, sidebarExpanded: boolean }) => {
  const { activeView, setActiveView } = useContext(Ctx)

  return (
    <li 
      onClick={() => setActiveView(link.label)}
      className={`relative flex items-center py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-tight cursor-pointer group
        ${sidebarExpanded ? "px-4" : "px-0 justify-center"} 
        ${activeView === link.label
          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
          : 'text-gray-500 hover:bg-white/5 hover:text-white'
        }`}
    >
      {/* Icon Container: Fixed size ensures it never disappears */}
      <div className="flex items-center justify-center min-w-[24px]">
        {link.icon}
      </div>

      {/* Label: Transition width and opacity for a smoother "fade" out */}
      <span className={`overflow-hidden transition-all duration-300 whitespace-nowrap
        ${sidebarExpanded ? "w-40 ml-4 opacity-100" : "w-0 opacity-0"}`}
      >
        {link.label}
      </span>

      {badge && (
        <div className={`absolute w-2 h-2 rounded bg-teal-400 
          ${sidebarExpanded ? "right-4" : "top-2 right-2"}`} 
        />
      )}

      {/* Tooltip: Shows only when retracted */}
      {!sidebarExpanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-teal-500 text-black text-xs font-bold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-[300]">
          {link.label}
        </div>
      )}
    </li>
  )
}



const RetractableSidebar: React.FC<{ links: CustomLink[], Ctx: React.Context<Interface> }> = ({ links, Ctx }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        // Controlled width: w-64 when open, w-20 when closed
        <aside className={`hidden md:block fixed left-0 top-0 h-screen z-[200] transition-all duration-300 shadow-xl 
            ${expanded ? "w-64" : "w-20"}`}>
            
            <nav className="h-full flex flex-col bg-[#0D1117] border-r border-white/10">
                <div className="p-4 mb-4 flex justify-between items-center">
                    <div className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}>
                        <KreaterlyLogo />
                    </div>
                    <button 
                        onClick={() => setExpanded(curr => !curr)} 
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                        {expanded ? <IconChevronLeft /> : <IconChevronRight />}
                    </button>
                </div>

                <ul className="flex-1 px-4 space-y-1">
                  {links.map(link => <RetractableSidebarItem link={link} Ctx={Ctx} sidebarExpanded={expanded} badge={link.label === "Creators" }/> )}
                </ul>

                <div className="border-t border-white/10 flex p-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0" />
                    <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"}`}>
                        <div className="leading-4 text-white">
                            <h4 className="font-semibold truncate">{pb.authStore.record?.name}</h4>
                            <span className="text-xs text-gray-400 truncate">{pb.authStore.record?.email}</span>
                        </div>
                        <IconDots size={20} className="text-gray-400" />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default RetractableSidebar
