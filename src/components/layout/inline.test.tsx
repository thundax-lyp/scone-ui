import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeInline } from "./inline";

describe("SconeInline", () => {
    it("renders horizontal inline content with wrap and token gap", () => {
        render(
            <SconeInline wrap gap="md" align="baseline">
                <span>One</span>
                <span>Two</span>
            </SconeInline>,
        );

        const inline = screen.getByText("One").parentElement;

        expect(inline).toHaveAttribute("data-scone-layout", "inline");
        expect(inline).toHaveAttribute("data-gap", "md");
        expect(inline).toHaveAttribute("data-align", "baseline");
        expect(inline).toHaveAttribute("data-wrap", "");
        expect(inline).toHaveClass(
            "flex",
            "flex-row",
            "flex-wrap",
            "gap-[var(--scone-spacing-md)]",
            "items-baseline",
        );
    });

    it("inserts decorative split content between adjacent children", () => {
        render(
            <SconeInline split="/">
                <span>Alpha</span>
                <span>Beta</span>
                <span>Gamma</span>
            </SconeInline>,
        );

        const inline = screen.getByText("Alpha").parentElement;
        const splits = inline?.querySelectorAll("[data-scone-inline-split]");

        expect(splits).toHaveLength(2);
        expect(splits?.[0]).toHaveAttribute("aria-hidden", "true");
        expect(within(inline as HTMLElement).getAllByText("/")).toHaveLength(2);
    });

    it("passes className, style, and ref to the root container", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeInline ref={ref} className="custom-inline" style={{ maxWidth: 320 }}>
                <span>Inline content</span>
            </SconeInline>,
        );

        expect(ref.current).toBe(screen.getByText("Inline content").parentElement);
        expect(ref.current).toHaveClass(
            "custom-inline",
            "gap-[var(--scone-spacing-sm)]",
            "items-center",
        );
        expect(ref.current).toHaveStyle({ maxWidth: "320px" });
    });
});
