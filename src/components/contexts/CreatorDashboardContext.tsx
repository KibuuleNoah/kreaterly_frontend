import React, { type ReactNode } from "react";
import type { CreatorDashboardContextType } from "../../types";

export const CreatorDashboardCtx = React.createContext<
  CreatorDashboardContextType | undefined
>(undefined);

export const CreatorDashboardProvider: React.FC<{
  children: ReactNode;
  data: CreatorDashboardContextType;
}> = ({ children, data }) => {
  return (
    <CreatorDashboardCtx.Provider value={data}>
      {children}
    </CreatorDashboardCtx.Provider>
  );
};
