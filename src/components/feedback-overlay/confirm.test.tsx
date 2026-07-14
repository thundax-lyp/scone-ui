import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeConfirm } from "./confirm";

describe("SconeConfirm", () => {
    it("renders destructive confirmation with readable description", () => {
        render(
            <SconeConfirm
                defaultOpen
                destructive
                title="Delete workspace"
                description="This permanently removes all workspace data."
                confirmText="Delete"
            />,
        );

        expect(screen.getByRole("alertdialog", { name: "Delete workspace" })).toHaveAttribute(
            "data-destructive",
            "true",
        );
        expect(
            screen.getByText("This permanently removes all workspace data."),
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });

    it("calls cancel and closes", () => {
        const onCancel = vi.fn();

        render(<SconeConfirm defaultOpen title="Discard changes" onCancel={onCancel} />);

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("prevents duplicate async confirmations", async () => {
        let resolveConfirm: () => void = () => undefined;
        const onConfirm = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    resolveConfirm = resolve;
                }),
        );

        render(<SconeConfirm defaultOpen title="Run import" onConfirm={onConfirm} />);

        const confirmButton = screen.getByRole("button", { name: "Confirm" });

        fireEvent.click(confirmButton);
        fireEvent.click(confirmButton);

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();

        resolveConfirm();

        await waitFor(() => {
            expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
        });
    });
});
