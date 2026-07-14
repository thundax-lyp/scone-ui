import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

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
        expect(inline).toHaveClass("flex", "flex-row", "flex-wrap", "gap-md", "items-baseline");
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

    it("passes root attributes, className, style, event handlers, and ref to the root container", () => {
        const ref = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();

        render(
            <SconeInline
                ref={ref}
                id="inline-actions"
                role="group"
                aria-label="Inline actions"
                data-testid="inline-root"
                data-scone-layout="caller"
                onClick={onClick}
                className="custom-inline"
                style={{ maxWidth: 320 }}
            >
                <span>Inline content</span>
            </SconeInline>,
        );

        const inline = screen.getByTestId("inline-root");

        inline.click();

        expect(ref.current).toBe(inline);
        expect(ref.current).toHaveClass("custom-inline", "gap-sm", "items-center");
        expect(ref.current).toHaveAttribute("id", "inline-actions");
        expect(ref.current).toHaveAttribute("role", "group");
        expect(ref.current).toHaveAttribute("aria-label", "Inline actions");
        expect(ref.current).toHaveAttribute("data-scone-layout", "inline");
        expect(ref.current).toHaveStyle({ maxWidth: "320px" });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
