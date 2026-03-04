import React from "react";
import {
  IconRocketOff,
  IconArrowLeft,
  IconSearch,
  IconLayoutDashboard,
} from "@tabler/icons-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Error Visual */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-xl rotate-12 group hover:rotate-0 transition-transform duration-500">
            <IconRocketOff
              size={48}
              className="text-teal-500 animate-pulse"
              stroke={1.5}
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-black text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">
            Error 404
          </div>
        </div>

        {/* Messaging */}
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">
          Signal Lost
        </h1>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 px-6">
          The campaign or page you're looking for has moved to a different orbit
          or no longer exists in our database.
        </p>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <IconArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Go Back Home
          </button>

          <a
            href="/"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-teal-500 text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
          >
            <IconLayoutDashboard size={18} />
            Marketplace
          </a>
        </div>
      </div>

      {/* Decorative Bottom Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <span className="text-8xl md:text-[120px] font-black italic tracking-tighter text-white leading-none select-none">
          kreaterly
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
