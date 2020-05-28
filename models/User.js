import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  password: String,
});

const model = mongoose.model("User", userSchema);

export default model;
