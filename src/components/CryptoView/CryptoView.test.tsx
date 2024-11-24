import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CryptoViewContext } from "../../store/Context";
import { CryptoView } from "./CryptoView";

const mockContextValue = {
  cryptos: [
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
  ],
  filteredCryptos: [
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
  ],
  markCryptoAsFavorite: jest.fn(),
  isLoaded: true,
  lastUpdated: "2023-10-01",
  setFilter: jest.fn(),
  filter: "",
  isError: "",
};

describe("CryptoView Component", () => {
  test("renders the CryptoView component with provided context values", () => {
    render(
      <CryptoViewContext.Provider value={mockContextValue}>
        <CryptoView />
      </CryptoViewContext.Provider>
    );
    fireEvent.click(screen.getByTestId("accordion-button"));
    expect(screen.getByText("Investment Calculator")).toBeInTheDocument();
    // expect(screen.getByText("bitcoin")).toBeInTheDocument();
    // expect(screen.getByText("ethereum")).toBeInTheDocument();
  });
});
