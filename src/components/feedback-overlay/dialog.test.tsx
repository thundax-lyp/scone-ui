import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeDialog } from "./dialog";

describe("SconeDialog", () => {
    it("renders a titled dialog with body and footer", () => {
        render(
            <SconeDialog
                defaultOpen
                title="Export report"
                description="Choose the report format."
                footer={<button data-scone-overlay-close="">Cancel</button>}
            >
                <div>CSV or PDF</div>
            </SconeDialog>,
        );

        expect(screen.getByRole("dialog", { name: "Export report" })).toBeInTheDocument();
        expect(screen.getByText("Choose the report format.")).toBeInTheDocument();
        expect(
            screen.getByText("CSV or PDF").closest("[data-slot=dialog-body]"),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Cancel" }).closest("[data-slot=dialog-footer]"),
        ).toBeInTheDocument();
    });

    it("supports ariaLabel when there is no visible title", () => {
        render(
            <SconeDialog defaultOpen ariaLabel="Report options">
                Options
            </SconeDialog>,
        );

        expect(screen.getByRole("dialog", { name: "Report options" })).toBeInTheDocument();
    });

    it("reports close button and footer close reasons", async () => {
        const onRequestClose = vi.fn();

        render(
            <SconeDialog
                defaultOpen
                title="Export report"
                onRequestClose={onRequestClose}
                footer={<button data-scone-overlay-close="">Cancel</button>}
            >
                Dialog content
            </SconeDialog>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));

        expect(onRequestClose).toHaveBeenCalledWith("footerAction");
        expect(onRequestClose).toHaveBeenCalledWith("closeButton");
    });
});
