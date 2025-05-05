import {} from "better-auth/client";
import { createContext, useContext } from "react";
import { APIClient } from "../lib/api";
import { AuthClient } from "../lib/auth";

export interface AppContextInterface {
  api: APIClient;
  auth: AuthClient;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}

export default AppContext;
