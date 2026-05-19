import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoList } from "../TodoList";

const mockUseFetch = vi.fn();

vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

describe("TodoList — unit", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("renders spinner while loading", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });
    const { container } = render(<TodoList userId={1} />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: "Request failed" });
    render(<TodoList userId={1} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("ERROR: Request failed")).toBeInTheDocument();
  });

  it("renders stats, create form and search bar when data is loaded", () => {
    mockUseFetch.mockReturnValue({
      data: [{ id: 1, userId: 1, title: "write tests", completed: false }],
      loading: false,
      error: null,
    });
    render(<TodoList userId={1} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write a task (text only)...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search TODOs...")).toBeInTheDocument();
  });
});
