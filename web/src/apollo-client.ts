import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const isServer = typeof window === "undefined";

let CLIENT: ApolloClient<NormalizedCacheObject>;

export function getApolloClient(forceNew: boolean): typeof CLIENT {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });
  }

  return CLIENT;
}
