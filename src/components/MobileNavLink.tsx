import React from "react"
import type { CreatorDashboardContextType, CustomLink } from "../types"
import { useContext } from "react"


const MobileNavLink = ({ link, Ctx }: { link: CustomLink, Ctx: React.Context<CreatorDashboardContextType>}) => {

  const {activeView, setActiveView} = useContext(Ctx)

  return (
    <a
    key={link.label}
    onClick={()=>{setActiveView(link.label)}}
    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
        activeView == link.label
          ? "bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)]"
          : "text-gray-500"
      }`
    }
    >
    <div className="scale-110">{link.icon}</div>
    </a>
  )
}

export default MobileNavLink
