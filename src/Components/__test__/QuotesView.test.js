import React from "react";
import { render } from "@testing-library/react";
import QuotesView from "../QuotesView";
import { quoteSamples } from "../../Helpers/dataSample";

describe("Renders correctly", () => {
  it("Displays the view", () => {
    const { getByText } = render(<QuotesView />);
    expect(getByText(quoteSamples[0].author)).toBeInTheDocument();
  });
  it("Displays the Add quote button", () => {
    const { getByLabelText } = render(<QuotesView />);
    expect(getByLabelText("add")).toBeInTheDocument();
  });
});
