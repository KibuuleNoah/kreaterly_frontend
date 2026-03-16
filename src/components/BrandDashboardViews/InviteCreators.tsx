import React, { useState, useMemo, useContext } from "react";
import { Platform } from "../../types";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import CreatorCard from "./sections/CreatorCard";
import { useBrandDashboard } from "../../hooks/useBrandDashboard";
import {
  useCollection,
  usePaginatedCollection,
} from "../../hooks/useCollection";
import type { CreatorsResponse } from "../../pocketbase-types";

export const MOCK_CREATORS = [
  {
    id: "c1",
    name: "Nasser Ndugwa",
    bio: "Multi-disciplinary digital storyteller specializing in high-fidelity travel and fashion content. Based in Kampala, reaching the world.",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
    country: "🇺🇬 Uganda",
    interests: ["Beauty", "Fashion", "Travel", "Sport", "Outdoor"],
    stats: {
      tiktok: {
        handle: "@nasser_tt",
        followers: "415.2k",
        engagement: "11.5%",
        avgViews: "639.1k",
      },
      instagram: {
        handle: "@nasser_ig",
        followers: "13.4k",
        engagement: "12.3%",
        avgViews: "7.7k",
      },
    },
    contentGallery: [
      "https://images.unsplash.com/photo-1529139572744-b1540a799c42?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523910088395-d7457f8ee315?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "c2",
    name: "Nayebare Winnie",
    bio: "Professional lifestyle creator and mother. Sharing authentic experiences about parenting, business, and beauty in East Africa.",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400",
    country: "🇺🇬 Uganda",
    interests: ["Beauty", "Fashion", "Parenting", "Business"],
    stats: {
      tiktok: {
        handle: "@winnie_suc",
        followers: "204.3k",
        engagement: "8.6%",
        avgViews: "183.1k",
      },
      instagram: {
        handle: "@winnie_gram",
        followers: "30.4k",
        engagement: "7.8%",
        avgViews: "3.8k",
      },
    },
    contentGallery: [
      "https://images.unsplash.com/photo-1523910088395-d7457f8ee315?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "c3",
    name: "Sean Offixial",
    bio: "Tech enthusiast and fashion forward. I build bridges between modern technology and African creative culture through high-impact visuals.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    country: "🇺🇬 Uganda",
    interests: ["Fashion", "Technology", "Outdoor", "Business"],
    stats: {
      tiktok: {
        handle: "@sean_off",
        followers: "435.8k",
        engagement: "11.1%",
        avgViews: "78.7k",
      },
      instagram: {
        handle: "@sean_gram",
        followers: "47.1k",
        engagement: "8.0%",
        avgViews: "30.2k",
      },
    },
    contentGallery: [
      "https://images.unsplash.com/photo-1526080652727-5b77f74e9290?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// const ALL_INTERESTS = Array.from(
//   new Set(MOCK_CREATORS.flatMap((c) => c.interests)),
// ).sort();

const InviteCreators: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState<number>(0);
  const [minEngagement, setMinEngagement] = useState<number>(0);
  const [activePlatform, setActivePlatform] = useState<Platform | "All">("All");
  const { campaignInDetails } = useBrandDashboard();

  const { items, collLoading, collErr } =
    usePaginatedCollection<CreatorsResponse>("creators");

  if (!campaignInDetails) {
    return;
  }

  const parseMetric = (val: string) => {
    const num = parseFloat(val.replace(/[^\d.]/g, ""));
    if (val.toLowerCase().includes("k")) return num * 1000;
    if (val.toLowerCase().includes("m")) return num * 1000000;
    return num;
  };

  /**
   * BACKEND DEVELOPER NOTE:
   * Currently, this filtering is client-side.
   * PRODUCTION RECOMMENDATION:
   * 1. Use Elasticsearch or Algolia for high-performance 'MatchesSearch' (Autocomplete).
   * 2. For range filters (Followers/Engagement), ensure your SQL/NoSQL DB has GIN/B-Tree indices on these numeric fields.
   * 3. API Request: GET /api/v1/creators?min_followers=10000&interests=tech,fashion&platform=tiktok
   * 4. Use server-side pagination (limit/offset) to prevent fetching all creators at once.
   */
  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(search.toLowerCase()) ||
        creator.stats.tiktok.handle
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesInterests =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) =>
          creator.interests.includes(interest),
        );

      const totalFollowers =
        parseMetric(creator.stats.tiktok.followers) +
        parseMetric(creator.stats.instagram.followers);
      const matchesFollowers = totalFollowers >= minFollowers;

      const avgEngagement =
        (parseFloat(creator.stats.tiktok.engagement) +
          parseFloat(creator.stats.instagram.engagement)) /
        2;
      const matchesEngagement = avgEngagement >= minEngagement;

      const matchesPlatform =
        activePlatform === "All" ||
        (activePlatform === Platform.TIKTOK &&
          parseMetric(creator.stats.tiktok.followers) > 0) ||
        (activePlatform === Platform.INSTAGRAM &&
          parseMetric(creator.stats.instagram.followers) > 0);

      return (
        matchesSearch &&
        matchesInterests &&
        matchesFollowers &&
        matchesEngagement &&
        matchesPlatform
      );
    });
  }, [search, selectedInterests, minFollowers, minEngagement, activePlatform]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedInterests([]);
    setMinFollowers(0);
    setMinEngagement(0);
    setActivePlatform("All");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="sticky top-0 z-[100] bg-[#0A0B0E]/80 backdrop-blur-xl border-b border-white/5 py-4 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Smaller Title */}
            <div className="shrink-0">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase font-display">
                Talent Hub
              </h1>
            </div>

            {/* Slimmer Search Bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Search talent..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#11141A] border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all font-bold text-sm shadow-lg"
              />
            </div>

            {/* Smaller Filter Button */}
            <div className="flex gap-2 justify-between">
              <div className="text-teal-500 font-bold uppercase">
                {campaignInDetails.title}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-black text-[9px] uppercase tracking-widest ${
                  showFilters
                    ? "bg-teal-500 text-black border-teal-500"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10"
                }`}
              >
                <IconFilter size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6">{/*Filters*/}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          items.map((creator, idx) => (
            <CreatorCard
              key={idx}
              creator={creator}
              campaignId={campaignInDetails.id}
            />
          ))
        ) : (
          <div className="col-span-full py-40 text-center space-y-6">
            <span className="text-7xl opacity-20 block animate-bounce">👤</span>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase font-display">
                No talent nodes found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                Try broadening your parameters. The high-velocity creator pool
                is constantly shifting.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="bg-teal-500/10 text-teal-500 font-black px-12 py-4 rounded-2xl border border-teal-500/20 text-[10px] uppercase tracking-widest hover:bg-teal-500 hover:text-black transition-all"
            >
              Reset All Protocols
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteCreators;
