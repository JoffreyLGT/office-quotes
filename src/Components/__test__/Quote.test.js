import React from "react";
import { render } from "@testing-library/react";
import Quote from "../Quote";
import { quotes } from "../../Helpers/data";

const { author, quote } = quotes[0];

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByText } = render(<Quote author={author} quote={quote} />);
    expect(getByText(author)).toBeInTheDocument();
    expect(getByText(quote)).toBeInTheDocument();
  });
});
