import { IconMailOpened } from "@tabler/icons-react";
import type React from "react";

type Invite = {
  id: string;
  brand: string;
  payout: string;
};

const MOCK_INVITES: Invite[] = [
  {
    id: "1",
    brand: "Spotify",
    payout: "UGX 500,000",
  },
  {
    id: "2",
    brand: "Coca-Cola",
    payout: "UGX 750,000",
  },
  {
    id: "3",
    brand: "Red Bull",
    payout: "UGX 600,000",
  },
  {
    id: "4",
    brand: "Netflix",
    payout: "UGX 1,000,000",
  },
];

const Invites: React.FC<{ invites?: Invite[] }> = ({ invites }) => {
  invites = []; //MOCK_INVITES;
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <IconMailOpened size={16} className="text-purple-500" /> Direct
          Invites
        </h3>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar transition-all duration-500">
        {invites.length > 0 ? (
          invites.map((invite) => (
            <div
              key={invite.id}
              className="bg-[#11141A] border border-white/10 p-6 rounded-[36px] relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <IconMailOpened size={24} />
                  </div>
                  <span className="text-[8px] font-black bg-purple-500 text-black px-2 py-0.5 rounded-md uppercase">
                    New
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base leading-tight">
                    {invite.brand} wants to work with you
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">
                    Offer: {invite.payout}
                  </p>
                </div>
                <button className="w-full py-4 bg-teal-500 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all active:scale-95 shadow-xl shadow-teal-500/10">
                  Accept Invite
                </button>
              </div>
              {/* Subtle background glow for premium feel */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full" />
            </div>
          ))
        ) : (
          /* Empty Invites Placeholder */
          <div className="h-40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center p-8 space-y-3 bg-white/[0.01]">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-700">
              <IconMailOpened size={18} />
            </div>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em]">
              Inbox Clear
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Invites;
