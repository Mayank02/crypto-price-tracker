import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the crypto view with title", () => {
    render(<Header title="Header Title" />);
    const titleElement = screen.getByText(/Header Title/i);
    expect(titleElement).toBeInTheDocument();
  });
});
