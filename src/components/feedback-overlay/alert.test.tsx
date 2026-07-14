import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeAlert } from "./alert";

describe("SconeAlert", () => {
    it("renders readable status content and tone semantics", () => {
        render(
            <SconeAlert
                tone="danger"
                icon={<span data-testid="alert-icon">!</span>}
                title="Import failed"
                description="Rows 2 and 4 are missing required names."
            />,
        );

        const alert = screen.getByRole("alert");

        expect(alert).toHaveAttribute("data-tone", "danger");
        expect(screen.getByText("Error")).toHaveClass("sr-only");
        expect(screen.getByText("Import failed")).toBeInTheDocument();
        expect(screen.getByText("Rows 2 and 4 are missing required names.")).toBeInTheDocument();
        expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    });

    it("renders a directly related action", async () => {
        const onRetry = vi.fn();

        render(
            <SconeAlert
                tone="warning"
                title="Sync paused"
                description="Reconnect to continue syncing."
                action={<button onClick={onRetry}>Retry</button>}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Retry" }));

        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});
