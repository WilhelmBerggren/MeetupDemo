import mongoose from "mongoose";
// import { User } from "./generated/graphql";

mongoose.connect("mongodb://mongo:27017");

const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error:");
});

export type Car = {
  model: String;
};

const carSchema = new mongoose.Schema<Car>({
  model: String,
});

const Cars = mongoose.model<Car>("Cars", carSchema);

export { Cars };
