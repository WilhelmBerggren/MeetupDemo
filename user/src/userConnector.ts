import mongoose from "mongoose";
// import { User } from "./generated/graphql";

mongoose.connect("mongodb://mongo:27017");

const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error:");
});

export type User = {
  username: String;
};

const userSchema = new mongoose.Schema<User>({
  username: String,
});

const Users = mongoose.model<User>("Users", userSchema);

export { Users };