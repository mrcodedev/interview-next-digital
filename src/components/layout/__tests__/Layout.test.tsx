import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "../Layout";

describe("Layout", () => {
  it("renders navbar and page content", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Page Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "SocialApp" })).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
