import React from "react";
import { render } from "@testing-library/react";
import QuotesView from "../QuotesView";

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByText } = render(<QuotesView />);
    expect(getByText(/quotes/)).toBeInTheDocument();
  });
});
