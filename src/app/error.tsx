"use client";

import { useEffect } from "react";

import EmptyState from "@atoms/emptyState/EmptyState";

interface ErrorStateProps {
  error: Error;
}

// error boundaries
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Upss!" subtitle="Algo ha ocurrido!" />;
};

export default ErrorState;
