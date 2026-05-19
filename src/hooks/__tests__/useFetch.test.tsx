// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFetch } from "../useFetch";

describe("useFetch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns idle state when URL is null", () => {
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useFetch<{ id: number }>(null));

    expect(result.current.status).toBe("idle");
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches data successfully", async () => {
    const payload = { id: 1, name: "Leanne" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => payload,
    } as Response);

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useFetch<typeof payload>("https://example.test/users/1"));

    expect(result.current.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns error state when response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({}),
    } as Response);

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useFetch("https://example.test/missing"));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain("404");
    expect(result.current.error).toContain("Not Found");
  });
});
