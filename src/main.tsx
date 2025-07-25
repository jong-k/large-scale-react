import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import InteractionImportPage from "./pages/InteractionImportPage.tsx";
import IntersectionObserverPage from "./pages/IntersectionObserverPage.tsx";

const ContextPage = lazy(() => import("./pages/ContextPage.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/interaction-import" element={<InteractionImportPage />} />
        <Route
          path="/intersection-observer"
          element={<IntersectionObserverPage />}
        />
        <Route
          path="context"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ContextPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
