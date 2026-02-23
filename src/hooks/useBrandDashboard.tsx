import { useContext } from "react";
import { BrandDashboardCtx } from "../components/contexts/BrandDashboardContext";

export const useBrandDashboard = () => {
  const context = useContext(BrandDashboardCtx);

  if (context === undefined) {
    throw new Error(
      "useBrandDashboard must be used within a BrandDashboardProvider",
    );
  }

  return context;
};
