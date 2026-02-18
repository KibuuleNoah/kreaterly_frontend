import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from '../layouts/CreatorDashboardLayout';
import { UserRole, type CreatorDashboardContextType } from "../types";
import Wallet from "../components/CreatorDashboardViews/Wallet";
import Campaigns from "../components/CreatorDashboardViews/Campaings";
import Home from "../components/CreatorDashboardViews/Home";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../components/LogOutButton";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const CreatorDashboardCtx = React.createContext<CreatorDashboardContextType | undefined>(undefined)
const CreatorDashboard = () => {
  const [activeView, setActiveView] = useState('Loading');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Refresh the token to get the latest user data from server
        const authData = await pb.collection('users').authRefresh({
          requestKey: null
        });
        
        // Verify the role is specifically "creator"
        if (authData.record.role !== UserRole.CREATOR) {
          navigate('/brand')
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
      case 'Home': return <Home />
      case 'Wallet': return <Wallet />;
      case 'Campaigns': return <Campaigns />;
      default: return <div>Loading...</div>;
    }
  };

 return (
    <CreatorDashboardCtx.Provider value={{ activeView, setActiveView }}>
      <CreatorDashboardLayout Ctx={ CreatorDashboardCtx }>
        {renderContent()}
        <LogOutButton />
        {/*<button onClick={()=>{setActiveView("New")}}>Click</button>*/}
      </CreatorDashboardLayout>
    </CreatorDashboardCtx.Provider>
  )
}

    
export default CreatorDashboard;
