import { IconUser } from "@tabler/icons-react";
import React from "react";

const CampaignCreatorsSection: React.FC = () => {
  // Example Data
  const creators = [
    {
      id: 1,
      name: "Amanda J",
      email: "amanda@kreaterly.ug",
      status: "ACCEPTED",
      date: "Oct 12, 2023",
    },
    {
      id: 2,
      name: "David Chen",
      email: "d.chen@social.com",
      status: "PENDING",
      date: "Oct 14, 2023",
    },
    {
      id: 3,
      name: "Sarah Miller",
      email: "sarah@creators.io",
      status: "REJECTED",
      date: "Oct 10, 2023",
    },
    {
      id: 4,
      name: "Marcus Vane",
      email: "vane@media.ug",
      status: "ACCEPTED",
      date: "Oct 11, 2023",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Creator List */}
      <div className="flex flex-col max-h-[400px] md:h-[400px] space-y-1 overflow-auto">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="grid grid-cols-1 items-center gap-4 p-3 md:p-4 bg-[#11141A] border border-white/5 rounded-[2rem] hover:border-[#14B8A6]/20 transition-all relative"
          >
            {/* Profile info */}
            <div className="col-span-1 flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center font-black">
                <IconUser className="text-teal-500" />
              </div>
              <div>
                <h4 className="text-sm md:text-md text-white font-bold text-base uppercase tracking-tight">
                  {creator.name} KIbuule
                </h4>
                <p className="text-gray-600 text-xs font-medium">
                  {creator.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCreatorsSection;
