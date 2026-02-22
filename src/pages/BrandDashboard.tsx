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
import CreateCampaign from "../components/BrandDashboardViews/CreateCampaign";
import LoadingScreen from "../components/LoadingScreen";
import BrandFirstTime from "../components/BrandDashboardViews/BrandFirstTime";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const BrandDashboardCtx = React.createContext<BrandDashboardContextType | undefined>(undefined)
const BrandDashboard = () => {

  const [activeView, setActiveView] = useState('Home');
  const [isBrandFirstTime, setIsBrandFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        navigate('/auth?role=brand'); 
      }
    };


    const checkIfBrandFirstTime = async () => {

      try{
        await pb.collection('campaigns').getFirstListItem(`user_id="${pb.authStore.record?.id}"`);
      }catch(err: any){
        if (err.status == 404){
          setIsBrandFirstTime(true)
        }
      }
      setIsLoading(false)
    };
    
    checkAuth();
    checkIfBrandFirstTime();

  }, [navigate]);

  const renderContent = () => {
    switch(activeView) {
      case 'Settings': return <Settings />
      case 'Review Content': return <ReviewContent />
      case 'Calendar': return <Calendar />
      case 'Comments': return <Comments />
      case 'Create Campaign': return <CreateCampaign Ctx={BrandDashboardCtx}/>
      default: return <Home Ctx={BrandDashboardCtx} />;
    }
  };



  return (
    <BrandDashboardCtx.Provider value={{ activeView, setActiveView, setIsLoading }}>
    {isLoading && (<LoadingScreen />)}
    {!isLoading && isBrandFirstTime && activeView != 'Create Campaign'
      ? (<BrandFirstTime Ctx={ BrandDashboardCtx }/>)
      : (
      <BrandDashboardLayout Ctx={ BrandDashboardCtx }>
        {renderContent()}
      </BrandDashboardLayout>
      )
    }
    </BrandDashboardCtx.Provider>
  )
}

export default BrandDashboard;
