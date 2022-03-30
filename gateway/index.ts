import { ApolloServer } from "apollo-server";
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";

const services = Object.keys(process.env)
  .filter((key) => key.match(/^SERVICE_/))
  .map((key) => ({
    name: key.replace(/^SERVICE_/, "").toLowerCase(),
    url: process.env[key],
  }));

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: services,
  }),
  buildService({ url }) {
    return new RemoteGraphQLDataSource({ url });
  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({ gateway });

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
