import { IconBrandTiktok, IconCircleCheck } from "@tabler/icons-react";
import React, { useState } from "react";
import { pb } from "../../../lib/pocketbase";

const CreatorCard: React.FC<{ creator: any; campaignId: string }> = ({
  creator,
  campaignId,
}) => {
  const [invited, setInvited] = useState(false);

  const handleCreatorInvite = async () => {
    try {
      const resp = await pb.collection("campaigns_invites").create({
        campaign: campaignId,
        brand: "xxx",
      });
      setInvited(resp.id ? true : false);
    } catch (err: any) {
      console.log(err);
      setInvited(false);
    }
  };

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
                {creator.stats.tiktok.followers}
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

        {invited ? (
          <button
            disabled
            className="w-full py-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-500/60 flex items-center justify-center gap-2 cursor-default transition-all"
          >
            <IconCircleCheck size={14} stroke={3} />
            Invited
          </button>
        ) : (
          <button
            onClick={handleCreatorInvite}
            className="w-full py-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95"
          >
            Invite
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
