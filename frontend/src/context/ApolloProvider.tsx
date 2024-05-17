"use client";
import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../services/apolloClient";
import createAuthService from "../services/authService";

interface ApolloClientProviderProps {
  children: ReactNode;
}
const authService = createAuthService();

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => {
  const apolloClient = createApolloClient(authService);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
