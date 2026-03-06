import React, { useState } from "react";
import { IconLayoutDashboard, IconWallet } from "@tabler/icons-react";
import { KreaterlyLogo } from "../components/Icons";
import Footer from "../components/Footer";
import { usePaginatedCollection } from "../hooks/useCollection";
import { HomeProvider } from "../components/contexts/HomeContext";
import Index from "../components/Home/Index";
import type { CampaignResponse } from "../types";
import CampaignDetails from "../components/CampaignDetail";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [isLoggedIn] = useState(pb.authStore.isValid);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeView, setActiveView] = useState("Index");
  // const [isLoading, setIsLoading] = useState(true);
  // const [campaigns, setCampaigns] = useState<CampaignResponse[] | null>(
  //   null,
  // );
  const [campaignInDetails, setCampaignInDetails] =
    useState<CampaignResponse | null>(null);

  const navigate = useNavigate();

  const { items } = usePaginatedCollection("campaigns", 1, 10, {
    expand: "brand",
  });

  const renderContent = () => {
    switch (activeView) {
      case "Campaign Details":
        return (
          <section className="mx-auto w-full max-w-8xl mx-auto px-6 py-12 space-y-12 pt-22">
            <CampaignDetails />
          </section>
        );
      default:
        return <Index />;
    }
  };

  return (
    <HomeProvider
      data={{
        ctxType: "Home",
        activeView,
        setActiveView,
        campaigns: items as CampaignResponse[],
        setActiveCategory,
        activeCategory,
        campaignInDetails,
        setCampaignInDetails,
      }}
    >
      <div className="min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-teal-500/30">
        {/* PRIMARY TOP BAR (Identity & Auth) */}
        <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 flex items-center z-[60] bg-[#0D1117]/80 backdrop-blur-md transition-all">
          <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
            {/* Logo & Platform Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <KreaterlyLogo />
                <span className="font-black tracking-tighter text-md italic hidden">
                  Kreaterly
                </span>
              </div>
              <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">
                    Status
                  </span>
                  <span className="text-[10px] font-bold text-teal-500 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />{" "}
                    Platform Live
                  </span>
                </div>
              </div>
            </div>

            {/* Auth / Dashboard Actions */}
            <div className="flex items-center gap-6">
              {isLoggedIn ? (
                <>
                  <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-6">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                      Available Funds
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <IconWallet size={14} className="text-teal-500" /> UGX
                      450,000
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/${pb.authStore.record?.role}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    <IconLayoutDashboard size={16} /> Dashboard
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigate("/auth");
                    }}
                    className="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/auth");
                    }}
                    className="px-5 py-2 bg-teal-500 text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/10"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main>{renderContent()}</main>

        <Footer />
      </div>
    </HomeProvider>
  );
};

export default HomePage;
