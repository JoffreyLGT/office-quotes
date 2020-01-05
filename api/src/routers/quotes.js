import express from "express";
import QuoteModel from "../models/Quote";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/api/quotes", auth, async (request, response) => {
  try {
    var quote = new QuoteModel(request.body);
    var result = await quote.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/api/quotes", async (request, response) => {
  try {
    var quotes = await QuoteModel.find().exec();
    response.send(quotes);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/api/quotes/:id", async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    response.send(quote);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/api/quotes/:id", auth, async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    quote.set(request.body);
    var updatedQuote = await quote.save();
    response.send(updatedQuote);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/api/quotes/:id", auth, async (request, response) => {
  try {
    var result = await QuoteModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
