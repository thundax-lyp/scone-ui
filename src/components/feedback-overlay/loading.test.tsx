import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SconeLoading } from "./loading";

describe("SconeLoading", () => {
    it("marks the region busy while showing a spinner", () => {
        render(
            <SconeLoading type="spinner" size="lg" data-testid="loading-region">
                <div>Existing content</div>
            </SconeLoading>,
        );

        const region = screen.getByTestId("loading-region");

        expect(region).toHaveAttribute("aria-busy", "true");
        expect(region).toHaveAttribute("data-loading-type", "spinner");
        expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
        expect(screen.getByText("Existing content")).toBeInTheDocument();
    });

    it("supports skeleton loading", () => {
        render(<SconeLoading type="skeleton" />);

        expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    });

    it("renders children without busy state when loading is false", () => {
        render(
            <SconeLoading loading={false} data-testid="loading-region">
                Loaded content
            </SconeLoading>,
        );

        const region = screen.getByTestId("loading-region");

        expect(region).not.toHaveAttribute("aria-busy");
        expect(screen.queryByRole("status", { name: "Loading" })).not.toBeInTheDocument();
    });
});
