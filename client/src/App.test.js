import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Renders correctly", () => {
  it("Display the header", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Office quotes/)).toBeInTheDocument();
  });
});
