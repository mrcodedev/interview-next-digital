import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../Navbar";

describe("Navbar", () => {
  it("renders brand and main links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "SocialApp" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Users" })).toBeInTheDocument();
  });

  it("marks the active route link", () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Users" })).toHaveClass("text-indigo-600");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("text-indigo-600");
  });
});
