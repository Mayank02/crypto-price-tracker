import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./Accordion";

describe("Accordion", () => {
  it("renders the accordion with the given title", () => {
    render(
      <Accordion title="Test Title">
        <div>Test Content</div>
      </Accordion>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("toggles the accordion content on button click", () => {
    render(
      <Accordion title="Test Title">
        <div>Test Content</div>
      </Accordion>
    );

    const button = screen.getByTestId("accordion-button");
    fireEvent.click(button);

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("displays the correct icon based on the accordion state", () => {
    render(
      <Accordion title="Test Title">
        <div>Test Content</div>
      </Accordion>
    );

    const button = screen.getByTestId("accordion-button");
    expect(screen.getByText("+")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("sets aria-expanded attribute correctly based on the accordion state", () => {
    render(
      <Accordion title="Test Title">
        <div>Test Content</div>
      </Accordion>
    );

    const button = screen.getByTestId("accordion-button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
