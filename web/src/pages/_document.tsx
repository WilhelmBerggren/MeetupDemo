import Document, { DocumentContext, DocumentProps } from "next/document";

import { getDataFromTree } from "@apollo/client/react/ssr";
import { getApolloClient } from "../apollo-client";

class DocumentWithApollo extends Document {
  // Reference: https://gist.github.com/Tylerian/16d48e5850b407ba9e3654e17d334c1e
  constructor(
    props: DocumentProps & {
      apolloState: any;
      __NEXT_DATA__: DocumentProps & { apolloState: any };
    }
  ) {
    super(props);

    /**
     * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
     */
    const { __NEXT_DATA__, apolloState } = props;
    __NEXT_DATA__.apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext & { appProps: any }) {
    const startTime = Date.now();

    const apolloClient = getApolloClient(true);

    await getDataFromTree(<ctx.AppTree {...ctx.appProps} />);

    const initialProps = await Document.getInitialProps(ctx);

    const apolloState = apolloClient.extract();

    console.log({ state: JSON.stringify(apolloState, null, 2) });

    console.info(`Render Time: ${Date.now() - startTime} milliseconds.`);

    return { ...initialProps, apolloState };
  }
}

export default DocumentWithApollo;
