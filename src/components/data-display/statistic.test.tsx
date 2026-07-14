import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { SconeStatistic } from "./statistic";

describe("SconeStatistic", () => {
    it("renders title, prefix, value, suffix, and description", () => {
        render(
            <SconeStatistic
                title="Revenue"
                prefix="$"
                value="12,300"
                suffix="USD"
                description="Trailing 30 days"
            />,
        );

        expect(screen.getByText("Revenue")).toBeInTheDocument();
        expect(screen.getByText("$")).toBeInTheDocument();
        expect(screen.getByText("12,300")).toBeInTheDocument();
        expect(screen.getByText("USD")).toBeInTheDocument();
        expect(screen.getByText("Trailing 30 days")).toBeInTheDocument();
    });

    it("maps tone without calculating trend semantics", () => {
        render(<SconeStatistic title="Failure rate" value="2%" tone="danger" />);

        expect(screen.getByText("2%")).toHaveClass("text-destructive");
    });

    it("forwards refs and className to the root", () => {
        const ref = createRef<HTMLDivElement>();

        render(<SconeStatistic ref={ref} value="42" className="custom-statistic" />);

        expect(ref.current).toHaveClass("custom-statistic");
    });
});
