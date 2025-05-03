import {} from "better-auth/client";
import { createAuthClient } from "better-auth/react";
import { createContext, useContext } from "react";
import { APIClient } from "../main";

export interface AppContextInterface {
  api: APIClient;
  auth: ReturnType<typeof createAuthClient>;
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
