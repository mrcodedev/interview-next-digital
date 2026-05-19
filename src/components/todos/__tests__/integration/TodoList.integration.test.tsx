import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TodoList } from "../../TodoList";
import type { Todo } from "../../../../types";

const mockUseFetch = vi.fn();

vi.mock("../../../../hooks/useFetch", () => ({
  useFetch: (url: string | null) => mockUseFetch(url),
}));

describe("TodoList integration", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("coordinates stats, create form, search bar and items list", async () => {
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

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Write a task (text only)..."), {
      target: { value: "review pr" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("review pr")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search TODOs..."), {
      target: { value: "review" },
    });

    expect(screen.getByText("review pr")).toBeInTheDocument();
    expect(screen.queryByText("read docs")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("review pr")).toHaveClass("line-through");

    fireEvent.click(screen.getAllByRole("button", { name: "Delete todo" })[0]);
    expect(screen.queryByText("review pr")).not.toBeInTheDocument();
  });
});
