import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Model
import QuoteModel from "./models/Quote";

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/office-quotes",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("MongoDB is connected")
);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Basic CRUD
app.post("/api/quote", async (request, response) => {
  try {
    var quote = new QuoteModel(request.body);
    var result = await quote.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/api/quotes", async (request, response) => {
  try {
    var quotes = await QuoteModel.find().exec();
    response.send(quotes);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/api/quote/:id", async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    response.send(quote);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/api/quote/:id", async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    quote.set(request.body);
    var updatedQuote = await quote.save();
    response.send(updatedQuote);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/api/quote/:id", async (request, response) => {
  try {
    var result = await QuoteModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Starts the server
const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
