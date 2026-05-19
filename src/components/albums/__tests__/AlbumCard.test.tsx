import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AlbumCard } from "../AlbumCard";

const mockUseFetch = vi.fn();

vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

describe("AlbumCard", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("calls onVisit only on first open and shows album photos", () => {
    const onVisit = vi.fn();

    mockUseFetch.mockImplementation((url: string | null) => {
      if (typeof url === "string" && url.includes("_limit=1")) {
        return {
          data: [{ albumId: 1, id: 1, title: "thumb", url: "", thumbnailUrl: "https://img/thumb" }],
          loading: false,
          error: null,
          status: "success",
        };
      }

      if (typeof url === "string" && url.includes("photos?albumId=")) {
        return {
          data: [{ albumId: 1, id: 2, title: "photo", url: "", thumbnailUrl: "https://img/photo" }],
          loading: false,
          error: null,
          status: "success",
        };
      }

      return { data: null, loading: false, error: null, status: "idle" };
    });

    render(<AlbumCard album={{ id: 1, userId: 1, title: "album one" }} onVisit={onVisit} />);

    fireEvent.click(screen.getByRole("button", { name: /album #1/i }));
    expect(screen.getByAltText("photo")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /album #1/i }));
    expect(onVisit).toHaveBeenCalledTimes(1);
  });
});
