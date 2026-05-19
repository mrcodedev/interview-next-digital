import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoStats } from "../TodoStats";

describe("TodoStats", () => {
  it("renders total, pending and completed counters", () => {
    render(<TodoStats total={7} pending={3} completed={4} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
