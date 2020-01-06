import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Quote = new Schema({
  author: String,
  content: String,
  date: String,
  userId: String
});

export default mongoose.model("Quote", Quote);
