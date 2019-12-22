import React from "react";
import { render, waitForElement } from "@testing-library/react";
import QuotesView from "../QuotesView";
import { quoteSamples } from "../../Helpers/dataSample";

import {
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  addQuote
} from "../../Helpers/data";

jest.mock("../../Helpers/data");

describe("Renders correctly with access to the API", () => {
  beforeEach(() => {
    getQuotes.mockResolvedValue(quoteSamples);
  });
  it("Displays the view", async () => {
    const { getByText } = render(<QuotesView />);
    const result = await waitForElement(() =>
      getByText(quoteSamples[0].author)
    );
    expect(result).toBeInTheDocument();
  });
  it("Displays the Add quote button", async () => {
    const { getByLabelText } = render(<QuotesView />);
    const result = await waitForElement(() => getByLabelText("add"));
    expect(result).toBeInTheDocument();
  });
});

it("Displays the error message", async () => {
  getQuotes.mockResolvedValue({ error: "error" });
  const { getByText } = render(<QuotesView />);
  const result = await waitForElement(() => getByText(/Error/));
  expect(result).toBeInTheDocument();
});

describe("Tests each action", () => {
  beforeEach(() => {
    getQuotes.mockResolvedValue(quoteSamples);
  });

  it("Tests addQuoteInDb", async () => {
    const document = render(<QuotesView />);
    const { getByText } = document;
    const result = await waitForElement(() =>
      getByText(quoteSamples[0].author)
    );
    expect(result).toBeInTheDocument();
  });
});
