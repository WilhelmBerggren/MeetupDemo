import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { User, Users } from "./userConnector";

const schema = readFileSync("./src/schema.gql", "utf-8");

const typeDefs = gql(schema);

const resolvers = {
  Mutation: {
    async addUser(_, { userInput }: { userInput: User }) {
      const newUser = new Users({
        ...userInput,
      });

      await newUser.save();
      return newUser;
    },
    async removeUser(_, { id }) {
      await Users.deleteOne({ id });
      return true;
    },
  },
  Query: {
    async users() {
      return Users.find();
    },
    async user(_, { id }) {
      return Users.findOne({ id });
    },
    async me() {
      return { id: "1", username: "@ava" };
    },
  },
  User: {
    async __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
