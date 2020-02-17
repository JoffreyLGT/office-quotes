import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Quote from "../Quote";
import { quoteSamples } from "../../Helpers/dataSample";

const quote = quoteSamples[0];

describe("Renders correctly", () => {
  const user = {
    _id: 1,
    isAdmin: true
  };

  it("Display the view", () => {
    const { getByText } = render(<Quote {...quote} />);
    expect(getByText(quote.author)).toBeInTheDocument();
    expect(getByText(quote.content)).toBeInTheDocument();
  });

  it("Trigger the handleFavoriteQuote event", () => {
    const handleFavoriteQuote = jest.fn();
    const { getByLabelText } = render(
      <Quote {...quote} user={user} handleFavoriteQuote={handleFavoriteQuote} />
    );

    fireEvent.click(getByLabelText(/favorites/));
    expect(handleFavoriteQuote).toBeCalledTimes(1);
  });

  const clickOnAction = getByLabelText => {
    const btnCurrent = getByLabelText("actions");
    fireEvent.click(btnCurrent);
  };

  it("Trigger the handleEditQuote event", () => {
    const handleEditQuote = jest.fn();

    const { getByText, getByLabelText } = render(
      <Quote {...quote} user={user} handleEditQuote={handleEditQuote} />
    );
    clickOnAction(getByLabelText);

    fireEvent.click(getByText("Edit"));
    expect(handleEditQuote).toBeCalledTimes(1);
  });

  it("Trigger the handleDeleteQuote events", () => {
    const handleDeleteQuote = jest.fn();
    const { getByLabelText, getByText } = render(
      <Quote {...quote} user={user} handleDeleteQuote={handleDeleteQuote} />
    );
    clickOnAction(getByLabelText);

    fireEvent.click(getByText("Delete"));
    expect(handleDeleteQuote).toBeCalledTimes(1);
  });
});
