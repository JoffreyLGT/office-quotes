import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";

describe("Renders correctly", () => {
  it("Display the header", () => {
    const { getByText } = render(<Header />, { wrapper: MemoryRouter });
    expect(getByText(/Office quotes/)).toBeInTheDocument();
    expect(getByText(/Login/)).toBeInTheDocument();
  });
});
