import React, { useEffect, useState } from "react";
import BrandDashboardLayout from '../layouts/BrandDashboardLayout';
import { UserRole, type BrandDashboardContextType } from "../types";
import Home from "../components/BrandDashboardViews/Home";
// import Analytics from "../components/BrandDashboardViews/Analytics";
import Settings from "../components/BrandDashboardViews/Settings";
import ReviewContent from "../components/BrandDashboardViews/ReviewContent";
import Calendar from "../components/BrandDashboardViews/Calendar";
import Comments from "../components/BrandDashboardViews/Comments";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../components/LogOutButton";
import CreateCampaign from "../components/BrandDashboardViews/CreateCampaign";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const BrandDashboardCtx = React.createContext<BrandDashboardContextType | undefined>(undefined)
const BrandDashboard = () => {

  const [activeView, setActiveView] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Refresh the token to get the latest user data from server
        const authData = await pb.collection('users').authRefresh({
          requestKey: null
        });
        
        // Verify the role is specifically "brand"
        if (authData.record.role !== UserRole.BRAND) {
          navigate('/creator')
        }

       setActiveView('Home') 
      } catch (err: any) {
        if (err.isAbort) return
        pb.authStore.clear();
        navigate('/auth'); 
      }
    };

    checkAuth();
  }, [navigate]);

  const renderContent = () => {
    switch(activeView) {
      case 'Settings': return <Settings />
      case 'Review Content': return <ReviewContent />
      case 'Calendar': return <Calendar />
      case 'Comments': return <Comments />
      case 'New': return <CreateCampaign />
      // case 'Messaging': return <Messaging />
      default: return <Home />;
    }
  };

  return (
    <BrandDashboardCtx.Provider value={{ activeView, setActiveView }}>
      <BrandDashboardLayout Ctx={ BrandDashboardCtx }>
        {activeView}
        {renderContent()}
        {/*<LogOutButton/>*/}
      </BrandDashboardLayout>
    </BrandDashboardCtx.Provider>
  )
}

    
export default BrandDashboard;
