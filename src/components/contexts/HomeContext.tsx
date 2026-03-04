import React, { type ReactNode } from "react";
import type { HomeContextType } from "../../types";

export const HomeCtx = React.createContext<HomeContextType | undefined>(
  undefined,
);

export const HomeProvider: React.FC<{
  children: ReactNode;
  data: HomeContextType;
}> = ({ children, data }) => {
  return <HomeCtx.Provider value={data}>{children}</HomeCtx.Provider>;
};
