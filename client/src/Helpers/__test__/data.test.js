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

beforeEach(() => {
  global.console = { error: jest.fn() };
});

const checkErrorIsThrown = async func => {
  const reject = () => Promise.reject({ error: "error" });
  axiosMock.get.mockImplementation(reject);
  axiosMock.put.mockImplementation(reject);
  axiosMock.post.mockImplementation(reject);
  axiosMock.delete.mockImplementation(reject);
  await func();
  expect(console.error).toBeCalled();
};

it("Gets all the quotes", async () => {
  axiosMock.get.mockResolvedValue({ data: quoteSamples });
  expect(await getQuotes()).toBe(quoteSamples);
  await checkErrorIsThrown(getQuotes);
});

it("Gets a specific quote", async () => {
  const quote = quoteSamples[0];
  axiosMock.get.mockResolvedValue({ data: quote });
  expect(await getQuote(quote.id)).toBe(quote);
  await checkErrorIsThrown(async () => await getQuote(quote.id));
});

it("Tries to get a quote that doesn't exist, get an empty object", async () => {
  const expectedReturn = {};
  axiosMock.get.mockResolvedValue({ data: expectedReturn });
  expect(await getQuote(-2555)).toBe(expectedReturn);
  await checkErrorIsThrown(async () => await getQuote(-2555));
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
  await checkErrorIsThrown(async () => await updateQuote(quote.id, newQuote));
});

it("Deletes a quote", async () => {
  const quote = quoteSamples[0];
  axiosMock.delete.mockResolvedValueOnce({ ok: 1, deletedCount: 1 });
  expect(await deleteQuote(quote.id)).toBeTruthy();
  axiosMock.delete.mockResolvedValueOnce({ ok: 0, deletedCount: 0 });
  expect(await deleteQuote("-2555")).toBeFalsy();
  await checkErrorIsThrown(async () => await deleteQuote("-2555"));
});

it("Adds a quote", async () => {
  const quote = {
    ...quoteSamples[0]
  };
  delete quote._id;
  axiosMock.post.mockResolvedValue({ data: quoteSamples[0] });
  const result = await addQuote(quote);
  expect(await result).toBeTruthy();
  delete result._id;
  expect(result).toStrictEqual(quote);

  await checkErrorIsThrown(async () => await addQuote(quote));
});
