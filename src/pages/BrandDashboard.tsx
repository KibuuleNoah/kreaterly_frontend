import React, { useEffect, useState } from "react";
import BrandDashboardLayout from "../layouts/BrandDashboardLayout";
import {
  UserRole,
  type BrandDashboardContextType,
  type CampaignResponse,
} from "../types";
import Home from "../components/BrandDashboardViews/Home";
// import Analytics from "../components/BrandDashboardViews/Analytics";
import Settings from "../components/BrandDashboardViews/Settings";
import ReviewContent from "../components/BrandDashboardViews/ReviewContent";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import CreateCampaign from "../components/BrandDashboardViews/CreateCampaign";
import LoadingScreen from "../components/LoadingScreen";
import BrandFirstTime from "../components/BrandDashboardViews/BrandFirstTime";
import Analytics from "../components/BrandDashboardViews/Analytics";
import InviteCreators from "../components/BrandDashboardViews/InviteCreators";
import { BrandDashboardProvider } from "../components/contexts/BrandDashboardContext";
import type { CampaignsResponse } from "../pocketbase-types";
import CampaignDetail from "../components/BrandDashboardViews/sections/CampaignDetail";

const BASE_VIEWS = ["Home", "Settings", "Analytics", "Review Content"];
const MOCK_CAMPAIGNS_TO_SEND = [
  {
    title: "Just Joke And Play",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 10000099,
    category: "Entertainment",
    country: 256,
    cpm: 1899,
    description:
      "Your Campaign 'Tredstone upto the sky' successfully hit 10M views across all platforms.",
    gender: "B",
    launch_date: "2026-02-24 00:00:00.000Z",
    product_type: "none",
    visibility: "open",
    status: "active",
    age_ranges: ["18-24", "25-34"],
    min_followers: 0,
  },
  {
    title: "Tech Pulse Uganda",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 5000000,
    category: "Technology",
    country: 256,
    cpm: 1500,
    description: "Showcasing new tech trends in the heart of Kampala.",
    gender: "B",
    launch_date: "2026-03-01 00:00:00.000Z",
    product_type: "service",
    visibility: "open",
    status: "active",
    age_ranges: ["18-24", "25-44"],
    min_followers: 1000,
  },
  {
    title: "Kampala Night Bites",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 2500000,
    category: "Food & Drink",
    country: 256,
    cpm: 1200,
    description: "Promoting local street food culture and night life.",
    gender: "B",
    launch_date: "2026-03-05 00:00:00.000Z",
    product_type: "food",
    visibility: "private",
    status: "active",
    age_ranges: ["18-34"],
    min_followers: 500,
  },
  {
    title: "Fashion Forward UG",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 8500000,
    category: "Lifestyle",
    country: 256,
    cpm: 2100,
    description: "High-end fashion photography and short-form video content.",
    gender: "F",
    launch_date: "2026-03-10 00:00:00.000Z",
    product_type: "apparel",
    visibility: "open",
    status: "active",
    age_ranges: ["18-24", "25-34"],
    min_followers: 2000,
  },
  {
    title: "Smart Home UG",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 6800000,
    category: "Home Decor",
    country: 256,
    cpm: 1450,
    description:
      "Modernizing living spaces with smart lighting and automation tailored for the Kampala lifestyle.",
    gender: "B",
    launch_date: "2026-03-25 12:00:00.000Z",
    product_type: "electronics",
    visibility: "open",
    status: "active",
    age_ranges: ["25-34", "35-44"],
    min_followers: 800,
  },
  {
    title: "Pearl of Africa Tours",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 12500000,
    category: "Travel",
    country: 256,
    cpm: 1800,
    description:
      "Highlighting weekend getaway destinations and hidden gems across Western Uganda.",
    gender: "B",
    launch_date: "2026-03-20 00:00:00.000Z",
    product_type: "tourism",
    visibility: "private",
    status: "active",
    age_ranges: ["25-34", "35-44"],
    min_followers: 1500,
  },
  {
    title: "Urban Soundscapes",
    brand: "brq27t9kpaq2j2x",
    user: "ezvf25cr3ctbgnd",
    budget: 15000000,
    category: "Music",
    country: 256,
    cpm: 2200,
    description:
      "Capturing the rhythm of the city through high-energy dance challenges and local artist features.",
    gender: "B",
    launch_date: "2026-03-15 09:00:00.000Z",
    product_type: "digital_content",
    visibility: "open",
    status: "active",
    age_ranges: ["13-17", "18-24"],
    min_followers: 5000,
  },
];

