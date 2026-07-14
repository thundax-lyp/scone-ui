import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeEmpty } from "./empty";

describe("SconeEmpty", () => {
    it("renders empty-state explanation and image", () => {
        render(
            <SconeEmpty
                image={<span data-testid="empty-image">No rows</span>}
                title="No projects"
                description="Create a project to start tracking work."
            />,
        );

        expect(screen.getByTestId("empty-image")).toBeInTheDocument();
        expect(screen.getByText("No projects")).toBeInTheDocument();
        expect(screen.getByText("Create a project to start tracking work.")).toBeInTheDocument();
    });

    it("renders a recoverable action", async () => {
        const onCreate = vi.fn();

        render(
            <SconeEmpty
                title="No filters match"
                description="Clear filters to see all results."
                action={<button onClick={onCreate}>Clear filters</button>}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

        expect(onCreate).toHaveBeenCalledTimes(1);
    });
});
