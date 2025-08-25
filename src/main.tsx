import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import LazyComponent from "./components/base/LazyComponent.tsx";
import StatsigProvider from "./components/common/StatsigProvider.tsx";
import { ColorSchemeProvider } from "./contexts/colorScheme/ColorSchemeProvider.tsx";
import InteractionImportPage from "./pages/InteractionImportPage.tsx";
import IntersectionObserverPage from "./pages/IntersectionObserverPage.tsx";

const ContextPage = lazy(() => import("./pages/ContextPage.tsx"));
const RtlTextPage = lazy(() => import("./pages/RtlTextPage.tsx"));
const AbTestPage = lazy(() => import("./pages/AbTestPage.tsx"));
const CounterPage = lazy(() => import("./pages/CounterPage.tsx"));
const GenericComponentPage = lazy(() => import("./pages/GenericComponentPage.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StatsigProvider>
      <ColorSchemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/interaction-import" element={<InteractionImportPage />} />
            <Route path="/intersection-observer" element={<IntersectionObserverPage />} />
            <Route path="/context" element={<LazyComponent component={ContextPage} />} />
            <Route path="rtl-text" element={<LazyComponent component={RtlTextPage} />} />
            <Route path="ab-test" element={<LazyComponent component={AbTestPage} />} />
            <Route path="/counter" element={<LazyComponent component={CounterPage} />} />
            <Route path="/generic-component" element={<LazyComponent component={GenericComponentPage} />} />
          </Routes>
        </BrowserRouter>
      </ColorSchemeProvider>
    </StatsigProvider>
  </StrictMode>
);
