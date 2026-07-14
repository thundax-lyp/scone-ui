import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeCombobox } from "./combobox";

const options = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "owner", label: "Owner", disabled: true },
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

    it("closes the overlay with Escape and outside clicks", () => {
        const handleOpenChange = vi.fn();

        render(
            <SconeCombobox ariaLabel="Role" options={options} onOpenChange={handleOpenChange} />,
        );

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        fireEvent.keyDown(screen.getByLabelText("Search..."), { key: "Escape" });
        expect(handleOpenChange).toHaveBeenLastCalledWith(false);

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        fireEvent.pointerDown(document.body);
        expect(handleOpenChange).toHaveBeenLastCalledWith(false);
    });

    it("selects the active filtered option with the keyboard", () => {
        const handleValueChange = vi.fn();

        render(
            <SconeCombobox ariaLabel="Role" options={options} onValueChange={handleValueChange} />,
        );

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        fireEvent.change(screen.getByLabelText("Search..."), { target: { value: "edit" } });
        fireEvent.keyDown(screen.getByLabelText("Search..."), { key: "ArrowDown" });
        fireEvent.keyDown(screen.getByLabelText("Search..."), { key: "Enter" });

        expect(handleValueChange).toHaveBeenCalledWith("editor");
    });

    it("does not select disabled options", () => {
        const handleValueChange = vi.fn();

        render(
            <SconeCombobox ariaLabel="Role" options={options} onValueChange={handleValueChange} />,
        );

        fireEvent.click(screen.getByRole("combobox", { name: "Role" }));
        fireEvent.click(screen.getByRole("option", { name: "Owner" }));

        expect(handleValueChange).not.toHaveBeenCalled();
    });

    it("supports controlled open, search, and value fields", () => {
        const handleOpenChange = vi.fn();
        const handleSearchChange = vi.fn();
        const handleValueChange = vi.fn();

        render(
            <SconeCombobox
                ariaLabel="Role"
                options={options}
                open
                searchValue=""
                value="admin"
                onOpenChange={handleOpenChange}
                onSearchValueChange={handleSearchChange}
                onValueChange={handleValueChange}
            />,
        );

        fireEvent.change(screen.getByLabelText("Search..."), { target: { value: "edit" } });
        fireEvent.click(screen.getByRole("option", { name: "Editor" }));

        expect(handleSearchChange).toHaveBeenCalledWith("edit");
        expect(handleValueChange).toHaveBeenCalledWith("editor");
        expect(handleOpenChange).toHaveBeenCalledWith(false);
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
