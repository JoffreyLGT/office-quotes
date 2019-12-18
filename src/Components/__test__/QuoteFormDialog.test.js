import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuoteFormDialog from "../QuoteFormDialog";
import { quoteSamples } from "../../Helpers/data";

describe("Renders correctly", () => {
  it("Display the view", () => {
    const { getByLabelText } = render(<QuoteFormDialog isOpened />);
    expect(getByLabelText(/send/)).toBeInTheDocument();
  });

  it("Correctly call the onSend function", () => {
    const onValidate = jest.fn();
    const { getByLabelText } = render(
      <QuoteFormDialog onValidate={onValidate} isOpened />
    );
    fireEvent.click(getByLabelText(/send/));
    expect(onValidate).toBeCalled();
  });

  it("Correctly call the handleQuoteFormChange function when changing the author", () => {
    const quote = quoteSamples[0];

    const subFunction = jest.fn();
    const handleQuoteFormChange = jest.fn(() => subFunction);
    const { getByLabelText } = render(
      <QuoteFormDialog handleQuoteFormChange={handleQuoteFormChange} isOpened />
    );
    fireEvent.change(getByLabelText("Author"), {
      target: { value: quote.author }
    });

    expect(handleQuoteFormChange).toBeCalledWith("author");
    expect(subFunction).toBeCalledWith(quote.author);
  });

  it("Correctly call the handleQuoteFormChange function when changing the content", () => {
    const quote = quoteSamples[0];

    const subFunction = jest.fn();
    const handleQuoteFormChange = jest.fn(() => subFunction);
    const { getByLabelText } = render(
      <QuoteFormDialog handleQuoteFormChange={handleQuoteFormChange} isOpened />
    );
    fireEvent.change(getByLabelText("Quote"), {
      target: { value: quote.content }
    });

    expect(handleQuoteFormChange).toBeCalledWith("content");
    expect(subFunction).toBeCalledWith(quote.content);
  });

  it("Trigger actions that are not specified and keep sure the component is not crashing", () => {
    const { getByLabelText, getByText } = render(<QuoteFormDialog isOpened />);
    fireEvent.change(getByLabelText("Quote"), {
      target: { value: "hello" }
    });
    fireEvent.change(getByLabelText("Author"), {
      target: { value: "world" }
    });
    fireEvent.click(getByText("Send"));
    fireEvent.click(getByText("Cancel"));
  });
});
