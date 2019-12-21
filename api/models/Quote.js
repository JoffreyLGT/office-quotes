import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Quote = new Schema({
  author: String,
  content: String,
  date: String
});

export default mongoose.model("Quote", Quote);
