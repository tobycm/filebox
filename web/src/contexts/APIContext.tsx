import { createContext, useContext } from "react";
import { APIClient } from "../main";

export interface AppContextInterface {
  api: APIClient;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export default AppContext;
