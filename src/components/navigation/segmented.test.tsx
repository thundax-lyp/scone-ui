import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeSegmented } from "./segmented";

const options = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "kanban", label: "Kanban", disabled: true },
];

describe("SconeSegmented", () => {
    it("renders the current value as selected", () => {
        render(<SconeSegmented options={options} value="grid" onValueChange={() => undefined} />);

        expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute(
            "aria-checked",
            "false",
        );
    });

    it("updates uncontrolled selection from click", () => {
        render(<SconeSegmented options={options} defaultValue="list" />);

        fireEvent.click(screen.getByRole("radio", { name: "Grid" }));

        expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute("aria-checked", "true");
    });

    it("moves selection with arrow keys", () => {
        const onValueChange = vi.fn();

        render(<SconeSegmented options={options} value="list" onValueChange={onValueChange} />);

        fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowRight" });

        expect(onValueChange).toHaveBeenCalledWith("grid");
    });

    it("does not change disabled controls or options", () => {
        const onValueChange = vi.fn();

        render(
            <SconeSegmented
                options={options}
                value="list"
                disabled
                onValueChange={onValueChange}
            />,
        );

        fireEvent.click(screen.getByRole("radio", { name: "Grid" }));
        fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowRight" });

        expect(onValueChange).not.toHaveBeenCalled();
    });
});
