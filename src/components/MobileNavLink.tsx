import React from "react";
import { useMobileNav } from "../hooks/useMobileNav";
import type { CustomLink } from "../types";

const MobileNavLink: React.FC<{
  link: CustomLink;
}> = ({ link }) => {
  const { activeView, setActiveView } = useMobileNav();

  return (
    <a
      onClick={link.handleOnClick ?? (() => setActiveView(link.label))}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
        activeView == link.label
          ? "bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)]"
          : "text-gray-500"
      }`}
    >
      <div className="scale-110">{link.icon}</div>
    </a>
  );
};

export default MobileNavLink;
