import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { Car, Cars } from "./carConnector";
// import { Resolvers, CarInput } from "./generated/graphql";

const schema = readFileSync("./src/schema.gql", "utf-8");

const typeDefs = gql(schema);

const resolvers /*: Resolvers*/ = {
  Mutation: {
    async addCar(_, { userInput }: { userInput: Car }) {
      const newUser = new Cars({
        ...userInput,
      });

      await newUser.save();
      return newUser;
    },
    async removeCar(_, { id }) {
      await Cars.deleteOne({ id });
      return true;
    },
  },
  Query: {
    async cars() {
      return Cars.find();
    },
    async car(_, { id }) {
      return Cars.findOne({ id });
    },
  },
  User: {
    async __resolveReference({ id }) {
      return Cars.findOne({ id });
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
