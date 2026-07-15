import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeRadioGroup } from "./radio-group";

const options = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
];

describe("SconeRadioGroup", () => {
    it("selects options by click", () => {
        const handleChange = vi.fn();

        render(
            <SconeRadioGroup
                ariaLabel="Channel"
                options={options}
                defaultValue="email"
                onValueChange={handleChange}
            />,
        );

        fireEvent.click(screen.getByRole("radio", { name: "SMS" }));

        expect(handleChange).toHaveBeenCalledWith("sms");
    });

    it("uses Field invalid state", () => {
        render(
            <SconeField.Root id="channel" label="Channel" invalid>
                <SconeRadioGroup options={options} />
            </SconeField.Root>,
        );

        expect(screen.getByRole("radiogroup", { name: "Channel" })).toHaveAttribute(
            "aria-invalid",
            "true",
        );
    });
});
