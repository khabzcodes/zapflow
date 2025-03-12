'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryClient = getQueryClient();

function makeQueryClient() {
  return new QueryClient();
}

function getQueryClient() {
  return makeQueryClient();
}

export function QueryClientProviderWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
