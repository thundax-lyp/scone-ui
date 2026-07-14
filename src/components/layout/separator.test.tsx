import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeSeparator } from "./separator";

describe("SconeSeparator", () => {
    it("renders a decorative horizontal separator by default", () => {
        render(<SconeSeparator data-testid="separator" />);

        const separator = screen.getByTestId("separator");

        expect(separator).toHaveAttribute("data-scone-layout", "separator");
        expect(separator).toHaveAttribute("data-orientation", "horizontal");
        expect(separator).toHaveAttribute("role", "none");
        expect(separator).toHaveClass("shrink-0", "bg-border", "data-horizontal:h-px");
    });

    it("preserves vertical orientation, semantic separator role, className, and ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeSeparator
                ref={ref}
                id="details-separator"
                decorative={false}
                orientation="vertical"
                aria-label="Details separator"
                data-owner="layout"
                className="custom-separator"
                style={{ marginInline: "8px" }}
                data-testid="separator"
            />,
        );

        const separator = screen.getByTestId("separator");

        expect(ref.current).toBe(separator);
        expect(separator).toHaveAttribute("id", "details-separator");
        expect(separator).toHaveAttribute("role", "separator");
        expect(separator).toHaveAttribute("aria-label", "Details separator");
        expect(separator).toHaveAttribute("aria-orientation", "vertical");
        expect(separator).toHaveAttribute("data-owner", "layout");
        expect(separator).toHaveAttribute("data-orientation", "vertical");
        expect(separator).toHaveClass("custom-separator", "data-vertical:w-px");
        expect(separator).toHaveStyle({ marginInline: "8px" });
    });
});
