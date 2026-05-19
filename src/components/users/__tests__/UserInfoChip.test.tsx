import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserInfoChip } from "../UserInfoChip";

const TestIcon = ({ className }: { className?: string }) => <svg className={className} />;

describe("UserInfoChip", () => {
  it("renders icon, label and value", () => {
    render(<UserInfoChip icon={TestIcon} label="City" value="Madrid" />);

    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
