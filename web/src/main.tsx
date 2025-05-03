import { treaty } from "@elysiajs/eden";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import type { FileboxAPI } from "../../backend/src/index";
import AppContext from "./contexts/APIContext.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const client = treaty<FileboxAPI>("localhost:3456");

export type APIClient = typeof client;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContext.Provider value={{ api: client }}>
      <App />
    </AppContext.Provider>
  </StrictMode>
);
