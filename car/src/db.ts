import mongoose from "mongoose";
import { Car } from "./generated/graphql";

mongoose.connect("mongodb://mongo:27017");

const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error:");
});

const carSchema = new mongoose.Schema<Car>({
  model: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
});

const Cars = mongoose.model<Car>("Cars", carSchema);

export { Cars };
