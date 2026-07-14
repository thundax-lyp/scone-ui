import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeCompact } from "./compact";

describe("SconeCompact", () => {
    it("renders horizontal compact grouping with default md sizing", () => {
        render(
            <SconeCompact>
                <button type="button">First</button>
                <button type="button">Second</button>
            </SconeCompact>,
        );

        const compact = screen.getByText("First").parentElement;

        expect(compact).toHaveAttribute("data-scone-layout", "compact");
        expect(compact).toHaveAttribute("data-orientation", "horizontal");
        expect(compact).toHaveAttribute("data-size", "md");
        expect(compact).toHaveClass(
            "inline-flex",
            "isolate",
            "flex-row",
            "[&>*]:min-h-[var(--scone-control-height-md)]",
        );
    });

    it("supports vertical orientation, sm sizing, className, and ref without cloning children", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeCompact ref={ref} orientation="vertical" size="sm" className="custom-compact">
                <button type="button" data-state="loading">
                    Save
                </button>
                <button type="button" disabled>
                    Cancel
                </button>
            </SconeCompact>,
        );

        expect(ref.current).toBe(screen.getByText("Save").parentElement);
        expect(ref.current).toHaveClass(
            "custom-compact",
            "flex-col",
            "[&>*]:min-h-[var(--scone-control-height-sm)]",
        );
        expect(screen.getByText("Save")).toHaveAttribute("data-state", "loading");
        expect(screen.getByText("Cancel")).toBeDisabled();
    });
});
