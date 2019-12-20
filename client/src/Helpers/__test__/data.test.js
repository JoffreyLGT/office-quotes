import { getQuotes, getQuote, updateQuote, deleteQuote } from "../data";
import { quoteSamples } from "../dataSample";

it("Gets all the quotes", () => {
  expect(getQuotes).toBe(quoteSamples);
});

it("Gets a specific quote", () => {
  const quote = quoteSamples[0];
  expect(getQuote(quote.id)).toBe(quote);
});

if (
  ("Tries to get a quote that doesn't exist, get null",
  () => {
    expect(getQuote(-2555)).toBeNull();
  })
)
  it("Updates a quote", () => {
    const quote = quoteSamples[0];
    const newQuote = {
      id: quote.id,
      author: "El capitan",
      content: "Hello world",
      date: new Date(Date.now()).toISOString()
    };
    expect(updateQuote(quote.id, newQuote)).toBeTruthy();
    expect(getQuote(quote.id)).toBe(newQuote);
  });

it("Deletes a quote", () => {
  const quote = quoteSamples[0];
  expect(deleteQuote(quote.id)).toBeTruthy();
  expect(deleteQuote(-2555)).toBeFalsy();
});
