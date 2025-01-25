import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PreferencesProvider from "./contexts/PreferencesProvider";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./AppRouter.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PreferencesProvider>
          <AppRouter />
        </PreferencesProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
