import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AlbumList } from "../../AlbumList";
import type { Album, Photo } from "../../../../types";

const mockUseFetch = vi.fn();
const mockAddRecentAlbum = vi.fn();

vi.mock("../../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

vi.mock("../../../../hooks/useRecentAlbumsContext", () => ({
  useRecentAlbumsContext: () => ({ addRecentAlbum: mockAddRecentAlbum }),
}));

describe("AlbumList integration", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
    mockAddRecentAlbum.mockReset();
  });

  it("integrates AlbumList with AlbumCard and stores the opened album", async () => {
    const albums: Album[] = [{ id: 10, userId: 1, title: "first album" }];
    const thumbnail: Photo[] = [
      {
        albumId: 10,
        id: 101,
        title: "album thumb",
        url: "https://img/thumb-full",
        thumbnailUrl: "https://img/thumb",
      },
    ];
    const photos: Photo[] = [
      {
        albumId: 10,
        id: 102,
        title: "photo one",
        url: "https://img/photo-full",
        thumbnailUrl: "https://img/photo",
      },
    ];

    mockUseFetch.mockImplementation((url: string | null) => {
      if (url === "https://jsonplaceholder.typicode.com/users/1/albums") {
        return { data: albums, loading: false, error: null, status: "success" };
      }

      if (url === "https://jsonplaceholder.typicode.com/photos?albumId=10&_limit=1") {
        return { data: thumbnail, loading: false, error: null, status: "success" };
      }

      if (url === "https://jsonplaceholder.typicode.com/photos?albumId=10") {
        return { data: photos, loading: false, error: null, status: "success" };
      }

      return { data: null, loading: false, error: null, status: "idle" };
    });

    render(<AlbumList userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("first album")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /album #10/i }));

    expect(mockAddRecentAlbum).toHaveBeenCalledWith(albums[0]);
    expect(await screen.findByAltText("photo one")).toBeInTheDocument();
  });
});
