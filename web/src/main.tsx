import { treaty } from "@elysiajs/eden";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";

import "@mantine/core/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { FileboxAPI } from "../../backend/src/index";
import AppContext from "./contexts/APIContext.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const client = treaty<FileboxAPI>("localhost:3456");

export type APIClient = typeof client;

const auth = createAuthClient({
  basePath: "/auth",
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
});

export type AuthClient = typeof auth;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ api: client, auth }}>
        <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  </StrictMode>
);
