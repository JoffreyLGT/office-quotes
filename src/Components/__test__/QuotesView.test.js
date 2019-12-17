import React from "react";
import { render } from "@testing-library/react";
import QuotesView from "../QuotesView";
import { quotes } from "../../Helpers/data";

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByText } = render(<QuotesView />);
    expect(getByText(quotes[0].author)).toBeInTheDocument();
  });
});
