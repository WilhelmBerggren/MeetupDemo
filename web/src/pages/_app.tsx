import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  const graphqlClient = getApolloClient(false);
  return (
    <ApolloProvider client={graphqlClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
