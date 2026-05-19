import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoSearchBar } from "../TodoSearchBar";

describe("TodoSearchBar", () => {
  it("calls onChangeFilter when user types", () => {
    const onChangeFilter = vi.fn();

    render(
      <TodoSearchBar
        filter=""
        resultsCount={0}
        onChangeFilter={onChangeFilter}
        onClearFilter={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search TODOs..."), {
      target: { value: "plan" },
    });

    expect(onChangeFilter).toHaveBeenCalledWith("plan");
  });

  it("shows result summary and clear action when filter exists", () => {
    const onClearFilter = vi.fn();

    render(
      <TodoSearchBar
        filter="plan"
        resultsCount={2}
        onChangeFilter={vi.fn()}
        onClearFilter={onClearFilter}
      />
    );

    expect(screen.getByText("2 results for")).toBeInTheDocument();
    expect(screen.getByText('"plan"')).toBeInTheDocument();

    const clearButton = document.querySelector("button");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton as HTMLButtonElement);
    expect(onClearFilter).toHaveBeenCalledTimes(1);
  });
});
