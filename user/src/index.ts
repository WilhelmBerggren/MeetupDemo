import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { Users } from "./db";
import { Resolvers, User, UserInput } from "./generated/graphql";

const schema = readFileSync("./src/schema.gql", "utf-8");

const typeDefs = gql(schema);

const resolvers: Resolvers = {
  Mutation: {
    async addUser(_, { userInput }: { userInput: UserInput }) {
      console.log({ userInput });
      const newUser = new Users({
        ...userInput,
      });

      await newUser.save();
      return newUser;
    },
    updateUser: async (_, { id }) => {
      if (id === undefined) {
        return null;
      }
      await Users.updateOne({ id: id }, { $set: {} });
      return Users.findOne({ id: id });
    },
    async removeUser(_, { id }) {
      await Users.deleteOne({ id });
      return id;
    },
  },
  Query: {
    async users() {
      return Users.find();
    },
    async user(_, { id }) {
      return Users.findOne({ id });
    },
  },
  User: {
    async __resolveReference({ id }) {
      return Users.findOne({ id });
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
