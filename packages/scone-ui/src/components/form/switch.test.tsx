import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeSwitch } from "./switch";

describe("SconeSwitch", () => {
    it("toggles checked state by click and keyboard", () => {
        const handleChange = vi.fn();

        render(<SconeSwitch ariaLabel="Enable alerts" onCheckedChange={handleChange} />);

        const control = screen.getByRole("switch", { name: "Enable alerts" });
        fireEvent.click(control);
        fireEvent.keyDown(control, { key: " " });

        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("uses disabled and Field invalid state", () => {
        render(
            <SconeField.Root id="alerts" label="Alerts" invalid disabled>
                <SconeSwitch />
            </SconeField.Root>,
        );

        const control = screen.getByRole("switch", { name: "Alerts" });

        expect(control).toBeDisabled();
        expect(control).toHaveAttribute("aria-invalid", "true");
    });
});
