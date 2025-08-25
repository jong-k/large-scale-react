import { Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

interface LazyRouteProps {
  component: LazyExoticComponent<ComponentType>;
  fallback?: React.ReactNode;
}

export default function LazyRoute({ component: Component, fallback = <div>Loading...</div> }: LazyRouteProps) {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}
