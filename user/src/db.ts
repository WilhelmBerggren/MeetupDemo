import mongoose from "mongoose";
// import { User } from "./generated/graphql";

mongoose.connect("mongodb://mongo:27017");

const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error:");
});

export type User = {
  id: string;
  username: String;
};

const userSchema = new mongoose.Schema<User>({
  username: {
    required: true,
    type: String,
  },
});

const Users = mongoose.model<User>("Users", userSchema);

export { Users };