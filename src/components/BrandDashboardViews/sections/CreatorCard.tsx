import {
  IconBrandTiktok,
  IconCircleCheck,
  IconLoader,
  IconUserCheck,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { pb } from "../../../lib/pocketbase";
import type { CreatorsResponse } from "../../../pocketbase-types";
import { useBrandDashboard } from "../../../hooks/useBrandDashboard";

const INVITESTATES = {
  invited: {
    label: "Invited",
    icon: <IconCircleCheck size={14} stroke={3} />,
    classes:
      "bg-emerald-500/5 border-emerald-500/10 text-emerald-500/60 cursor-default",
    disabled: true,
  },
  accepted: {
    label: "Accepted",
    icon: <IconUserCheck size={14} stroke={3} />,
    classes: "bg-blue-500/10 border-blue-500/20 text-blue-400 cursor-default",
    disabled: true,
  },
  rejected: {
    label: "Rejected",
    icon: <IconX size={14} stroke={3} />,
    classes:
      "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-black",
    disabled: false, // Optional: allow re-invite if rejected
  },
  pending: {
    label: "Invited",
    icon: <IconCircleCheck size={14} stroke={3} />,
    classes:
      "bg-emerald-500/5 border-emerald-500/10 text-emerald-500/60 cursor-default",
    disabled: true,
  },
  // pending: {
  //   label: "Pending",
  //   icon: <IconLoader size={14} stroke={3} className="animate-spin" />,
  //   classes: "bg-amber-500/5 border-amber-500/10 text-amber-500/60 cursor-wait",
  //   disabled: true,
  // },
  default: {
    label: "Invite",
    icon: null,
    classes:
      "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 active:scale-95",
    disabled: false,
  },
};

const CreatorCard: React.FC<{
  creator: CreatorsResponse;
  campaignId: string;
}> = ({ creator, campaignId }) => {
  const [inviteStatus, setInviteStatus] = useState<string>("default");
  const { allBrandCampaignsInvites } = useBrandDashboard();

  const handleCreatorInvite = async () => {
    try {
      const resp = await pb.collection("campaigns_invites").create({
        campaign: campaignId,
        creator: creator.id,
      });
      setInviteStatus(resp.id ? "invited" : "default");
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (campaignId && allBrandCampaignsInvites[campaignId])
      for (const [id, status] of Object.entries(
        allBrandCampaignsInvites[campaignId],
      )) {
        if (id === creator.id) {
          (() => {
            setInviteStatus(status || "default");
          })();
        }
      }
  }, []);

  const currentState = INVITESTATES[inviteStatus] || INVITESTATES.default;

  return (
    <div className="group bg-[#11141A] border border-white/5 rounded-[40px] p-6 hover:border-teal-500/20 hover:bg-[#141921] transition-all duration-500 shadow-2xl flex flex-col h-full cursor-pointer">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img
            src={creator.avatar}
            className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
            alt={creator.name}
          />
          <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-lg px-1.5 py-0.5 border border-[#0A0B0E] text-[7px] font-black text-black">
            {/*creator.country.split(" ")[0]*/}
            {creator.country}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black text-white tracking-tight leading-none mb-1 uppercase font-display">
            {creator.name}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="scale-75 text-gray-500">
                <IconBrandTiktok />
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase">
                {creator?.stats.tiktok.followers}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <div>
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2">
            Engagement
          </p>
          <p className="text-sm font-black text-teal-400">
            {creator.stats.tiktok.engagement}
          </p>
        </div>
        <div>
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2">
            Avg. Views
          </p>
          <p className="text-sm font-black text-white">
            {creator.stats.tiktok.avg_views}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest pl-1">
          Primary Niches
        </p>
        <div className="flex flex-wrap gap-1.5">
          {creator.interests.slice(0, 3).map((i, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white/5 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-tight border border-white/5 group-hover:text-white transition-all"
            >
              {i}
            </span>
          ))}
          {creator.interests.length > 3 && (
            <span className="text-[9px] font-black text-gray-600">
              +{creator.interests.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-8">
        <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-white/10 hover:text-white transition-all active:scale-95">
          Profile
        </button>

        <button
          disabled={currentState.disabled}
          onClick={
            status === "rejected" || !status ? handleCreatorInvite : undefined
          }
          className={`w-full py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${currentState.classes}`}
        >
          {currentState.icon}
          {currentState.label}
        </button>
      </div>
    </div>
  );
};

export default CreatorCard;
