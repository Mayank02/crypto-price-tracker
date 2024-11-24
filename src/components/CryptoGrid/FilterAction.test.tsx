import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterAction from "./FilterAction";

describe("FilterAction Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders the filter input with the provided filter value", () => {
    const filter = "Bitcoin";
    const setFilter = jest.fn();

    render(<FilterAction filter={filter} setFilter={setFilter} />);

    const inputElement = screen.getByPlaceholderText("Filter cryptocurrencies");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(filter);
  });

  test("calls setFilter when the input value changes after debounce", () => {
    const filter = "";
    const setFilter = jest.fn();

    render(<FilterAction filter={filter} setFilter={setFilter} />);

    const inputElement = screen.getByPlaceholderText("Filter cryptocurrencies");
    fireEvent.change(inputElement, { target: { value: "Ethereum" } });

    // Fast-forward the debounce timer
    jest.advanceTimersByTime(500);

    expect(setFilter).toHaveBeenCalledWith("Ethereum");
  });
});
