import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeSelect } from "./select";

Element.prototype.scrollIntoView = vi.fn();

const options = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived", disabled: true },
];

describe("SconeSelect", () => {
    it("renders options and reports value changes", () => {
        const handleValueChange = vi.fn();

        render(
            <SconeSelect
                ariaLabel="Status"
                options={options}
                defaultValue="draft"
                onValueChange={handleValueChange}
            />,
        );

        const trigger = screen.getByRole("combobox", { name: "Status" });
        expect(trigger).toHaveTextContent("Draft");

        fireEvent.keyDown(trigger, { key: "Enter" });
        fireEvent.click(screen.getByRole("option", { name: "Published" }));

        expect(handleValueChange).toHaveBeenCalledWith("published");
    });

    it("supports controlled open state", () => {
        const handleOpenChange = vi.fn();

        render(
            <SconeSelect
                ariaLabel="Status"
                options={options}
                open={false}
                onOpenChange={handleOpenChange}
            />,
        );

        fireEvent.keyDown(screen.getByRole("combobox", { name: "Status" }), { key: "Enter" });

        expect(handleOpenChange).toHaveBeenCalledWith(true);
    });

    it("uses Field invalid state on the trigger", () => {
        render(
            <SconeField.Root id="status" label="Status" invalid>
                <SconeSelect options={options} placeholder="Select status" />
            </SconeField.Root>,
        );

        expect(screen.getByRole("combobox", { name: "Status" })).toHaveAttribute(
            "aria-invalid",
            "true",
        );
    });
});
