import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InvestmentCalculator } from "./InvestmentCalculator";

const cryptos = [
  {
    id: "bitcoin-USD",
    name: "Bitcoin",
    price: "50000",
    display_name: "bitcoin-USD",
    volume: "100",
  },
  {
    id: "ethereum-USD",
    name: "Ethereum",
    price: "4000",
    display_name: "ethereum-USD",
    volume: "100",
  },
];

describe("InvestmentCalculator Component", () => {
  test("renders the investment calculator with the provided cryptos", () => {
    render(
      <InvestmentCalculator cryptos={cryptos} filteredCryptos={cryptos} />
    );

    expect(screen.getByText("Select Cryptocurrency:")).toBeInTheDocument();
    expect(screen.getByText("Investment Amount (USD):")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
  });

  test.skip("calculates the correct crypto amount based on investment", () => {
    render(
      <InvestmentCalculator cryptos={cryptos} filteredCryptos={cryptos} />
    );

    // Select Bitcoin
    fireEvent.change(screen.getByLabelText("Select Cryptocurrency"), {
      target: { value: "bitcoin-USD" },
    });

    // Enter investment amount
    fireEvent.change(screen.getByLabelText("Investment Amount"), {
      target: { value: "1000" },
    });
    // Fast-forward the debounce timer
    jest.advanceTimersByTime(500);
    expect(
      screen.getByText(
        "You would own 0.020000 Bitcoin for an investment of $1000."
      )
    ).toBeInTheDocument();
  });

  test("displays message when no crypto is selected or investment amount is zero", () => {
    render(
      <InvestmentCalculator cryptos={cryptos} filteredCryptos={cryptos} />
    );

    expect(
      screen.getByText(
        "Please select a cryptocurrency and enter an investment amount."
      )
    ).toBeInTheDocument();
  });
});
