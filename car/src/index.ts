import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { Cars } from "./db";
import { Resolvers } from "./generated/graphql";

const schema = readFileSync("./src/schema.gql", "utf-8");

const typeDefs = gql(schema);

const resolvers: Resolvers = {
  Mutation: {
    async addCar(_, { carInput }) {
      console.log({ carInput });
      const newCar = new Cars({
        ...carInput,
      });

      await newCar.save();
      return newCar;
    },
    updateCar: async (_, { id }) => {
      if (id === undefined) {
        return null;
      }
      const car = Cars.findOne({ id });
      await Cars.updateOne({ id }, { $set: car });
      return Cars.findOne({ id });
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
      const car = await Cars.findOne({ id });
      return car;
    },
  },
  Car: {
    async __resolveReference({ id }) {
      return Cars.findOne({ id });
    },
    user(car) {
      console.log({ car });
      if (!car.userId) {
        return null;
      }
      return {
        __typename: "User",
        id: car.userId,
      };
    },
  },
  User: {
    cars: async (user: { id: string }) => {
      return await Cars.find({ userId: user.id });
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
