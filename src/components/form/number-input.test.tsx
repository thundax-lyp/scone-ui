import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeNumberInput } from "./number-input";

describe("SconeNumberInput", () => {
    it("reports numbers, undefined empty values, and stepper changes", () => {
        const handleChange = vi.fn();

        render(
            <SconeNumberInput
                ariaLabel="Quantity"
                defaultValue={2}
                min={0}
                max={5}
                step={2}
                onValueChange={handleChange}
            />,
        );

        const input = screen.getByLabelText("Quantity");
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.click(screen.getByRole("button", { name: "Increment value" }));
        fireEvent.click(screen.getByRole("button", { name: "Increment value" }));
        fireEvent.click(screen.getByRole("button", { name: "Decrement value" }));

        expect(handleChange).toHaveBeenNthCalledWith(1, undefined);
        expect(handleChange).toHaveBeenNthCalledWith(2, 2);
        expect(handleChange).toHaveBeenNthCalledWith(3, 4);
        expect(handleChange).toHaveBeenNthCalledWith(4, 2);
    });

    it("keeps the input ref", () => {
        const ref = React.createRef<HTMLInputElement>();

        render(<SconeNumberInput ref={ref} ariaLabel="Quantity" />);

        expect(ref.current).toBe(screen.getByLabelText("Quantity"));
    });

    it("does not commit non-finite typed values", () => {
        const handleChange = vi.fn();

        render(
            <SconeNumberInput ariaLabel="Quantity" defaultValue={2} onValueChange={handleChange} />,
        );

        const input = screen.getByLabelText("Quantity");

        Object.defineProperty(input, "value", {
            configurable: true,
            value: "1e",
            writable: true,
        });
        fireEvent.change(input);
        Reflect.deleteProperty(input, "value");
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.change(input, { target: { value: "4" } });

        expect(handleChange).not.toHaveBeenCalledWith(Number.NaN);
        expect(handleChange).toHaveBeenNthCalledWith(1, undefined);
        expect(handleChange).toHaveBeenNthCalledWith(2, 4);
    });
});
