import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeTooltip } from "./tooltip";

describe("SconeTooltip", () => {
    it("shows short content when controlled open", () => {
        render(
            <SconeTooltip content="Refresh data" open>
                <button type="button">Refresh</button>
            </SconeTooltip>,
        );

        expect(screen.getByRole("tooltip")).toHaveTextContent("Refresh data");
    });

    it("uses unique tooltip ids for multiple open instances", () => {
        render(
            <>
                <SconeTooltip content="Refresh data" open>
                    <button type="button">Refresh</button>
                </SconeTooltip>
                <SconeTooltip content="Export report" open>
                    <button type="button">Export</button>
                </SconeTooltip>
            </>,
        );

        const tooltips = screen.getAllByRole("tooltip");
        const tooltipIds = tooltips.map((tooltip) => tooltip.id);

        expect(new Set(tooltipIds).size).toBe(tooltips.length);
        expect(screen.getByRole("button", { name: "Refresh" })).toHaveAttribute(
            "aria-describedby",
            tooltips[0].id,
        );
        expect(screen.getByRole("button", { name: "Export" })).toHaveAttribute(
            "aria-describedby",
            tooltips[1].id,
        );
    });

    it("opens from focus and closes from blur", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeTooltip content="Refresh data" onOpenChange={onOpenChange}>
                <button type="button">Refresh</button>
            </SconeTooltip>,
        );

        fireEvent.focus(screen.getByRole("button", { name: "Refresh" }));
        fireEvent.blur(screen.getByRole("button", { name: "Refresh" }));

        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("opens from hover and closes from pointer leave", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeTooltip content="Refresh data" onOpenChange={onOpenChange}>
                <button type="button">Refresh</button>
            </SconeTooltip>,
        );

        const trigger = screen.getByRole("button", { name: "Refresh" });
        fireEvent.pointerMove(trigger);
        fireEvent.pointerLeave(trigger);

        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("closes with Escape", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeTooltip content="Refresh data" defaultOpen onOpenChange={onOpenChange}>
                <button type="button">Refresh</button>
            </SconeTooltip>,
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
});
