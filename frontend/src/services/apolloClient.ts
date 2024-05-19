import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

const cache = new InMemoryCache();

const createAuthLink = (authService: any) =>
  setContext(async (_, { headers }) => {
    const token = await authService.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const createErrorLink = (authService: any) => {
  let isRefreshing = false;
  let pendingRequests: any[] = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
  };

  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHORIZED") {
          if (!isRefreshing) {
            isRefreshing = true;
            return fromPromise(
              authService
                .refreshToken()
                .then((newAccessToken: string) => {
                  resolvePendingRequests();
                  return newAccessToken;
                })
                .catch(() => {
                  pendingRequests = [];
                  authService.logout();
                  window.location.href = "/login";
                })
                .finally(() => {
                  isRefreshing = false;
                })
            ).flatMap((newAccessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newAccessToken}`,
                },
              });
              return forward(operation);
            });
          } else {
            return fromPromise(
              new Promise<void>((resolve) => {
                pendingRequests.push(() => resolve());
              })
            ).flatMap(() => forward(operation));
          }
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
};

const createApolloClient = (authService: any) => {
  const authLink = createAuthLink(authService);
  const errorLink = createErrorLink(authService);

  return new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache,
  });
};

export default createApolloClient;
