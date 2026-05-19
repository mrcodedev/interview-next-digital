import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UsersPage } from "../UsersPage";
import type { User } from "../../types";

const mockUseFetch = vi.fn();

vi.mock("../../hooks/useFetch", () => ({
  useFetch: () => mockUseFetch(),
}));

const renderUsersPage = () =>
  render(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>
  );

describe("UsersPage", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("renders spinner while loading", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });
    const { container } = renderUsersPage();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: "Network error" });
    renderUsersPage();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it("renders a card for each user when data is loaded", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice Smith",
        username: "alice",
        email: "alice@test.dev",
        phone: "111",
        website: "alice.dev",
        address: {
          street: "A St",
          suite: "1",
          city: "NYC",
          zipcode: "10001",
          geo: { lat: "0", lng: "0" },
        },
        company: { name: "Corp", catchPhrase: "cp", bs: "bs" },
      },
      {
        id: 2,
        name: "Bob Jones",
        username: "bob",
        email: "bob@test.dev",
        phone: "222",
        website: "bob.dev",
        address: {
          street: "B St",
          suite: "2",
          city: "LA",
          zipcode: "90001",
          geo: { lat: "1", lng: "1" },
        },
        company: { name: "Acme", catchPhrase: "cp2", bs: "bs2" },
      },
    ];
    mockUseFetch.mockReturnValue({ data: users, loading: false, error: null });
    renderUsersPage();
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Jones")).toBeInTheDocument();
  });

  it("renders page heading", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });
    renderUsersPage();
    expect(screen.getByRole("heading", { name: /usuarios/i })).toBeInTheDocument();
  });
});
