import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FallbackPhoto, PhotoWithFallback } from "../PhotoWithFallback";

describe("PhotoWithFallback", () => {
  it("uses fallback image source when the original image fails", () => {
    render(<PhotoWithFallback src="https://example.test/image.png" alt="cover" fallbackId={5} />);

    const image = screen.getByAltText("cover") as HTMLImageElement;
    fireEvent.error(image);

    expect(image.src).toContain("https://picsum.photos/seed/5/150");
  });
});

describe("FallbackPhoto", () => {
  it("renders icon with large size when requested", () => {
    const { container } = render(<FallbackPhoto size="lg" />);
    expect(container.querySelector(".w-6.h-6")).toBeInTheDocument();
  });
});
