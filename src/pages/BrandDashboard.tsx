import React, { useState } from "react";
import BrandDashboardLayout from '../layouts/BrandDashboardLayout';
import type { BrandDashboardContextType } from "../types";
import Home from "../components/BrandDashboardViews/Home";
// import Analytics from "../components/BrandDashboardViews/Analytics";
import Settings from "../components/BrandDashboardViews/Settings";
import ReviewContent from "../components/BrandDashboardViews/ReviewContent";
import Calendar from "../components/BrandDashboardViews/Calendar";
import Comments from "../components/BrandDashboardViews/Comments";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const BrandDashboardCtx = React.createContext<BrandDashboardContextType | undefined>(undefined)
const BrandDashboard = () => {

  const [activeView, setActiveView] = useState('Home');

  const renderContent = () => {
    switch(activeView) {
      case 'Settings': return <Settings />
      case 'Review Content': return <ReviewContent />
      case 'Calendar': return <Calendar />
      case 'Comments': return <Comments />
      // case 'Messaging': return <Messaging />
      default: return <Home />;
    }
  };

  return (
    <BrandDashboardCtx.Provider value={{ activeView, setActiveView }}>
      <BrandDashboardLayout Ctx={ BrandDashboardCtx }>
        {activeView}
        {renderContent()}
      </BrandDashboardLayout>
    </BrandDashboardCtx.Provider>
  )
}

    
export default BrandDashboard;
