import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserCard } from "../UserCard";
import type { User } from "../../../types";

const user: User = {
  id: 7,
  name: "John Doe",
  username: "jdoe",
  email: "john@sample.dev",
  phone: "1-222",
  website: "sample.dev",
  address: {
    street: "Main",
    suite: "Apt 2",
    city: "Madrid",
    zipcode: "28001",
    geo: { lat: "0", lng: "0" },
  },
  company: {
    name: "Acme",
    catchPhrase: "Build better",
    bs: "platforms",
  },
};

describe("UserCard", () => {
  it("renders user details and navigation link", () => {
    render(
      <MemoryRouter>
        <UserCard user={user} />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@jdoe")).toBeInTheDocument();
    expect(screen.getByText("john@sample.dev")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/users/7");
  });
});
