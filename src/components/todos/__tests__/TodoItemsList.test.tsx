import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItemsList } from "../TodoItemsList";
import type { Todo } from "../../../types";

const todos: Todo[] = [
  { id: 1, userId: 1, title: "write tests", completed: false },
  { id: 2, userId: 1, title: "review code", completed: true },
];

describe("TodoItemsList", () => {
  it("renders todos and triggers toggle/delete callbacks", () => {
    const onToggleTodo = vi.fn();
    const onDeleteTodo = vi.fn();

    render(
      <TodoItemsList
        todos={todos}
        filter=""
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    );

    expect(screen.getByText("write tests")).toBeInTheDocument();
    expect(screen.getByText("review code")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(onToggleTodo).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getAllByRole("button", { name: "Delete todo" })[1]);
    expect(onDeleteTodo).toHaveBeenCalledWith(2);
  });

  it("shows empty state message", () => {
    render(
      <TodoItemsList todos={[]} filter="task" onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />
    );

    expect(screen.getByText('No TODOs match "task"')).toBeInTheDocument();
  });
});
