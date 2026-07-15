import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeCollapsible } from "./collapsible";

describe("SconeCollapsible", () => {
    it("renders content when default open", () => {
        render(
            <SconeCollapsible trigger="More filters" defaultOpen>
                Advanced filters
            </SconeCollapsible>,
        );

        expect(screen.getByText("Advanced filters")).toBeVisible();
        expect(screen.getByRole("button", { name: "More filters" })).toHaveAttribute(
            "aria-expanded",
            "true",
        );
    });

    it("toggles open state from the trigger", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeCollapsible trigger="More filters" onOpenChange={onOpenChange}>
                Advanced filters
            </SconeCollapsible>,
        );

        fireEvent.click(screen.getByRole("button", { name: "More filters" }));

        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("supports controlled open state", () => {
        render(
            <SconeCollapsible trigger="Details" open>
                Visible details
            </SconeCollapsible>,
        );

        expect(screen.getByRole("button", { name: "Details" })).toHaveAttribute(
            "aria-expanded",
            "true",
        );
        expect(screen.getByText("Visible details")).toBeVisible();
    });
});
