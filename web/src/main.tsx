import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "@mantine/core/styles.css";

import App from "./App.tsx";
import Redirect from "./components/Redirect.tsx";
import AppContext from "./contexts/APIContext.tsx";
import { api } from "./lib/api/index";
import { auth } from "./lib/auth/index";
import Auth from "./pages/Auth/index.tsx";
import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const theme = createTheme({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
setChonkyDefaults({ iconComponent: ChonkyIconFA });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AppContext.Provider value={{ api, auth }}>
        <MantineProvider theme={theme} withCssVariables withGlobalClasses withStaticClasses>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />

              <Route path="auth" element={<Auth />}>
                <Route index element={<Redirect to="/auth/signin" />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  </StrictMode>
);
