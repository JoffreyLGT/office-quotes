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

const renderComponent = (user = { _id: 1 }) => {
  return render(<QuotesView user={user} />);
};
describe("Renders correctly with access to the API", () => {
  beforeEach(() => {
    getQuotes.mockResolvedValue(quoteSamples);
  });

  it("Displays the view", async () => {
    const { findByText } = renderComponent(null);
    await findByText(quoteSamples[0].author);
  });

  it("Displays the Add quote button if the user is logged in", async () => {
    const { getByLabelText, findByText } = renderComponent();
    await findByText(quoteSamples[0].author);
    const result = getByLabelText("add");
    expect(result).toBeInTheDocument();
  });

  it("Does not display the add quote button if not logged in", async () => {
    const { findByText, queryByLabelText } = renderComponent(null);
    await findByText(quoteSamples[0].author);
    expect(queryByLabelText("add")).toBeNull();
  });
});

it("Displays the error message", async () => {
  getQuotes.mockResolvedValue({ error: "error" });
  const { getByText } = renderComponent();
  const result = await waitForElement(() => getByText(/Error/));
  expect(result).toBeInTheDocument();
});

// describe("Tests each action", () => {
//   beforeEach(() => {
//     getQuotes.mockResolvedValue(quoteSamples);
//   });

//   it("Tests addQuoteInDb", async () => {
//     const document = render(<QuotesView />);
//     const { getByText } = document;
//     const result = await waitForElement(() =>
//       getByText(quoteSamples[0].author)
//     );
//     expect(result).toBeInTheDocument();
//   });
// });
