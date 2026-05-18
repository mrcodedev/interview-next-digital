import { describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";
import { useState } from "react";

describe("ErrorMessage — integration", () => {
  it("is visible when error is not null", () => {
    const Parent = ({ error }: { error: string | null }) => (
      <div>
        {error && <ErrorMessage message={error} />}
        <p>Content</p>
      </div>
    );

    render(<Parent error="Network error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("ERROR: Network error")).toBeInTheDocument();
  });

  it("is not visible when error is null", () => {
    const Parent = ({ error }: { error: string | null }) => (
      <div>
        {error && <ErrorMessage message={error} />}
        <p>Content</p>
      </div>
    );

    render(<Parent error={null} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("updates the message when the error changes", () => {
    const Parent = () => {
      const [error, setError] = useState("First error");
      return (
        <div>
          <ErrorMessage message={error} />
          <button onClick={() => setError("Second error")}>Change error</button>
        </div>
      );
    };

    render(<Parent />);
    expect(screen.getByText("ERROR: First error")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Change error"));
    expect(screen.getByText("ERROR: Second error")).toBeInTheDocument();
  });

  it("disappears when the error is cleared", async () => {
    const Parent = () => {
      const [error, setError] = useState<string | null>("Something went wrong");
      return (
        <div>
          {error && <ErrorMessage message={error} />}
          <button onClick={() => setError(null)}>Clear error</button>
        </div>
      );
    };

    render(<Parent />);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear error"));

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("renders alongside other components without conflicts", () => {
    render(
      <div>
        <h1>Title</h1>
        <ErrorMessage message="Something went wrong" />
        <p>Footer</p>
      </div>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
