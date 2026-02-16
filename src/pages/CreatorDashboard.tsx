import React, { useState } from "react";
import Index from '../components/CreatorDashboardViews/Index';
import CreatorDashboardLayout from '../layouts/CreatorDashboardLayout';
import type { CreatorDashboardContextType } from "../types";
import Wallet from "../components/CreatorDashboardViews/Wallet";
import Campaigns from "../components/CreatorDashboardViews/Campaings";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const CreatorDashboardCtx = React.createContext<CreatorDashboardContextType | undefined>(undefined)
const CreatorDashboard = () => {

  const [activeView, setActiveView] = useState('Home');

  const renderContent = () => {
    switch(activeView) {
      case 'Wallet': return <Wallet />; 
      case 'Campaigns': return <Campaigns /> 
      default: return <Index />;
    }
  };

  return (
    <CreatorDashboardCtx.Provider value={{ activeView, setActiveView }}>
      <CreatorDashboardLayout Ctx={ CreatorDashboardCtx }>
        {renderContent()}
        {/*<button onClick={()=>{setActiveView("New")}}>Click</button>*/}
      </CreatorDashboardLayout>
    </CreatorDashboardCtx.Provider>
  )
}

    
export default CreatorDashboard;
