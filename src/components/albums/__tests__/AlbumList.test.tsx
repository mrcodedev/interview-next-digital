import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AlbumList } from "../AlbumList";
import type { Album } from "../../../types";

const mockUseFetch = vi.fn();
const mockAddRecentAlbum = vi.fn();

vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

vi.mock("../../../hooks/useRecentAlbumsContext", () => ({
  useRecentAlbumsContext: () => ({ addRecentAlbum: mockAddRecentAlbum }),
}));

vi.mock("../AlbumCard", () => ({
  AlbumCard: ({ album, onVisit }: { album: Album; onVisit: () => void }) => (
    <button onClick={onVisit}>open-{album.id}</button>
  ),
}));

describe("AlbumList", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
    mockAddRecentAlbum.mockReset();
  });

  it("renders loading and error states", () => {
    mockUseFetch.mockReturnValueOnce({ data: null, loading: true, error: null, status: "loading" });
    const { container, rerender } = render(<AlbumList userId={1} />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();

    mockUseFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: "Network error",
      status: "error",
    });
    rerender(<AlbumList userId={1} />);
    expect(screen.getByText("ERROR: Network error")).toBeInTheDocument();
  });

  it("renders null when albums data is null", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      status: "success",
    });

    const { container } = render(<AlbumList userId={1} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders albums and stores the selected recent album", () => {
    const albums: Album[] = [
      { id: 10, userId: 1, title: "first" },
      { id: 11, userId: 1, title: "second" },
    ];

    mockUseFetch.mockReturnValue({
      data: albums,
      loading: false,
      error: null,
      status: "success",
    });

    render(<AlbumList userId={1} />);

    fireEvent.click(screen.getByRole("button", { name: "open-10" }));
    expect(mockAddRecentAlbum).toHaveBeenCalledWith(albums[0]);
  });
});
