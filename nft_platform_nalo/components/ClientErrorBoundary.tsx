"use client";

import { ErrorBoundary } from "react-error-boundary";
import ErrorBasicFallBack from "./ErrorBasicFallBack";

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  pageTitle: string;
}

export default function ClientErrorBoundary({
  children,
  pageTitle,
}: ClientErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorBasicFallBack {...props} pageTitle={pageTitle} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
