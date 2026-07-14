import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeDrawer } from "./drawer";

describe("SconeDrawer", () => {
    it("renders a titled drawer with scroll body and fixed footer", () => {
        render(
            <SconeDrawer
                defaultOpen
                title="Edit user"
                description="Update profile details."
                footer={<button data-scone-overlay-close="">Cancel</button>}
            >
                <div>Drawer content</div>
            </SconeDrawer>,
        );

        expect(screen.getByRole("dialog", { name: "Edit user" })).toBeInTheDocument();
        expect(screen.getByText("Update profile details.")).toBeInTheDocument();
        expect(screen.getByText("Drawer content").closest("[data-slot=drawer-body]")).toHaveClass(
            "overflow-y-auto",
        );
        expect(
            screen.getByRole("button", { name: "Cancel" }).closest("[data-slot=drawer-footer]"),
        ).toBeInTheDocument();
    });

    it("supports ariaLabel when there is no visible title", () => {
        render(
            <SconeDrawer defaultOpen ariaLabel="User settings">
                Settings
            </SconeDrawer>,
        );

        expect(screen.getByRole("dialog", { name: "User settings" })).toBeInTheDocument();
    });

    it("reports close button and footer close reasons", async () => {
        const onRequestClose = vi.fn();

        render(
            <SconeDrawer
                defaultOpen
                title="Edit user"
                onRequestClose={onRequestClose}
                footer={<button data-scone-overlay-close="">Cancel</button>}
            >
                Drawer content
            </SconeDrawer>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        fireEvent.click(screen.getByRole("button", { name: "Close drawer" }));

        expect(onRequestClose).toHaveBeenCalledWith("footerAction");
        expect(onRequestClose).toHaveBeenCalledWith("closeButton");
    });
});
