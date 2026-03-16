import { IconUser } from "@tabler/icons-react";
import React, { useState } from "react";
import { usePaginatedCollection } from "../../../hooks/useCollection";
import { useBrandDashboard } from "../../../hooks/useBrandDashboard";

const STATUS_THEMES = {
  accepted: "text-[#14B8A6] border-[#14B8A6]/20 bg-[#14B8A6]/5",
  pending: "text-amber-500 border-amber-500/20 bg-amber-500/5",
  rejected: "text-rose-500 border-rose-500/20 bg-rose-500/5",
};

const formatUserDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString(); // e.g., "2/25/2026, 8:06:30 PM"
};

const CreatorInvitesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const { campaignInDetails } = useBrandDashboard();

  const { items: invites } = usePaginatedCollection(
    "campaigns_invites",
    1,
    20,
    {
      filter: `campaign="${campaignInDetails.id}"`,
      expand: "creator",
    },
  );

  const tabs = ["all", "accepted", "pending", "rejected"];

  const filteredInvites =
    activeTab === "all"
      ? invites
      : invites.filter((i) => i.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#11141A] rounded-3xl md:rounded-full w-fit border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "bg-[#14B8A6] text-black"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Creator List */}
      <div className="border border-white/5 rounded-3xl p-2 flex flex-col max-h-[400px] md:h-[400px] space-y-3 overflow-auto">
        {filteredInvites.map((invite, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-6 md:p-8 bg-[#11141A] border border-white/5 rounded-[2rem] hover:border-[#14B8A6]/20 transition-all relative"
          >
            <div
              className={` md:hidden w-fit px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] absolute top-2 right-3 ${STATUS_THEMES[invite.status]}`}
            >
              {invite.status}
            </div>

            {/* Profile info */}
            <div className="col-span-1 md:col-span-5 flex items-center gap-5">
              <div className="w-12 h-12 flex items-center justify-center font-black text-[#14B8A6]">
                <IconUser className="text-teal-500" />
              </div>
              <div>
                <h4 className="text-sm md:text-md text-white font-bold text-base uppercase tracking-tight">
                  {invite.expand?.creator.name} KIbuule
                </h4>
                <p className="text-gray-600 text-xs font-medium">
                  {invite.expand?.creator.name}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="col-span-1 md:col-span-3">
              <p className="text-right md:text-left text-gray-400 text-xs font-bold md:font-medium uppercase tracking-widest md:tracking-normal">
                <span className="md:hidden text-gray-600 mr-2 uppercase text-[10px]">
                  Invited:
                </span>
                {formatUserDateTime(invite.created)}
              </p>
            </div>

            {/* Status Badge */}
            <div className="hidden md:block md:col-span-3">
              <div
                className={`w-fit px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] ${STATUS_THEMES[invite.status]}`}
              >
                {invite.status}
              </div>
            </div>
          </div>
        ))}

        {filteredInvites.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-[2rem]">
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs">
              {activeTab == "all"
                ? "No Invite Sent Yet"
                : `No ${activeTab.toLowerCase()} creators found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorInvitesSection;
