import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import axiosMock from "axios";
import { quoteSamples } from "./Helpers/dataSample";
jest.mock("axios");

describe("Renders correctly", () => {
  axiosMock.get.mockResolvedValue({ data: quoteSamples });
  it("Displays the header", async () => {
    const { findByText } = render(<App />);
    expect(await findByText(/Office quotes/)).toBeInTheDocument();
  });
  it("Displays a quote", async () => {
    const { findByText } = render(<App />);
    expect(await findByText(quoteSamples[0].author)).toBeInTheDocument();
  });
});
