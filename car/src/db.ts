import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:27017");

const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error:");
});

export type Car = {
  id: String;
  model: String;
  userId: String;
};

const carSchema = new mongoose.Schema<Car>({
  model: String,
  userId: String,
});

const Cars = mongoose.model<Car>("Cars", carSchema);

export { Cars };
