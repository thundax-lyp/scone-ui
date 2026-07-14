import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

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
            "min-h-control-md",
            "gap-sm",
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

    it("supports root attributes, compact density, className, event handlers, style, and ref", () => {
        const ref = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();

        render(
            <SconeToolbar
                ref={ref}
                id="table-toolbar"
                role="toolbar"
                aria-label="Table toolbar"
                data-testid="toolbar-root"
                data-scone-layout="caller"
                onClick={onClick}
                density="compact"
                className="custom-toolbar"
                style={{ minWidth: 360 }}
                start="Summary"
                end="Actions"
            />,
        );

        const toolbar = screen.getByTestId("toolbar-root");

        toolbar.click();

        expect(ref.current).toBe(toolbar);
        expect(ref.current).toHaveClass("custom-toolbar", "min-h-control-sm", "gap-xs");
        expect(ref.current).toHaveAttribute("id", "table-toolbar");
        expect(ref.current).toHaveAttribute("role", "toolbar");
        expect(ref.current).toHaveAttribute("aria-label", "Table toolbar");
        expect(ref.current).toHaveAttribute("data-scone-layout", "toolbar");
        expect(ref.current).toHaveStyle({ minWidth: "360px" });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
