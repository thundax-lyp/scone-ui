import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SconeToastProvider, toast } from "./toast";

describe("toast", () => {
    afterEach(() => {
        toast.clear();
        vi.useRealTimers();
    });

    it("shows, updates, and dismisses a toast by stable id", () => {
        render(
            <SconeToastProvider>
                <div>App</div>
            </SconeToastProvider>,
        );

        let id = "";

        act(() => {
            id = toast.show({ title: "Saved" });
        });

        expect(id).toMatch(/^toast-/);
        expect(screen.getByText("Saved")).toBeInTheDocument();

        act(() => {
            toast.update(id, { title: "Updated" });
        });

        expect(screen.queryByText("Saved")).not.toBeInTheDocument();
        expect(screen.getByText("Updated")).toBeInTheDocument();

        act(() => {
            toast.dismiss(id);
        });

        expect(screen.queryByText("Updated")).not.toBeInTheDocument();
    });

    it("reports action, close button, and timeout reasons", () => {
        vi.useFakeTimers();
        const onAction = vi.fn();
        const onDismiss = vi.fn();

        render(
            <SconeToastProvider duration={1000}>
                <div>App</div>
            </SconeToastProvider>,
        );

        act(() => {
            toast.success({
                id: "copy",
                title: "Copied",
                action: "Undo",
                onAction,
                onDismiss,
            });
        });

        fireEvent.click(screen.getByRole("button", { name: "Undo" }));

        expect(onAction).toHaveBeenCalledWith("copy");

        fireEvent.click(screen.getByRole("button", { name: "Dismiss toast" }));

        expect(onDismiss).toHaveBeenCalledWith("copy", "closeButton");

        act(() => {
            toast.error({ id: "failed", title: "Failed", onDismiss });
        });
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(onDismiss).toHaveBeenCalledWith("failed", "timeout");
    });

    it("limits visible items without changing queue data", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeToastProvider maxVisible={1} onOpenChange={onOpenChange}>
                <div>App</div>
            </SconeToastProvider>,
        );

        act(() => {
            toast.show({ id: "first", title: "First" });
            toast.show({ id: "second", title: "Second" });
        });

        expect(screen.queryByText("First")).not.toBeInTheDocument();
        expect(screen.getByText("Second")).toBeInTheDocument();
        expect(onOpenChange).toHaveBeenLastCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ id: "first" }),
                expect.objectContaining({ id: "second" }),
            ]),
        );
    });
});
