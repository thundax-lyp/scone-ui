import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { notification, SconeNotificationProvider } from "./notification";

describe("notification", () => {
    afterEach(() => {
        notification.clear();
    });

    it("opens, updates, and closes a notification by stable id", () => {
        render(
            <SconeNotificationProvider>
                <div>App</div>
            </SconeNotificationProvider>,
        );

        let id = "";

        act(() => {
            id = notification.open({ title: "Import started" });
        });

        expect(id).toMatch(/^notification-/);
        expect(screen.getByText("Import started")).toBeInTheDocument();

        act(() => {
            notification.update(id, { title: "Import complete", tone: "success" });
        });

        expect(screen.queryByText("Import started")).not.toBeInTheDocument();
        expect(screen.getByText("Import complete")).toBeInTheDocument();

        act(() => {
            notification.close(id);
        });

        expect(screen.queryByText("Import complete")).not.toBeInTheDocument();
    });

    it("reports action, close button, and programmatic close reasons", () => {
        const onAction = vi.fn();
        const onClose = vi.fn();

        render(
            <SconeNotificationProvider>
                <div>App</div>
            </SconeNotificationProvider>,
        );

        act(() => {
            notification.open({
                id: "job",
                title: "Job finished",
                action: "View",
                onAction,
                onClose,
            });
        });

        fireEvent.click(screen.getByRole("button", { name: "View" }));

        expect(onAction).toHaveBeenCalledWith("job");

        fireEvent.click(screen.getByRole("button", { name: "Close notification" }));

        expect(onClose).toHaveBeenCalledWith("job", "closeButton");

        act(() => {
            notification.open({ id: "retry", title: "Retry ready", onClose });
            notification.close("retry");
        });

        expect(onClose).toHaveBeenCalledWith("retry", "programmatic");
    });

    it("limits visible items and marks persistent notifications", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeNotificationProvider maxVisible={1} onOpenChange={onOpenChange}>
                <div>App</div>
            </SconeNotificationProvider>,
        );

        act(() => {
            notification.open({ id: "first", title: "First" });
            notification.open({ id: "second", title: "Second", persistent: true });
        });

        expect(screen.queryByText("First")).not.toBeInTheDocument();
        expect(
            screen.getByText("Second").closest("[data-scone-notification-item]"),
        ).toHaveAttribute("data-persistent", "true");
        expect(onOpenChange).toHaveBeenLastCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ id: "first" }),
                expect.objectContaining({ id: "second", persistent: true }),
            ]),
        );
    });
});
