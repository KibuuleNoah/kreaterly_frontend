import React from "react";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react"; // Or your icon library

interface CampaignBriefProps {
  requirements?: string[];
  exclusions?: string;
  title?: string;
}

export const CampaignBrief: React.FC<CampaignBriefProps> = ({
  title = "Brief & Objectives",
  requirements = [
    "High quality 4K video",
    "Luganda or English",
    "2x TikTok Posts",
  ],
  exclusions = "No competing brands in frame. No profanity. Content must be original.",
}) => {
  return (
    <section className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
      {/* Header */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
          {title}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
        {/* Requirements Column */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-teal-500 mb-4 flex items-center gap-2">
            <IconCheck size={16} /> Requirements
          </h3>
          <ul className="space-y-3">
            {requirements.map((item, i) => (
              <li
                key={i}
                className="text-xs font-bold text-gray-300 flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-teal-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions Column */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4 flex items-center gap-2">
            <IconAlertCircle size={16} /> Exclusions
          </h3>
          <p className="text-[11px] text-gray-500 font-medium leading-loose">
            {exclusions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignBrief;
