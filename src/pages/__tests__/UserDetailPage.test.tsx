import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserDetailPage } from "../UserDetailPage";
import type { User } from "../../types";

const mockUseFetch = vi.fn();

vi.mock("../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

vi.mock("../../hooks/useRecentAlbumsContext", () => ({
  useRecentAlbumsContext: () => ({
    recentAlbums: [],
    addRecentAlbum: vi.fn(),
    clearRecentAlbums: vi.fn(),
  }),
}));

const testUser: User = {
  id: 1,
  name: "Alice Smith",
  username: "alice",
  email: "alice@test.dev",
  phone: "111-222",
  website: "alice.dev",
  address: {
    street: "A St",
    suite: "1",
    city: "NYC",
    zipcode: "10001",
    geo: { lat: "0", lng: "0" },
  },
  company: { name: "Corp", catchPhrase: "cp", bs: "bs" },
};

const renderUserDetailPage = (userId = "1") =>
  render(
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Routes>
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("UserDetailPage", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
    mockUseFetch.mockImplementation((url: string | null) => {
      if (url && url.match(/\/users\/\d+$/) && !url.includes("albums") && !url.includes("todos")) {
        return { data: testUser, loading: false, error: null };
      }
      return { data: null, loading: false, error: null };
    });
  });

  it("renders spinner while loading the user", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });
    const { container } = renderUserDetailPage();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: "Not found" });
    renderUserDetailPage();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders nothing when user data is absent without an error", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });
    const { container } = renderUserDetailPage();
    expect(container.firstChild).toBeNull();
  });

  it("renders user name and username when data is loaded", () => {
    renderUserDetailPage();
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("@alice")).toBeInTheDocument();
  });

  it("renders user info chips with email and city", () => {
    renderUserDetailPage();
    expect(screen.getByText("alice@test.dev")).toBeInTheDocument();
    expect(screen.getByText("NYC")).toBeInTheDocument();
  });

  it("renders albums tab active by default", () => {
    renderUserDetailPage();
    expect(screen.getByRole("button", { name: "Albums" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ToDos" })).toBeInTheDocument();
  });
});
