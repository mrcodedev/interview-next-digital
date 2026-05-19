import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserInitialsAvatar } from "../UserInitialsAvatar";

describe("UserInitialsAvatar", () => {
  it("renders initials from a full name", () => {
    render(
      <UserInitialsAvatar
        name="John Doe"
        containerClassName="avatar-container"
        textClassName="avatar-text"
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("respects provided class names", () => {
    render(
      <UserInitialsAvatar
        name="Alice Brown"
        containerClassName="avatar-container"
        textClassName="avatar-text"
      />
    );

    expect(screen.getByText("AB").parentElement).toHaveClass("avatar-container");
    expect(screen.getByText("AB")).toHaveClass("avatar-text");
  });
});
