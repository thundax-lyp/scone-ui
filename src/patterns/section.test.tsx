import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./section";

describe("Section", () => {
    it("renders a semantic section with density", () => {
        render(
            <Section.Root density="compact" aria-label="Profile">
                <Section.Content>Profile fields</Section.Content>
            </Section.Root>,
        );

        const section = screen.getByRole("region", { name: "Profile" });

        expect(section).toHaveAttribute("data-scone-pattern", "section");
        expect(section).toHaveAttribute("data-density", "compact");
    });

    it("renders header title, description, children, and section-level actions", () => {
        render(
            <Section.Header
                title="Billing"
                description="Invoice settings"
                actions={<button type="button">Edit section</button>}
            >
                Header note
            </Section.Header>,
        );

        expect(screen.getByRole("heading", { name: "Billing" })).toBeInTheDocument();
        expect(screen.getByText("Invoice settings")).toBeInTheDocument();
        expect(screen.getByText("Header note")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit section" })).toBeInTheDocument();
        expect(
            screen
                .getByRole("button", { name: "Edit section" })
                .closest("[data-scone-section-header-actions]"),
        ).toBeInTheDocument();
    });

    it("renders content and footer as structural slots", () => {
        render(
            <Section.Root>
                <Section.Content>Rows</Section.Content>
                <Section.Footer>Updated yesterday</Section.Footer>
            </Section.Root>,
        );

        expect(screen.getByText("Rows").closest("[data-scone-section-part='content']")).toHaveClass(
            "min-w-0",
        );
        expect(
            screen.getByText("Updated yesterday").closest("[data-scone-section-part='footer']"),
        ).toBeInTheDocument();
    });

    it("does not render card visual boundaries by default", () => {
        render(
            <Section.Root>
                <Section.Content>Plain section</Section.Content>
            </Section.Root>,
        );

        expect(
            screen.getByText("Plain section").closest("[data-scone-pattern='section']"),
        ).not.toHaveClass("rounded-lg", "border", "shadow", "bg-card");
    });
});
