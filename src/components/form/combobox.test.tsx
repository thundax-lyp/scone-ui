import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeCombobox } from "./combobox";

const options = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
];

describe("SconeCombobox", () => {
    it("searches, selects, and clears options", () => {
        const handleValueChange = vi.fn();
        const handleSearchChange = vi.fn();

        render(
            <SconeCombobox
                ariaLabel="Role"
                options={options}
                onValueChange={handleValueChange}
                onSearchValueChange={handleSearchChange}
            />,
        );

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        fireEvent.change(screen.getByLabelText("Search..."), { target: { value: "edit" } });
        fireEvent.click(screen.getByRole("option", { name: "Editor" }));
        fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));

        expect(handleSearchChange).toHaveBeenCalledWith("edit");
        expect(handleValueChange).toHaveBeenNthCalledWith(1, "editor");
        expect(handleValueChange).toHaveBeenNthCalledWith(2, undefined);
    });

    it("shows loading and empty states", () => {
        const { rerender } = render(
            <SconeCombobox ariaLabel="Role" options={[]} loading emptyText="No roles" />,
        );

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        expect(screen.getByText("Loading")).toBeInTheDocument();

        rerender(<SconeCombobox ariaLabel="Role" options={[]} emptyText="No roles" />);
        expect(screen.getByText("No roles")).toBeInTheDocument();
    });
});
