import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Renders correctly", () => {
  it("Display the header", () => {
    const { getByText } = render(<Header />);
    expect(getByText(/Office quotes/)).toBeInTheDocument();
    expect(getByText(/Login/)).toBeInTheDocument();
  });
});
