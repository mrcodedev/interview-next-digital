import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TodoList } from "../TodoList";
import type { Todo } from "../../../types";

const mockUseFetch = vi.fn();

vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

describe("TodoList", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("renders loading and error states", () => {
    mockUseFetch.mockReturnValueOnce({ data: null, loading: true, error: null, status: "loading" });
    const { container, rerender } = render(<TodoList userId={1} />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();

    mockUseFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: "Fetch failed",
      status: "error",
    });
    rerender(<TodoList userId={1} />);

    expect(screen.getByText("ERROR: Fetch failed")).toBeInTheDocument();
  });

  it("loads todos and supports add, validate, filter and delete", async () => {
    const fetchedTodos: Todo[] = [
      { id: 1, userId: 1, title: "read docs", completed: false },
      { id: 2, userId: 1, title: "ship code", completed: true },
    ];

    mockUseFetch.mockReturnValue({
      data: fetchedTodos,
      loading: false,
      error: null,
      status: "success",
    });

    render(<TodoList userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("read docs")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Write a task (text only)..."), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("⚠ Title cannot be empty.")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Write a task (text only)..."), {
      target: { value: "new task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("new task")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Write a task (text only)..."), {
      target: { value: "task 123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("⚠ Title cannot contain numbers, only text.")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("new task")).toHaveClass("line-through");

    fireEvent.change(screen.getByPlaceholderText("Search TODOs..."), {
      target: { value: "ship" },
    });
    expect(screen.getByText("ship code")).toBeInTheDocument();
    expect(screen.queryByText("read docs")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Delete todo" })[0]);
    expect(screen.queryByText("ship code")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(screen.getByText("read docs")).toBeInTheDocument();
  });
});