const BrandDashboard = () => {
  const [activeView, setActiveView] = useState("Home");
  // Used by the back btn to travese views
  const [viewNavTree, setViewNavTree] = useState<string[]>(["Home"]);
  const [isBrandFirstTime, setIsBrandFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignsResponse[] | null>(null);
  const [campaignInDetails, setCampaignInDetails] =
    useState<CampaignsResponse | null>(null);
  const [campaignInvitesCreatorIds, setCampaignInvitesCreatorIds] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const initBrandDashboard = async () => {
      // Fail fast: Don't hit the API if the local store is empty
      if (!pb.authStore.isValid) {
        return navigate("/auth?role=brand");
      }

      try {
        // Sync session with server; requestKey: null prevents SDK auto-cancellation
        const authData = await pb.collection("users").authRefresh({
          requestKey: null,
        });

        // Role guard: Prevent cross-role dashboard access
        if (authData.record.role !== UserRole.BRAND) {
          return navigate("/creator");
        }

        try {
          // Check onboarding status; isolated catch so DB errors don't trigger logout
          await pb
            .collection("campaigns")
            .getFirstListItem(`user = "${pb.authStore.record?.id}"`, {
              $cancelKey: "brand-init-check",
              signal: controller.signal,
            });
          setIsBrandFirstTime(false);
        } catch (dataErr: any) {
          if (dataErr.isAbort || dataErr.status === 0) return;

          // 404 is a valid business state (new user), not a code failure
          if (dataErr.status === 404) {
            setIsBrandFirstTime(true);
          }
        } finally {
          // Loop through and create them
          // for (const campaign of MOCK_CAMPAIGNS_TO_SEND) {
          //   await pb.collection("campaigns").create(campaign);
          // }
          setActiveView("Home");
          setIsLoading(false);
        }
      } catch (authErr: any) {
        // Ignore network aborts; only clear session if the server explicitly rejects the token
        if (authErr.isAbort || authErr.status === 0) return;

        pb.authStore.clear();
        navigate("/auth?role=brand");
      }
    };

    initBrandDashboard();

    // Lifecycle cleanup to prevent memory leaks/race conditions
    return () => controller.abort();
  }, [navigate]);

  useEffect(() => {
    (() => {
      if (BASE_VIEWS.includes(activeView) && viewNavTree.length != 1) {
        setViewNavTree([activeView]);
      } else if (!viewNavTree.includes(activeView)) {
        setViewNavTree((prev) => [...prev, activeView]);
      }

      console.log(viewNavTree);
    })();
  }, [activeView, viewNavTree]);

  const renderContent = () => {
    switch (activeView) {
      case "Settings":
        return <Settings />;
      case "Invite Creators":
        return <InviteCreators />;
      case "Analytics":
        return <Analytics />;
      case "Review Content":
        return <ReviewContent />;
      case "Create Campaign":
        return <CreateCampaign />;
      case "Campaign Details":
        return <CampaignDetail />;
      default:
        return <Home />;
    }
  };

  return (
    <BrandDashboardProvider
      data={{
        ctxType: "Brand",
        activeView,
        setActiveView,
        setIsLoading,
        campaigns,
        setCampaigns,
        campaignInDetails,
        setCampaignInDetails,
        isBrandFirstTime,
        viewNavTree,
        setViewNavTree,
        campaignInvitesCreatorIds,
        setCampaignInvitesCreatorIds,
      }}
    >
      {isLoading && <LoadingScreen />}
      {!isLoading && isBrandFirstTime && activeView != "Create Campaign" ? (
        <BrandFirstTime />
      ) : (
        <BrandDashboardLayout>{renderContent()}</BrandDashboardLayout>
      )}
    </BrandDashboardProvider>
  );
};

export default BrandDashboard;
