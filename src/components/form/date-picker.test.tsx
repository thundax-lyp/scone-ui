import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeDatePicker } from "./date-picker";

const formatLabel = (date: Date) => date.toISOString().slice(0, 10);

describe("SconeDatePicker", () => {
    it("opens with keyboard, selects dates, and clears values", () => {
        const handleChange = vi.fn();

        render(
            <SconeDatePicker
                ariaLabel="Due date"
                defaultValue={new Date(2026, 6, 14)}
                formatLabel={formatLabel}
                onValueChange={handleChange}
            />,
        );

        const trigger = screen.getByRole("button", { name: /2026-07-14/ });
        fireEvent.keyDown(trigger, { key: "Enter" });
        fireEvent.click(screen.getByRole("button", { name: "2026-07-15" }));
        fireEvent.click(screen.getByRole("button", { name: "Clear date" }));

        expect(handleChange).toHaveBeenNthCalledWith(1, new Date(2026, 6, 15));
        expect(handleChange).toHaveBeenNthCalledWith(2, undefined);
    });

    it("keeps disabled dates from changing the value", () => {
        const handleChange = vi.fn();

        render(
            <SconeDatePicker
                ariaLabel="Due date"
                defaultValue={new Date(2026, 6, 14)}
                disabledDate={(date) => date.getDate() === 15}
                formatLabel={formatLabel}
                onValueChange={handleChange}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: /2026-07-14/ }));
        fireEvent.click(screen.getByRole("button", { name: "2026-07-15" }));

        expect(handleChange).not.toHaveBeenCalled();
    });

    it("uses Field invalid state on the trigger", () => {
        render(
            <SconeField.Root id="due-date" label="Due date" invalid>
                <SconeDatePicker formatLabel={formatLabel} />
            </SconeField.Root>,
        );

        expect(screen.getByRole("button", { name: "Due date" })).toHaveAttribute(
            "aria-invalid",
            "true",
        );
    });
});
