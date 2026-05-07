"use client";

import React, { createContext, useContext } from "react";
import { catalogStore, CatalogStore } from "./CatalogStore";

interface RootStore {
  catalogStore: CatalogStore;
}

const rootStore: RootStore = {
  catalogStore,
};

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
