import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Page } from "./page";

describe("Page", () => {
    it("renders root with maxWidth, density, and sticky action attributes", () => {
        render(
            <Page.Root
                role="group"
                aria-label="Users page"
                maxWidth="wide"
                density="comfortable"
                hasStickyActions
            >
                <Page.Main>Content</Page.Main>
            </Page.Root>,
        );

        const root = screen.getByRole("group", { name: "Users page" });
        const main = screen.getByRole("main");

        expect(root).toHaveAttribute("data-max-width", "wide");
        expect(root).toHaveAttribute("data-density", "comfortable");
        expect(root).toHaveAttribute("data-has-sticky-actions", "true");
        expect(main).toHaveAttribute("data-inset-for-sticky-actions", "true");
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
    });

    it("keeps Content as a primary scroll container with sticky inset support", () => {
        render(
            <Page.Root hasStickyActions>
                <Page.Content role="region" aria-label="Scrollable region">
                    Scrollable region
                </Page.Content>
            </Page.Root>,
        );

        expect(screen.getByRole("region", { name: "Scrollable region" })).toHaveClass(
            "min-h-0",
            "min-w-0",
            "overflow-auto",
            "pb-24",
        );
    });

    it("keeps Main without sticky inset when StickyActions is not declared", () => {
        render(
            <Page.Root>
                <Page.Main>Scrollable content</Page.Main>
            </Page.Root>,
        );

        expect(screen.getByRole("main")).not.toHaveAttribute("data-inset-for-sticky-actions");
    });

    it("supports StickyActions alignment states", () => {
        render(
            <Page.Root hasStickyActions>
                <Page.Main>Content</Page.Main>
                <Page.StickyActions role="group" aria-label="Page actions" align="between">
                    <button type="button">Cancel</button>
                    <button type="button">Save</button>
                </Page.StickyActions>
            </Page.Root>,
        );

        const actions = screen.getByRole("group", { name: "Page actions" });

        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
        expect(actions).toHaveAttribute("data-align", "between");
        expect(actions).toHaveClass("sticky", "bottom-0", "justify-between");
    });
});
