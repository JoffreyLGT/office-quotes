import { quoteSamples } from "../dataSample";
import {
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  addQuote
} from "../data";

import axiosMock from "axios";

jest.mock("axios");

it("Gets all the quotes", async () => {
  axiosMock.get.mockResolvedValue({ data: quoteSamples });
  expect(await getQuotes()).toBe(quoteSamples);
});

it("Gets a specific quote", async () => {
  const quote = quoteSamples[0];
  axiosMock.get.mockResolvedValue({ data: quote });
  expect(await getQuote(quote.id)).toBe(quote);
});

it("Tries to get a quote that doesn't exist, get an empty object", async () => {
  const expectedReturn = {};
  axiosMock.get.mockResolvedValue({ data: expectedReturn });
  expect(await getQuote(-2555)).toBe(expectedReturn);
});

it("Updates a quote", async () => {
  const quote = quoteSamples[0];
  const newQuote = {
    id: quote.id,
    author: "El capitan",
    content: "Hello world",
    date: new Date(Date.now()).toISOString()
  };
  axiosMock.put.mockResolvedValue({ data: newQuote });
  expect(await updateQuote(quote.id, newQuote)).toBe(newQuote);
});

it("Deletes a quote", async () => {
  const quote = quoteSamples[0];
  axiosMock.delete.mockResolvedValueOnce({ ok: 1, deletedCount: 1 });
  expect(await deleteQuote(quote.id)).toBeTruthy();
  axiosMock.delete.mockResolvedValueOnce({ ok: 0, deletedCount: 0 });
  expect(await deleteQuote("-2555")).toBeFalsy();
});
