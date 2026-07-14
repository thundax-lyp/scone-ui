import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SconeLoading } from "./loading";

describe("SconeLoading", () => {
    it("marks the region busy while showing a spinner", () => {
        render(
            <SconeLoading type="spinner" size="lg">
                <div>Existing content</div>
            </SconeLoading>,
        );

        const region = screen.getByText("Existing content").closest("[data-scone-loading]");

        expect(region).toHaveAttribute("aria-busy", "true");
        expect(region).toHaveAttribute("data-loading-type", "spinner");
        expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
        expect(screen.getByText("Existing content")).toBeInTheDocument();
    });

    it("supports skeleton loading", () => {
        render(<SconeLoading type="skeleton" />);

        expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute(
            "data-slot",
            "loading-skeleton",
        );
    });

    it("renders children without busy state when loading is false", () => {
        render(<SconeLoading loading={false}>Loaded content</SconeLoading>);

        const region = screen.getByText("Loaded content").closest("[data-scone-loading]");

        expect(region).not.toHaveAttribute("aria-busy");
        expect(screen.queryByRole("status", { name: "Loading" })).not.toBeInTheDocument();
    });
});
