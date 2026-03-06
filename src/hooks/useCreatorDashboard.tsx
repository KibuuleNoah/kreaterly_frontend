import { useContext } from "react";
import { CreatorDashboardCtx } from "../components/contexts/CreatorDashboardContext";

export const useCreatorDashboard = () => {
  const context = useContext(CreatorDashboardCtx);

  if (context === undefined) {
    throw new Error(
      "useBrandDashboard must be used within a BrandDashboardProvider",
    );
  }

  return context;
};
