import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddQuote from "../AddQuote";

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByLabelText } = render(<AddQuote />);
    expect(getByLabelText(/add/)).toBeInTheDocument();
  });

  it("Correctly call the addQuote function from props", () => {
    const quote = {
      author: "Donaldo",
      content: "He fired 75 bullets!"
    };
    const addQuote = jest.fn();
    const { getByLabelText } = render(<AddQuote onSend={addQuote} />);

    fireEvent.click(getByLabelText(/add/));

    fireEvent.change(getByLabelText(/Author/), {
      target: { value: quote.author }
    });
    fireEvent.change(getByLabelText(/Quote/), {
      target: { value: quote.content }
    });

    fireEvent.click(getByLabelText(/send/));

    expect(addQuote).toBeCalledWith(quote.author, quote.content);
  });
});
