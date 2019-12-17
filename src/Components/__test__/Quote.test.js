import React from "react";
import { render } from "@testing-library/react";
import Quote from "../Quote";
import { quoteSamples } from "../../Helpers/data";

const { author, content } = quoteSamples[0];

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByText } = render(<Quote author={author} content={content} />);
    expect(getByText(author)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });
});
