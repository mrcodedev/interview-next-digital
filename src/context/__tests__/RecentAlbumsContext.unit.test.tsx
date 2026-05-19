import { useContext } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentAlbumsProvider } from "../RecentAlbumsContext";
import { RecentAlbumsContext } from "../RecentAlbumsContextObject";

vi.mock("../../hooks/useRecentAlbums", () => ({
  useRecentAlbums: () => ({
    recentAlbums: [],
    addRecentAlbum: vi.fn(),
    clearRecentAlbums: vi.fn(),
  }),
}));

describe("RecentAlbumsProvider", () => {
  it("renders children without errors", () => {
    render(
      <RecentAlbumsProvider>
        <span>child content</span>
      </RecentAlbumsProvider>
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("provides context value with expected shape to consumers", () => {
    let capturedContext: unknown;

    const Consumer = () => {
      capturedContext = useContext(RecentAlbumsContext);
      return null;
    };

    render(
      <RecentAlbumsProvider>
        <Consumer />
      </RecentAlbumsProvider>
    );

    expect(capturedContext).not.toBeNull();
    expect(capturedContext).toHaveProperty("recentAlbums");
    expect(capturedContext).toHaveProperty("addRecentAlbum");
    expect(capturedContext).toHaveProperty("clearRecentAlbums");
  });
});
