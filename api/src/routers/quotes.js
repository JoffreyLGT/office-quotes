import express from "express";
import QuoteModel from "../models/Quote";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/api/quotes", auth, async (request, response) => {
  try {
    var quote = new QuoteModel(request.body);
    quote.userId = request.user._id;
    var result = await quote.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/api/quotes", async (request, response) => {
  try {
    var quotes = await QuoteModel.find().exec();
    response.send(
      quotes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    );
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

const isAdminOrAuthor = (quote, user) => {
  return (
    !user.isAdmin &&
    typeof quote.userId !== "undefined" &&
    typeof user._id !== "undefined" &&
    quote.userId.toString() !== user._id.toString()
  );
};

router.put("/api/quotes/:id", auth, async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    if (isAdminOrAuthor(quote, request.user)) {
      return response.status(403).send();
    }
    quote.set(request.body);
    var updatedQuote = await quote.save();
    response.send(updatedQuote);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/api/quotes/:id", auth, async (request, response) => {
  try {
    var quote = await QuoteModel.findById(request.params.id).exec();
    if (isAdminOrAuthor(quote, request.user)) {
      return response.status(403).send();
    }
    var result = await QuoteModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
