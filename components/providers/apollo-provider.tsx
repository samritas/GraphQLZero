"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useMemo, type ReactNode } from "react";
import { createApolloClient } from "@/lib/apollo/client";

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
