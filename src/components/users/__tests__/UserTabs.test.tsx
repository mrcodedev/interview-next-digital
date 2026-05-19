import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserTabs } from "../UserTabs";

describe("UserTabs", () => {
  it("renders all tabs and highlights the active tab", () => {
    const tabs = [
      { key: "albums", label: "Albums" },
      { key: "todos", label: "ToDos" },
    ] as const;

    render(<UserTabs tabs={tabs} activeTab="albums" onSelectTab={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Albums" })).toHaveClass("text-indigo-600");
    expect(screen.getByRole("button", { name: "ToDos" })).not.toHaveClass("text-indigo-600");
  });

  it("calls onSelectTab with the selected key", () => {
    const onSelectTab = vi.fn();
    const tabs = [
      { key: "albums", label: "Albums" },
      { key: "todos", label: "ToDos" },
    ] as const;

    render(<UserTabs tabs={tabs} activeTab="albums" onSelectTab={onSelectTab} />);

    fireEvent.click(screen.getByRole("button", { name: "ToDos" }));
    expect(onSelectTab).toHaveBeenCalledWith("todos");
  });
});
