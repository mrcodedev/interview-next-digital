// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useRecentAlbums } from "../useRecentAlbums";
import type { Album } from "../../types";

const STORAGE_KEY = "recent_albums";

const buildAlbum = (id: number): Album => ({
  id,
  userId: 1,
  title: `album-${id}`,
});

describe("useRecentAlbums", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when localStorage.getItem throws error", () => {
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = () => {
      throw new Error("Storage error");
    };

    const { result } = renderHook(() => useRecentAlbums());

    expect(result.current.recentAlbums).toEqual([]);

    localStorage.getItem = originalGetItem;
  });

  it("loads initial albums from localStorage", () => {
    const initial = [buildAlbum(1), buildAlbum(2)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));

    const { result } = renderHook(() => useRecentAlbums());

    expect(result.current.recentAlbums).toEqual(initial);
  });

  it("adds albums keeping latest first, unique and max length of 5", () => {
    const { result } = renderHook(() => useRecentAlbums());

    act(() => {
      [1, 2, 3, 4, 5, 6].forEach((id) => {
        result.current.addRecentAlbum(buildAlbum(id));
      });
    });

    expect(result.current.recentAlbums).toHaveLength(5);
    expect(result.current.recentAlbums.map((a) => a.id)).toEqual([6, 5, 4, 3, 2]);

    act(() => {
      result.current.addRecentAlbum(buildAlbum(4));
    });

    expect(result.current.recentAlbums.map((a) => a.id)).toEqual([4, 6, 5, 3, 2]);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Album[];
    expect(stored.map((a) => a.id)).toEqual([4, 6, 5, 3, 2]);
  });

  it("clears albums from state and localStorage", () => {
    const { result } = renderHook(() => useRecentAlbums());

    act(() => {
      result.current.addRecentAlbum(buildAlbum(1));
      result.current.addRecentAlbum(buildAlbum(2));
    });

    expect(result.current.recentAlbums).toHaveLength(2);

    act(() => {
      result.current.clearRecentAlbums();
    });

    expect(result.current.recentAlbums).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
