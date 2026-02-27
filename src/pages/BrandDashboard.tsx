import React, { useEffect, useState } from "react";
import BrandDashboardLayout from "../layouts/BrandDashboardLayout";
import { UserRole, type BrandDashboardContextType } from "../types";
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
import CampaignDetail from "../components/BrandDashboardViews/sections/CampaignDetail";
import type { CampaignsRecord } from "../pocketbase-types";

const BASE_VIEWS = ["Home", "Settings", "Analytics", "Review Content"];

const BrandDashboard = () => {
  const [activeView, setActiveView] = useState("Home");
  // Used by the back btn to travese views
  const [viewNavTree, setViewNavTree] = useState<string[]>(["Home"]);
  const [isBrandFirstTime, setIsBrandFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignsRecord[] | null>(null);
  const [campaignInDetails, setCampaignInDetails] =
    useState<CampaignsRecord | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Refresh the token to get the latest user data from server
        const authData = await pb.collection("users").authRefresh({
          requestKey: null,
        });

        // Verify the role is specifically "brand"
        if (authData.record.role !== UserRole.BRAND) {
          navigate("/creator");
        }

        setActiveView("Home");
      } catch (err: any) {
        if (err.isAbort) return;
        pb.authStore.clear();
        navigate("/auth?role=brand");
      }
    };

    const checkIfBrandFirstTime = async () => {
      try {
        await pb
          .collection("campaigns")
          .getFirstListItem(`user_id="${pb.authStore.record?.id}"`);
      } catch (err: any) {
        if (err.status == 404) {
          setIsBrandFirstTime(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
    checkIfBrandFirstTime();
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
