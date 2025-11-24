import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/core/providers/AppProviders";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/core/error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppProviders>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export { App };
