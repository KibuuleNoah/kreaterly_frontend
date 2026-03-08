import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../layouts/CreatorDashboardLayout";
import Wallet from "../components/CreatorDashboardViews/Wallet";
import Home from "../components/CreatorDashboardViews/Home";
import LoadingScreen from "../components/LoadingScreen";
import { CreatorDashboardProvider } from "../components/contexts/CreatorDashboardContext";
import { useNavigate } from "react-router-dom";
import Submissions from "../components/CreatorDashboardViews/Submissions";
import MyCampaignDetail from "../components/CreatorDashboardViews/MyCampaignDetail";
import { UserRole } from "../types";
import { pb } from "../lib/pocketbase";
import type {
  CampaignsParticipantsResponse,
  CreatorsResponse,
} from "../pocketbase-types";

const BASE_VIEWS = ["Home"];

const CreatorDashboard: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("Home");
  const [creator, setCreator] = useState<CreatorsResponse | null>(null);
  const [viewNavTree, setViewNavTree] = useState<string[]>(["Home"]);
  const [participantCampaigns, setParticipantCampaigns] = useState<
    CampaignsParticipantsResponse[] | null
  >(null);
  const [participantCampaignInDetail, setParticipantCampaignInDetail] =
    useState<CampaignsParticipantsResponse | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Use a controller to clean up the request if the component unmounts
    const controller = new AbortController();

    const checkAuth = async () => {
      // 1. Quick Guard: If there's no token at all, don't even try refreshing
      if (!pb.authStore.isValid) {
        return navigate("/auth?role=creator");
      }

      try {
        // 2. Refresh the session
        // 'requestKey: null' disables auto-cancellation for this specific call
        const authData = await pb.collection("users").authRefresh({
          requestKey: null,
        });

        // 3. Role Authorization
        if (authData.record.role !== UserRole.CREATOR) {
          return navigate("/brand");
        }

        // 4. Fetch Data (In a nested try/catch so a data error doesn't log you out)
        try {
          const creator = await pb
            .collection("creators")
            .getFirstListItem<CreatorsResponse>(
              `user = "${pb.authStore.record?.id}"`,
              {
                $cancelKey: "creator-fetch",
                expand: "campaigns_participants(creator).campaign.brand",
              },
            );

          setParticipantCampaigns(
            creator?.expand["campaigns_participants(creator)"],
          );

          // Reset to an empty object
          creator.expand = {};
          setCreator(creator);
          setActiveView("Home");
        } catch (dataErr: any) {
          if (dataErr.isAbort || dataErr.status === 0) return;
          console.error(
            "Data fetch failed, but user is still logged in:",
            dataErr,
          );
          // Maybe navigate to an error page instead of logging out?
        }
      } catch (authErr: any) {
        // 5. The Critical Fix: Ignore cancellations
        if (authErr.isAbort || authErr.status === 0) return;

        // Only clear and redirect if the server actually rejected the token
        console.error("Auth session expired or invalid:", authErr);
        pb.authStore.clear();
        navigate("/auth?role=creator");
      }
    };

    checkAuth();

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
      case "Home":
        return <Home />;
      case "MyCampaignDetail":
        return <MyCampaignDetail />;
      case "Submissions":
        return <Submissions />;
      case "Wallet":
        return <Wallet />;
      case "Campaigns":
        navigate("/home");
        return;
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <CreatorDashboardProvider
      data={{
        activeView,
        setActiveView,
        creator,
        participantCampaigns,
        setParticipantCampaigns,
        participantCampaignInDetail,
        setParticipantCampaignInDetail,
        viewNavTree,
        setViewNavTree,
      }}
    >
      <CreatorDashboardLayout>{renderContent()}</CreatorDashboardLayout>
    </CreatorDashboardProvider>
  );
};

export default CreatorDashboard;
