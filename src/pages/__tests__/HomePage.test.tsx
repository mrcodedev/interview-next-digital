import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../HomePage";
import type { Album } from "../../types";

const mockClearRecentAlbums = vi.fn();
const mockRecentAlbums: Album[] = [];

vi.mock("../../hooks/useRecentAlbumsContext", () => ({
  useRecentAlbumsContext: () => ({
    recentAlbums: mockRecentAlbums,
    clearRecentAlbums: mockClearRecentAlbums,
  }),
}));

const renderHomePage = () =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

describe("HomePage", () => {
  it("renders navigation link to users page", () => {
    renderHomePage();
    expect(screen.getByRole("link", { name: /ver usuarios/i })).toBeInTheDocument();
  });

  it("renders the recent albums section heading", () => {
    renderHomePage();
    expect(screen.getByText(/recién visitados/i)).toBeInTheDocument();
  });

  it("shows empty state when there are no recent albums", () => {
    renderHomePage();
    expect(screen.getByText(/todavía no has visitado ningún álbum/i)).toBeInTheDocument();
  });

  it("shows recent album titles and clear button when albums exist", () => {
    mockRecentAlbums.push({ id: 42, userId: 1, title: "My Album" } as Album);
    renderHomePage();

    expect(screen.getByText(/my album/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /limpiar/i })).toBeInTheDocument();

    mockRecentAlbums.pop();
  });

  it("calls clearRecentAlbums when clear button is clicked", () => {
    mockClearRecentAlbums.mockReset();
    mockRecentAlbums.push({ id: 1, userId: 1, title: "Album X" } as Album);
    renderHomePage();

    fireEvent.click(screen.getByRole("button", { name: /limpiar/i }));
    expect(mockClearRecentAlbums).toHaveBeenCalledOnce();

    mockRecentAlbums.pop();
  });
});
