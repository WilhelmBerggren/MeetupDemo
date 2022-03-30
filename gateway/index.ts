import { ApolloServer } from "apollo-server";
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "Users", url: "http://users:4001" },
      { name: "Cars", url: "http://users:4002" },
    ],
  }),
  buildService({ url }) {
    return new RemoteGraphQLDataSource({ url });
  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
