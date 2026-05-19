import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRecentAlbumsContext } from "../useRecentAlbumsContext";
import {
  RecentAlbumsContext,
  type RecentAlbumsContextType,
} from "../../context/RecentAlbumsContextObject";

describe("useRecentAlbumsContext", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useRecentAlbumsContext())).toThrow(
      "useRecentAlbumsContext should be used within RecentAlbumsProvider"
    );
  });

  it("returns context value when provider is present", () => {
    const value: RecentAlbumsContextType = {
      recentAlbums: [],
      addRecentAlbum: () => {},
      clearRecentAlbums: () => {},
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <RecentAlbumsContext.Provider value={value}>{children}</RecentAlbumsContext.Provider>
    );

    const { result } = renderHook(() => useRecentAlbumsContext(), { wrapper });

    expect(result.current).toBe(value);
  });
});
