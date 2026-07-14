import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeCheckbox } from "./checkbox";

describe("SconeCheckbox", () => {
    it("toggles checked state", () => {
        const handleChange = vi.fn();

        render(<SconeCheckbox ariaLabel="Accept terms" onCheckedChange={handleChange} />);

        fireEvent.click(screen.getByRole("checkbox", { name: "Accept terms" }));

        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("renders indeterminate without reporting it as checked", () => {
        render(<SconeCheckbox ariaLabel="Some selected" indeterminate />);

        expect(screen.getByRole("checkbox", { name: "Some selected" })).toHaveAttribute(
            "aria-checked",
            "mixed",
        );
    });

    it("uses disabled and Field invalid state", () => {
        render(
            <SconeField.Root id="terms" label="Terms" invalid disabled>
                <SconeCheckbox />
            </SconeField.Root>,
        );

        const control = screen.getByRole("checkbox", { name: "Terms" });

        expect(control).toBeDisabled();
        expect(control).toHaveAttribute("aria-invalid", "true");
    });
});
