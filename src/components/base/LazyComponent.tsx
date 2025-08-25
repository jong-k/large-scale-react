import { Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

interface LazyComponentProps {
  component: LazyExoticComponent<ComponentType>;
  fallback?: React.ReactNode;
}

export default function LazyComponent({ component: Component, fallback = <div>Loading...</div> }: LazyComponentProps) {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}
