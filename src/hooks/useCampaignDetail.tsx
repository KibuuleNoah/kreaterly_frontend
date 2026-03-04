import { useContext } from "react";
import { HomeCtx } from "../components/contexts/HomeContext";
import { BrandDashboardCtx } from "../components/contexts/BrandDashboardContext";

export const useCampaignDetail = () => {
  const home = useContext(HomeCtx);
  const brand = useContext(BrandDashboardCtx);
  // const creatoe = useContext(SettingsContext);

  // Pick the active context
  const activeContext = brand || home;

  // Safety Check: Ensure the context actually contains your required state
  if (!activeContext || !activeContext.activeView) {
    throw new Error(
      "useCampaignDetail must be used within Providers Home, Brand & Creator",
    );
  }

  return activeContext;
};
