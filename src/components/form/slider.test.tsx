import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeSlider } from "./slider";

describe("SconeSlider", () => {
    it("uses a number array value and responds to keyboard changes", () => {
        const handleChange = vi.fn();

        render(
            <SconeSlider
                ariaLabel="Volume"
                defaultValue={[25]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleChange}
            />,
        );

        const slider = screen.getByRole("slider", { name: "Volume" });
        fireEvent.keyDown(slider, { key: "ArrowRight" });

        expect(slider).toHaveAttribute("aria-valuenow");
    });

    it("uses Field invalid and disabled state", () => {
        render(
            <SconeField.Root id="range" label="Range" invalid disabled>
                <SconeSlider defaultValue={[20]} />
            </SconeField.Root>,
        );

        const slider = screen.getByRole("slider", { name: "Range" });

        expect(slider).toHaveAttribute("aria-invalid", "true");
        expect(slider).toHaveAttribute("aria-disabled", "true");
    });
});
