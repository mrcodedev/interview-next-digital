import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoCreateForm } from "../TodoCreateForm";

describe("TodoCreateForm", () => {
  it("calls handlers when typing and clicking add", () => {
    const onChangeTitle = vi.fn();
    const onAddTodo = vi.fn();

    render(
      <TodoCreateForm
        title=""
        validationError=""
        onChangeTitle={onChangeTitle}
        onAddTodo={onAddTodo}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Write a task (text only)..."), {
      target: { value: "Read docs" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(onChangeTitle).toHaveBeenCalledWith("Read docs");
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });

  it("submits on Enter and displays validation error", () => {
    const onAddTodo = vi.fn();

    render(
      <TodoCreateForm
        title="Task"
        validationError="Title cannot be empty."
        onChangeTitle={vi.fn()}
        onAddTodo={onAddTodo}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText("Write a task (text only)..."), { key: "Enter" });

    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(screen.getByText("⚠ Title cannot be empty.")).toBeInTheDocument();
  });
});
