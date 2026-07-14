import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./app-shell";

describe("AppShell", () => {
    it("renders shell slots and header actions", () => {
        render(
            <AppShell.Root>
                <AppShell.Sidebar aria-label="Navigation">Navigation</AppShell.Sidebar>
                <AppShell.Main>
                    <AppShell.Header actions={<button type="button">Profile</button>}>
                        Workspace
                    </AppShell.Header>
                    <div>Page region</div>
                </AppShell.Main>
                <AppShell.Aside open>Inspector</AppShell.Aside>
            </AppShell.Root>,
        );

        expect(screen.getByRole("complementary", { name: "Navigation" })).toHaveAttribute(
            "data-scone-app-shell-part",
            "sidebar",
        );
        expect(screen.getByRole("banner")).toHaveAttribute("data-scone-app-shell-part", "header");
        expect(screen.getByText("Workspace")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
        expect(screen.getByRole("main")).toHaveTextContent("Page region");
        expect(screen.getByText("Inspector")).toHaveAttribute("data-open", "true");
    });

    it("supports controlled and default sidebar collapsed state", () => {
        const { rerender } = render(
            <AppShell.Sidebar aria-label="Navigation" collapsed={false}>
                Navigation
            </AppShell.Sidebar>,
        );

        expect(screen.getByRole("complementary", { name: "Navigation" })).not.toHaveAttribute(
            "data-collapsed",
        );

        rerender(
            <AppShell.Sidebar aria-label="Navigation" defaultCollapsed>
                Navigation
            </AppShell.Sidebar>,
        );

        expect(screen.getByRole("complementary", { name: "Navigation" })).toHaveAttribute(
            "data-collapsed",
            "true",
        );
    });

    it("supports controlled and default aside open state", () => {
        const { rerender } = render(
            <AppShell.Aside aria-label="Inspector" open>
                Details
            </AppShell.Aside>,
        );

        expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveAttribute(
            "data-open",
            "true",
        );

        rerender(<AppShell.Aside aria-label="Inspector">Details</AppShell.Aside>);

        const aside = screen.getByText("Details");
        expect(aside).not.toHaveAttribute("data-open");
        expect(aside).toHaveAttribute("hidden");
    });

    it("keeps Main as a shrinkable non-scrolling page host", () => {
        render(
            <AppShell.Main>
                <div>Page</div>
            </AppShell.Main>,
        );

        expect(screen.getByRole("main")).toHaveClass("min-h-0", "min-w-0", "overflow-hidden");
    });
});
