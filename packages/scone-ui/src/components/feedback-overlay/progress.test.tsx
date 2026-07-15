import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SconeProgress } from "./progress";

describe("SconeProgress", () => {
    it("renders quantifiable progress semantics", () => {
        render(<SconeProgress value={35} max={70} status="active" showLabel />);

        const progress = screen.getByRole("progressbar");

        expect(progress).toHaveAttribute("aria-valuenow", "35");
        expect(progress).toHaveAttribute("aria-valuemax", "70");
        expect(progress).toHaveAttribute("aria-valuetext", "50%");
        expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("renders readable task status text", () => {
        render(
            <SconeProgress
                value={75}
                status="success"
                label="Import finished"
                data-testid="progress-root"
            />,
        );

        expect(screen.getByText("Import finished")).toBeInTheDocument();
        expect(screen.getByTestId("progress-root")).toHaveAttribute("data-status", "success");
    });

    it("clamps values into the configured range", () => {
        render(<SconeProgress value={120} max={100} showLabel />);

        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
        expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("normalizes invalid max values before calculating percent output", () => {
        const { rerender } = render(<SconeProgress value={50} max={0} showLabel />);

        let progress = screen.getByRole("progressbar");

        expect(progress).toHaveAttribute("aria-valuemax", "100");
        expect(progress).toHaveAttribute("aria-valuetext", "50%");
        expect(screen.getByText("50%")).toBeInTheDocument();

        rerender(<SconeProgress value={50} max={Number.NaN} showLabel />);
        progress = screen.getByRole("progressbar");

        expect(progress).toHaveAttribute("aria-valuemax", "100");
        expect(progress).toHaveAttribute("aria-valuetext", "50%");
        expect(screen.getByText("50%")).toBeInTheDocument();

        rerender(<SconeProgress value={50} max={Infinity} showLabel />);
        progress = screen.getByRole("progressbar");

        expect(progress).toHaveAttribute("aria-valuemax", "100");
        expect(progress).toHaveAttribute("aria-valuetext", "50%");
        expect(screen.getByText("50%")).toBeInTheDocument();
    });
});
