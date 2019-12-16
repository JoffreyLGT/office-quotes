import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Renders correctly", () => {
  it("Display the footer", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Copyright/)).toBeInTheDocument();
  });
});
