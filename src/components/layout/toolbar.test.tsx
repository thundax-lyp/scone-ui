import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeToolbar } from "./toolbar";

describe("SconeToolbar", () => {
    it("renders start and end regions with default density", () => {
        render(
            <SconeToolbar
                start={<span>Filters</span>}
                end={<button type="button">Create</button>}
            />,
        );

        const toolbar = screen.getByText("Filters").parentElement?.parentElement;

        expect(toolbar).toHaveAttribute("data-scone-layout", "toolbar");
        expect(toolbar).toHaveAttribute("data-density", "default");
        expect(toolbar).toHaveClass(
            "flex",
            "w-full",
            "flex-wrap",
            "items-center",
            "justify-between",
            "min-h-[var(--scone-toolbar-height-default)]",
            "gap-[var(--scone-spacing-sm)]",
        );
        expect(toolbar?.querySelector("[data-scone-toolbar-start]")).toHaveTextContent("Filters");
        expect(toolbar?.querySelector("[data-scone-toolbar-end]")).toHaveTextContent("Create");
    });

    it("renders custom children instead of start and end regions", () => {
        render(
            <SconeToolbar start="Ignored" end="Ignored">
                <div>Custom toolbar</div>
            </SconeToolbar>,
        );

        const toolbar = screen.getByText("Custom toolbar").parentElement;

        expect(toolbar?.querySelector("[data-scone-toolbar-start]")).toBeNull();
        expect(toolbar?.querySelector("[data-scone-toolbar-end]")).toBeNull();
        expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
    });

    it("supports compact density, className, and ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeToolbar
                ref={ref}
                density="compact"
                className="custom-toolbar"
                start="Summary"
                end="Actions"
            />,
        );

        expect(ref.current).toBe(screen.getByText("Summary").parentElement?.parentElement);
        expect(ref.current).toHaveClass(
            "custom-toolbar",
            "min-h-[var(--scone-toolbar-height-compact)]",
            "gap-[var(--scone-spacing-xs)]",
        );
    });
});
