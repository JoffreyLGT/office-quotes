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

describe("Renders correctly", () => {
  beforeAll(() => {
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
