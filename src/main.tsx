import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import StatsigProvider from "./components/common/StatsigProvider.tsx";
import { ColorSchemeProvider } from "./contexts/colorScheme/ColorSchemeProvider.tsx";
import InteractionImportPage from "./pages/InteractionImportPage.tsx";
import IntersectionObserverPage from "./pages/IntersectionObserverPage.tsx";

const ContextPage = lazy(() => import("./pages/ContextPage.tsx"));
const RtlTextPage = lazy(() => import("./pages/RtlTextPage.tsx"));
const AbTestPage = lazy(() => import("./pages/AbTestPage.tsx"));
const CounterPage = lazy(() => import("./pages/CounterPage.tsx"));
const GenericComponentPage = lazy(() => import("./pages/GenericComponentPage.tsx"));
const TransitionPage = lazy(() => import("./pages/TransitionPage.tsx"));

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <StatsigProvider>
      <ColorSchemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route index element={<App />} />
              <Route path="/interaction-import" element={<InteractionImportPage />} />
              <Route path="/intersection-observer" element={<IntersectionObserverPage />} />
              <Route path="/context" element={<ContextPage />} />
              <Route path="/rtl-text" element={<RtlTextPage />} />
              <Route path="/ab-test" element={<AbTestPage />} />
              <Route path="/counter" element={<CounterPage />} />
              <Route path="/generic-component" element={<GenericComponentPage />} />
              <Route path="/transition" element={<TransitionPage />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ColorSchemeProvider>
    </StatsigProvider>
  </StrictMode>
);
