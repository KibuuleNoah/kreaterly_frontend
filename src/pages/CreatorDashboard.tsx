import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../layouts/CreatorDashboardLayout";
import Wallet from "../components/CreatorDashboardViews/Wallet";
import Home from "../components/CreatorDashboardViews/Home";
import LogOutButton from "../components/LogOutButton";
import LoadingScreen from "../components/LoadingScreen";
import { CreatorDashboardProvider } from "../components/contexts/CreatorDashboardContext";
import { useNavigate } from "react-router-dom";
import Submissions from "../components/CreatorDashboardViews/Submissions";

const CreatorDashboard = () => {
  const [activeView, setActiveView] = useState("Home");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // Refresh the token to get the latest user data from server
  //       const authData = await pb.collection('users').authRefresh({
  //         requestKey: null
  //       });
  //
  //       // Verify the role is specifically "creator"
  //       if (authData.record.role !== UserRole.CREATOR) {
  //         navigate('/brand')
  //       }
  //
  //      setActiveView('Home')
  //     } catch (err: any) {
  //       if (err.isAbort) return
  //       pb.authStore.clear();
  //       navigate('/auth?role=creator');
  //     }
  //   };
  //
  //   checkAuth();
  // }, [navigate]);

  const renderContent = () => {
    switch (activeView) {
      case "Home":
        return <Home />;
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
    <CreatorDashboardProvider data={{ activeView, setActiveView }}>
      <CreatorDashboardLayout>
        {renderContent()}
        <LogOutButton />
        {/*<button onClick={()=>{setActiveView("New")}}>Click</button>*/}
      </CreatorDashboardLayout>
    </CreatorDashboardProvider>
  );
};

export default CreatorDashboard;
