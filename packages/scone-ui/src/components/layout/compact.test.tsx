import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

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
        expect(compact).toHaveClass("inline-flex", "isolate", "flex-row", "[&>*]:min-h-control-md");
    });

    it("supports root attributes, vertical orientation, sm sizing, className, and ref without cloning children", () => {
        const ref = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();

        render(
            <SconeCompact
                ref={ref}
                id="compact-group"
                role="group"
                aria-label="Compact actions"
                data-testid="compact-root"
                data-scone-layout="caller"
                onClick={onClick}
                orientation="vertical"
                size="sm"
                className="custom-compact"
                style={{ width: 180 }}
            >
                <button type="button" data-state="loading">
                    Save
                </button>
                <button type="button" disabled>
                    Cancel
                </button>
            </SconeCompact>,
        );

        const compact = screen.getByTestId("compact-root");

        compact.click();

        expect(ref.current).toBe(compact);
        expect(ref.current).toHaveClass("custom-compact", "flex-col", "[&>*]:min-h-control-sm");
        expect(ref.current).toHaveAttribute("id", "compact-group");
        expect(ref.current).toHaveAttribute("role", "group");
        expect(ref.current).toHaveAttribute("aria-label", "Compact actions");
        expect(ref.current).toHaveAttribute("data-scone-layout", "compact");
        expect(ref.current).toHaveStyle({ width: "180px" });
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Save")).toHaveAttribute("data-state", "loading");
        expect(screen.getByText("Cancel")).toBeDisabled();
    });
});
