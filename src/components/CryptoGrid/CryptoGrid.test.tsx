import { render, screen, fireEvent } from "@testing-library/react";
import CryptoGrid from "./CryptoGrid";
import { Crypto } from "../../store/Context";

const mockCryptos: Crypto[] = [
  {
    id: "1",
    display_name: "Bitcoin",
    price: "50000",
    volume: "1000",
    favorite: true,
  },
  {
    id: "2",
    display_name: "Ethereum",
    price: "4000",
    volume: "500",
    favorite: false,
  },
];

const mockMarkCryptoAsFavorite = jest.fn();
const mockSetFilter = jest.fn();

describe("CryptoGrid", () => {
  it("renders the grid with cryptos", () => {
    render(
      <CryptoGrid
        cryptos={mockCryptos}
        markCryptoAsFavorite={mockMarkCryptoAsFavorite}
        isLoaded={true}
        lastUpdated="2023-10-01"
        setFilter={mockSetFilter}
        filter=""
      />
    );

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("displays 'No data found' when no cryptos are available", () => {
    render(
      <CryptoGrid
        cryptos={[]}
        markCryptoAsFavorite={mockMarkCryptoAsFavorite}
        isLoaded={true}
        lastUpdated="2023-10-01"
        setFilter={mockSetFilter}
        filter=""
      />
    );

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("displays 'Loading...' when data is not loaded", () => {
    render(
      <CryptoGrid
        cryptos={[]}
        markCryptoAsFavorite={mockMarkCryptoAsFavorite}
        isLoaded={false}
        lastUpdated=""
        setFilter={mockSetFilter}
        filter=""
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calls markCryptoAsFavorite when favorite icon is clicked", () => {
    render(
      <CryptoGrid
        cryptos={mockCryptos}
        markCryptoAsFavorite={mockMarkCryptoAsFavorite}
        isLoaded={true}
        lastUpdated="2023-10-01"
        setFilter={mockSetFilter}
        filter=""
      />
    );

    const favoriteIcon = screen.getAllByText("★")[0];
    fireEvent.click(favoriteIcon);

    expect(mockMarkCryptoAsFavorite).toHaveBeenCalledWith("1");
  });

  it("displays the last updated date", () => {
    render(
      <CryptoGrid
        cryptos={mockCryptos}
        markCryptoAsFavorite={mockMarkCryptoAsFavorite}
        isLoaded={true}
        lastUpdated="2023-10-01"
        setFilter={mockSetFilter}
        filter=""
      />
    );

    expect(screen.getByText("Last Updated:")).toBeInTheDocument();
    expect(screen.getByText("2023-10-01")).toBeInTheDocument();
  });
});
