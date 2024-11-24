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

  test("calculates the correct crypto amount based on investment", async () => {
    render(
      <InvestmentCalculator cryptos={cryptos} filteredCryptos={cryptos} />
    );

    fireEvent.keyDown(screen.getByText("Select..."), {
      key: "ArrowDown",
    });

    const existingItem = await screen.findByText("bitcoin-USD");
    fireEvent.click(existingItem);

    // Enter investment amount
    fireEvent.change(screen.getByLabelText("Investment Amount (USD):"), {
      target: { value: "1000" },
    });

    const result = screen.getByTestId("result-text");
    expect(result.textContent).toEqual(
      "You would own 0.020000 bitcoin for an investment of $1000."
    );
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
