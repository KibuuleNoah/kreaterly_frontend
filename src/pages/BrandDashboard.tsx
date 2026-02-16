import React, { useState } from "react";
import BrandDashboardLayout from '../layouts/BrandDashboardLayout';
import type { BrandDashboardContextType } from "../types";
// import { Icon } from "../components/Icons";
// Import specific Tabler icons



const BrandDashboardCtx = React.createContext<BrandDashboardContextType | undefined>(undefined)
const BrandDashboard = () => {

  const [activeView, setActiveView] = useState('Home');

  // const renderContent = () => {
  //   switch(activeView) {
  //     case 'Wallet': return <Wallet />; 
  //     case 'Campaigns': return <Campaigns /> 
  //     default: return <Index />;
  //   }
  // };

  return (
    <BrandDashboardCtx.Provider value={{ activeView, setActiveView }}>
      <BrandDashboardLayout Ctx={ BrandDashboardCtx }>
        {/*renderContent()*/}
        {activeView}
        <button onClick={()=>{setActiveView("New")}}>Click</button>
      </BrandDashboardLayout>
    </BrandDashboardCtx.Provider>
  )
}

    
export default BrandDashboard;
