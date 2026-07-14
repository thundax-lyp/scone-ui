import { render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { SconeCard } from "./card";

describe("SconeCard", () => {
    it("renders title, description, actions, content, and footer regions", () => {
        render(
            <SconeCard
                title="Deployments"
                description="Recent release activity"
                actions={<button type="button">Refresh</button>}
                footer={<span>Updated now</span>}
            >
                <p>Build queue</p>
            </SconeCard>,
        );

        expect(screen.getByText("Deployments")).toBeInTheDocument();
        expect(screen.getByText("Recent release activity")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
        expect(screen.getByText("Build queue")).toBeInTheDocument();
        expect(screen.getByText("Updated now")).toBeInTheDocument();
    });

    it("marks the card busy while preserving actions and footer", () => {
        render(
            <SconeCard
                title="Jobs"
                actions={<button type="button">Open menu</button>}
                footer={<span>Stable footer</span>}
                loading
            >
                <div>Preserved content</div>
            </SconeCard>,
        );

        const status = screen.getByRole("status", { name: "Loading card" });
        const card = screen.getByText("Jobs").closest("[aria-busy='true']");

        expect(status).toBeInTheDocument();
        expect(card).toHaveAttribute("aria-busy", "true");
        expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
        expect(screen.getByText("Stable footer")).toBeInTheDocument();
        expect(screen.getByText("Preserved content")).toBeInTheDocument();
    });

    it("applies variants and forwards root props", () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <SconeCard ref={ref} variant="plain" className="custom-card" data-testid="card">
                Plain content
            </SconeCard>,
        );

        expect(ref.current).toBe(screen.getByTestId("card"));
        expect(screen.getByTestId("card")).toHaveClass("bg-transparent", "custom-card");
    });

    it("uses the shadcn card content slot for children", () => {
        render(<SconeCard>Nested content</SconeCard>);

        const content = screen.getByText("Nested content").closest("[data-slot='card-content']");

        expect(content).toBeInTheDocument();
        expect(within(content as HTMLElement).getByText("Nested content")).toBeInTheDocument();
    });
});
