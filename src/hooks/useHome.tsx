import { useContext } from "react";
import { HomeCtx } from "../components/contexts/HomeContext";

export const useHome = () => {
  const context = useContext(HomeCtx);

  if (context === undefined) {
    throw new Error("useHome must be used within a HomeProvider");
  }

  return context;
};
