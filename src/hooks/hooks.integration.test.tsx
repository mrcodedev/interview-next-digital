// @vitest-environment jsdom
import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RecentAlbumsProvider } from "../context/RecentAlbumsContext";
import { useFetch } from "./useFetch";
import { useRecentAlbumsContext } from "./useRecentAlbumsContext";
import type { Album } from "../types";

const STORAGE_KEY = "recent_albums";

const buildAlbum = (id: number): Album => ({
  id,
  userId: 1,
  title: `album-${id}`,
});

describe("hooks integration", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("integrates RecentAlbumsProvider with useRecentAlbumsContext", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <RecentAlbumsProvider>{children}</RecentAlbumsProvider>
    );

    const { result } = renderHook(() => useRecentAlbumsContext(), { wrapper });

    act(() => {
      result.current.addRecentAlbum(buildAlbum(1));
      result.current.addRecentAlbum(buildAlbum(2));
      result.current.addRecentAlbum(buildAlbum(1));
    });

    expect(result.current.recentAlbums.map((album) => album.id)).toEqual([1, 2]);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Album[];
    expect(stored.map((album) => album.id)).toEqual([1, 2]);

    act(() => {
      result.current.clearRecentAlbums();
    });

    expect(result.current.recentAlbums).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("integrates useFetch with rerenders and request execution", async () => {
    const payload = { id: 42, title: "post" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => payload,
    } as Response);

    global.fetch = fetchMock as unknown as typeof fetch;

    const { result, rerender } = renderHook(
      ({ url }: { url: string | null }) => useFetch<typeof payload>(url),
      { initialProps: { url: null } }
    );

    expect(result.current.status).toBe("idle");
    expect(fetchMock).not.toHaveBeenCalled();

    rerender({ url: "https://example.test/posts/42" });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://example.test/posts/42", expect.any(Object));
  });
});
