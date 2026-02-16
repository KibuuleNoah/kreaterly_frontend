import React from "react"
import type { CustomLink } from "../types"
import { useContext } from "react"
import type { Interface } from "readline"


const AsideNavLink = ({ link, Ctx }: { link: CustomLink, Ctx: React.Context<Interface>}) => {

  const {activeView, setActiveView} = useContext(Ctx)

  return (
    <a
    key={link.path}
    onClick={()=>{setActiveView(link.label)}}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-tight ${
      activeView == link.label
        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
        : 'text-gray-500 hover:bg-white/5 hover:text-white'
    }`}
    >
    <div className={ activeView == link.label ? 'text-teal-400 scale-110' : 'text-gray-500 transition-transform'}>
    {link.icon}
    </div>
    <span className="tracking-tight">{link.label}</span>
    </a>
  )
}

export default AsideNavLink
