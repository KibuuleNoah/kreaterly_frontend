import React, { type ReactNode } from "react";
import type { BrandDashboardContextType } from "../../types";

export const BrandDashboardCtx = React.createContext<
  BrandDashboardContextType | undefined
>(undefined);

export const BrandDashboardProvider: React.FC<{
  children: ReactNode;
  data: BrandDashboardContextType;
}> = ({ children, data }) => {
  return (
    <BrandDashboardCtx.Provider value={data}>
      {children}
    </BrandDashboardCtx.Provider>
  );
};
