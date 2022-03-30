import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { Car, Cars } from "./db";

const schema = readFileSync("./src/schema.gql", "utf-8");

const typeDefs = gql(schema);

const resolvers = {
  Mutation: {
    async addCar(_, { carInput }: { carInput: Car }) {
      console.log({ carInput });
      const newCar = new Cars({
        ...carInput,
      });

      await newCar.save();
      return newCar;
    },
    updateCar: async (_, { car }: { car: Car }) => {
      if (car.id === undefined) {
        return car;
      }
      await Cars.updateOne({ id: car.id }, { $set: car });
      return Cars.findOne({ id: car.id });
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
      console.log({ car });
      return car;
    },
  },
  Car: {
    async __resolveReference({ id }) {
      return Cars.findOne({ id });
    },
    user(car: Car) {
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
