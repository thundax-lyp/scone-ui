import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./section";

describe("Section", () => {
    it("renders a semantic non-card section with density", () => {
        render(
            <Section.Root density="compact" aria-label="Profile">
                <Section.Content>Profile fields</Section.Content>
            </Section.Root>,
        );

        const section = screen.getByRole("region", { name: "Profile" });

        expect(section).toHaveAttribute("data-scone-pattern", "section");
        expect(section).toHaveAttribute("data-density", "compact");
        expect(section).not.toHaveClass("rounded-lg", "border", "shadow", "bg-card");
    });

    it("renders header shorthand title, description, children, and actions", () => {
        render(
            <Section.Header
                title="Billing"
                description="Invoice settings"
                actions={<button type="button">Edit section</button>}
            >
                Header note
            </Section.Header>,
        );

        expect(screen.getByRole("heading", { name: "Billing" })).toHaveAttribute(
            "data-scone-section-part",
            "title",
        );
        expect(screen.getByText("Invoice settings")).toHaveAttribute(
            "data-scone-section-part",
            "description",
        );
        expect(screen.getByText("Header note")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit section" })).toBeInTheDocument();
    });

    it("renders root shorthand title, description, actions, and content", () => {
        render(
            <Section.Root
                title="Billing"
                description="Invoice settings"
                actions={<button type="button">Edit section</button>}
            >
                <Section.Content>Payment methods</Section.Content>
            </Section.Root>,
        );

        expect(screen.getByRole("heading", { name: "Billing" })).toBeInTheDocument();
        expect(screen.getByText("Invoice settings")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit section" })).toBeInTheDocument();
        expect(screen.getByText("Payment methods")).toHaveAttribute(
            "data-scone-section-part",
            "content",
        );
    });

    it("keeps explicit actions in the header and outside content", () => {
        render(
            <Section.Root>
                <Section.Header role="group" aria-label="User details header">
                    <div>
                        <Section.Title>User details</Section.Title>
                        <Section.Description>Profile metadata</Section.Description>
                    </div>
                    <Section.Actions role="group" aria-label="User details actions">
                        <button type="button">Edit</button>
                    </Section.Actions>
                </Section.Header>
                <Section.Content role="region" aria-label="User details body">
                    <div>Form body</div>
                </Section.Content>
            </Section.Root>,
        );

        const actions = screen.getByRole("group", { name: "User details actions" });
        const header = screen.getByRole("group", { name: "User details header" });
        const content = screen.getByRole("region", { name: "User details body" });

        expect(actions).toBeInTheDocument();
        expect(header).toContainElement(actions);
        expect(content).not.toContainElement(actions);
        expect(screen.getByText("Profile metadata")).toBeInTheDocument();
    });

    it("renders content and footer as structural slots", () => {
        render(
            <Section.Root>
                <Section.Content>Rows</Section.Content>
                <Section.Footer>Updated yesterday</Section.Footer>
            </Section.Root>,
        );

        expect(screen.getByText("Rows")).toHaveAttribute("data-scone-section-part", "content");
        expect(screen.getByText("Rows")).toHaveClass("min-w-0");
        expect(screen.getByText("Updated yesterday")).toHaveAttribute(
            "data-scone-section-part",
            "footer",
        );
    });

    it("supports heading levels and sparse composition", () => {
        const { rerender } = render(
            <Section.Root>
                <Section.Header>
                    <Section.Title level={3}>Advanced settings</Section.Title>
                </Section.Header>
            </Section.Root>,
        );

        expect(
            screen.getByRole("heading", { level: 3, name: "Advanced settings" }),
        ).toHaveAttribute("data-scone-section-part", "title");

        rerender(
            <Section.Root>
                <Section.Content>Only content</Section.Content>
            </Section.Root>,
        );

        expect(screen.getByText("Only content")).toHaveAttribute(
            "data-scone-section-part",
            "content",
        );
    });
});
