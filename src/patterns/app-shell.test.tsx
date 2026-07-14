import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./app-shell";

describe("AppShell", () => {
    it("renders shell slots and header actions", () => {
        render(
            <AppShell.Root>
                <AppShell.Sidebar>Navigation</AppShell.Sidebar>
                <AppShell.Main>
                    <AppShell.Header actions={<button type="button">Profile</button>}>
                        Workspace
                    </AppShell.Header>
                    <div>Page region</div>
                </AppShell.Main>
                <AppShell.Aside open>Inspector</AppShell.Aside>
            </AppShell.Root>,
        );

        expect(
            screen.getByText("Navigation").closest("[data-scone-pattern='app-shell']"),
        ).toBeInTheDocument();
        expect(
            screen.getByText("Workspace").closest("[data-scone-app-shell-part='header']"),
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
        expect(
            screen.getByText("Page region").closest("[data-scone-app-shell-part='main']"),
        ).toBeInTheDocument();
        expect(
            screen.getByText("Inspector").closest("[data-scone-app-shell-part='aside']"),
        ).toHaveAttribute("data-open", "true");
    });

    it("supports controlled and default sidebar collapsed state", () => {
        const { rerender } = render(
            <AppShell.Sidebar collapsed={false}>Navigation</AppShell.Sidebar>,
        );

        expect(
            screen.getByText("Navigation").closest("[data-scone-app-shell-part='sidebar']"),
        ).not.toHaveAttribute("data-collapsed");

        rerender(<AppShell.Sidebar defaultCollapsed>Navigation</AppShell.Sidebar>);

        const sidebar = screen
            .getByText("Navigation")
            .closest("[data-scone-app-shell-part='sidebar']");
        expect(sidebar).toHaveAttribute("data-collapsed", "true");
    });

    it("supports controlled and default aside open state", () => {
        const { rerender } = render(<AppShell.Aside open>Details</AppShell.Aside>);

        expect(
            screen.getByText("Details").closest("[data-scone-app-shell-part='aside']"),
        ).toHaveAttribute("data-open", "true");

        rerender(<AppShell.Aside>Details</AppShell.Aside>);

        const aside = screen.getByText("Details").closest("[data-scone-app-shell-part='aside']");
        expect(aside).not.toHaveAttribute("data-open");
        expect(aside).toHaveAttribute("hidden");
    });

    it("keeps Main as a shrinkable non-scrolling page host", () => {
        render(
            <AppShell.Main>
                <div>Page</div>
            </AppShell.Main>,
        );

        expect(screen.getByText("Page").closest("[data-scone-app-shell-part='main']")).toHaveClass(
            "min-h-0",
            "min-w-0",
            "overflow-hidden",
        );
    });
});
