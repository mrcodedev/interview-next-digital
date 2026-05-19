import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../ErrorMessage";

describe("ErrorMessage — unit", () => {
  it("renders without errors", () => {
    render(<ErrorMessage message="Something went wrong" />);
  });

  it("displays the message passed as prop", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText("ERROR: Something went wrong")).toBeInTheDocument();
  });

  it("renders with an empty message", () => {
    render(<ErrorMessage message="" />);
    expect(screen.getByText("ERROR:")).toBeInTheDocument();
  });

  it("renders with a long message", () => {
    const longMessage = "a".repeat(200);
    render(<ErrorMessage message={longMessage} />);
    expect(screen.getByText(`ERROR: ${longMessage}`)).toBeInTheDocument();
  });

  it("has the correct error styles", () => {
    render(<ErrorMessage message="Something went wrong" />);
    const container = screen.getByText("ERROR: Something went wrong");
    expect(container).toHaveClass("bg-red-50", "border-red-200", "text-red-700");
  });

  it("has role alert for accessibility", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
