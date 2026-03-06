import {
  IconGlobe,
  IconTarget,
  IconUsers,
  IconCalendar,
  IconPlus,
  IconPackageOff,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
import { pb } from "../../../lib/pocketbase";

import { useBrandDashboard } from "../../../hooks/useBrandDashboard";
import type { CampaignsResponse } from "../../../pocketbase-types";
import { usePaginatedCollection } from "../../../hooks/useCollection";

export const YourCampaignCard: React.FC<{ campaign: CampaignsResponse }> = ({
  campaign,
}) => {
  const { setActiveView, setCampaignInDetails } = useBrandDashboard();
  return (
    <div
      onClick={() => {
        setCampaignInDetails(campaign);
        setActiveView("Campaign Details");
      }}
      className="group p-5 bg-[#161B22] border border-white/5 rounded-2xl hover:border-teal-500/30 transition-all duration-300 shadow-lg"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors truncate pr-2">
          {campaign.title || "Untitled Campaign"}
        </h4>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            campaign.visibility === "open"
              ? "bg-teal-500/10 text-teal-400"
              : "bg-white/5 text-gray-500"
          }`}
        >
          {campaign.visibility}
        </span>
      </div>

      <p className="text-xs text-gray-500 line-clamp-1 mb-4">
        #hashtag • {campaign.product_type}
      </p>

      {/* Grid of Campaign Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <IconTarget size={14} className="text-teal-500" />
          <span className="text-[11px] font-medium">
            ${campaign.budget.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <IconGlobe size={14} />
          <span className="text-[11px] font-medium">
            UG ({campaign.country})
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <IconUsers size={14} />
          <span className="text-[11px] font-medium">age+</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <IconCalendar size={14} />
          <span className="text-[11px] font-medium">
            {new Date(campaign.launch_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>

      {/* Progress/Budget Bar */}
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 w-1/3 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
      </div>
    </div>
  );
};

const YourCampaigns: React.FC = () => {
  const { setCampaigns, campaigns, setActiveView } = useBrandDashboard();
  const userId = pb.authStore.record?.id;

  // Memoize the options object
  const options = useMemo(
    () => ({
      filter: `user="${userId}"`,
      sort: "-created",
    }),
    [userId],
  );

  const { items, collErr: error } = usePaginatedCollection<CampaignsResponse>(
    "campaigns",
    1,
    10,
    options,
  );

  useEffect(() => {
    if (items.length > 0) {
      setCampaigns(items);
    }
  }, [items, setCampaigns]);

  console.log("Cioii", campaigns);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Your Campaigns
        </h3>
        {!error && campaigns && campaigns.length > 5 ? (
          <button className="text-xs font-bold text-teal-400 hover:underline">
            View All
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* ERROR STATE */}
        {error && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
            <IconAlertTriangle
              size={48}
              className="text-rose-500 mb-4 opacity-80"
            />
            <h4 className="text-white font-bold mb-1">
              Failed to load campaigns
            </h4>
            <p className="text-gray-500 text-xs max-w-[200px]">
              {error.message}
            </p>
            <button className="mt-4 text-xs font-bold text-rose-400 hover:underline">
              Retry Connection
            </button>
          </div>
        )}

        {/* EMPTY STATE (No Content) */}
        {!campaigns?.length && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-2xl">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <IconPackageOff size={40} className="text-gray-600" />
            </div>
            <h4 className="text-white font-bold mb-1">No campaigns yet</h4>
            <p className="text-gray-500 text-xs max-w-[220px] mb-6">
              Ready to grow? Create your first campaign to start seeing results.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-[#0D1117] font-bold rounded-xl transition-all shadow-lg shadow-teal-500/10">
              <IconPlus size={18} />
              <span>Create</span>
            </button>
          </div>
        )}

        {/* DATA STATE */}
        {!error && campaigns ? (
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {campaigns.map((c, i) => (
              <YourCampaignCard key={i} campaign={c} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Action Button */}
      {!error && campaigns ? (
        <button
          onClick={() => setActiveView("Create Campaign")}
          className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-400 text-[#0D1117] font-bold rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.4)]"
        >
          + Create New Campaign
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default YourCampaigns;
