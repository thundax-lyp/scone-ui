import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeInput } from "./input";

describe("SconeInput", () => {
    it("updates uncontrolled values and calls onValueChange", () => {
        const handleChange = vi.fn();

        render(<SconeInput ariaLabel="Name" defaultValue="Ada" onValueChange={handleChange} />);

        const input = screen.getByLabelText("Name");
        fireEvent.change(input, { target: { value: "Grace" } });
        fireEvent.change(input, { target: { value: "" } });

        expect(input).toHaveValue("");
        expect(handleChange).toHaveBeenNthCalledWith(1, "Grace");
        expect(handleChange).toHaveBeenNthCalledWith(2, "");
    });

    it("uses Field state and keeps the input ref", () => {
        const ref = React.createRef<HTMLInputElement>();

        render(
            <SconeField.Root id="email" label="Email" invalid required>
                <SconeInput ref={ref} />
            </SconeField.Root>,
        );

        const input = screen.getByRole("textbox", { name: "Email" });

        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toBeRequired();
    });
});
