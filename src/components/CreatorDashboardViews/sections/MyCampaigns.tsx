import {
  IconArrowRight,
  IconChevronRight,
  IconClock,
  IconPhoto,
  IconRocket,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { usePaginatedCollection } from "../../../hooks/useCollection";
import { useCreatorDashboard } from "../../../hooks/useCreatorDashboard";
import { a } from "framer-motion/client";
import type { CampaignsParticipantsResponse } from "../../../pocketbase-types";

type Campaign = {
  id: string;
  title: string;
  brand: string;
  deadline: string;
  slots: number;
  thumbnail?: string;
};

const MyCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const {
    creator,
    setActiveView,
    setParticipantCampaignInDetail,
    participantCampaigns,
  } = useCreatorDashboard();

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <IconRocket size={16} className="text-teal-500" /> My Campaigns
          <span className="ml-2 text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-500">
            {participantCampaigns?.length}
          </span>
        </h3>
      </div>

      {/* Dynamic Container: Expands with content up to 500px */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-1 transition-all duration-500">
        {participantCampaigns?.length > 0 ? (
          participantCampaigns?.map((c) => (
            <div
              key={c.expand.campaign.id}
              className="group bg-[#11141A] border border-white/[0.05] p-5 rounded-[32px] hover:border-teal-500/30 transition-all flex items-center gap-5 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                {c.thumbnail ? (
                  <img
                    src={c.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                ) : (
                  <IconPhoto className="w-8 h-8 text-zinc-500" stroke={1.5} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-1">
                  {c?.expand?.campaign?.expand?.brand?.name}
                </p>
                <h4 className="text-white font-bold text-lg truncate">
                  {c?.expand?.campaign?.title}
                </h4>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <IconClock size={12} />{" "}
                    {new Date(
                      c?.expand?.campaign?.end_date,
                    ).toLocaleDateString()}{" "}
                    deadline
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <IconUsers size={12} /> c.slots left
                  </span>
                </div>
              </div>
              <div
                onClick={() => {
                  setParticipantCampaignInDetail(c || null);
                  setActiveView("MyCampaignDetail");
                }}
                className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500 group-hover:text-black transition-all"
              >
                <IconChevronRight size={20} />
              </div>
            </div>
          ))
        ) : (
          /* Empty Campaigns Placeholder */
          <div className="h-40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center p-8 space-y-3 bg-white/[0.01]">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              No active campaigns
            </p>
            <button
              onClick={() => navigate("/home")}
              className="text-teal-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
            >
              Find One Now <IconArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCampaigns;
