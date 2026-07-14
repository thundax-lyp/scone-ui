import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Page } from "./page";

describe("Page", () => {
    it("renders root with maxWidth and density attributes", () => {
        render(
            <Page.Root maxWidth="wide" density="comfortable">
                <Page.Content>Content</Page.Content>
            </Page.Root>,
        );

        const root = screen.getByText("Content").closest("[data-scone-pattern='page']");

        expect(root).toHaveAttribute("data-max-width", "wide");
        expect(root).toHaveAttribute("data-density", "comfortable");
    });

    it("renders page header content and page-level actions", () => {
        render(
            <Page.Header
                title="Users"
                description="Manage access"
                actions={<button type="button">Create</button>}
            >
                Extra header content
            </Page.Header>,
        );

        expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
        expect(screen.getByText("Manage access")).toBeInTheDocument();
        expect(screen.getByText("Extra header content")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
        expect(
            screen
                .getByRole("button", { name: "Create" })
                .closest("[data-scone-page-header-actions]"),
        ).toBeInTheDocument();
    });

    it("keeps Content as the primary scroll container", () => {
        render(<Page.Content>Scrollable region</Page.Content>);

        expect(
            screen.getByText("Scrollable region").closest("[data-scone-page-part='content']"),
        ).toHaveClass("min-h-0", "min-w-0", "overflow-auto");
    });

    it("renders sticky actions without covering content flow", () => {
        render(
            <Page.Root>
                <Page.Content>Last field</Page.Content>
                <Page.StickyActions align="between">
                    <button type="button">Cancel</button>
                    <button type="button">Save</button>
                </Page.StickyActions>
            </Page.Root>,
        );

        const actions = screen
            .getByRole("button", { name: "Save" })
            .closest("[data-scone-page-part='sticky-actions']");

        expect(actions).toHaveAttribute("data-align", "between");
        expect(actions).toHaveClass("sticky", "bottom-0", "justify-between");
        expect(screen.getByText("Last field")).toBeInTheDocument();
    });
});
