import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeDropdown, SconeDropdownItem } from "./dropdown";

const items = [
    { key: "edit", label: "Edit" },
    { key: "archive", label: "Archive", disabled: true },
    { key: "delete", label: "Delete", destructive: true },
];

describe("SconeDropdown", () => {
    it("opens from the trigger and selects an item", () => {
        const onSelect = vi.fn();

        render(
            <SconeDropdown
                trigger={<button type="button">Actions</button>}
                items={items}
                onSelect={onSelect}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Actions" }));
        fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));

        expect(onSelect).toHaveBeenCalledWith(items[0]);
    });

    it("marks destructive and disabled items", () => {
        render(<SconeDropdown trigger={<button type="button">Actions</button>} items={items} />);

        fireEvent.click(screen.getByRole("button", { name: "Actions" }));

        expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
            "data-destructive",
            "true",
        );
        expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveAttribute("data-disabled");
    });

    it("restores focus to the trigger after Escape", () => {
        render(<SconeDropdown trigger={<button type="button">Actions</button>} items={items} />);

        const trigger = screen.getByRole("button", { name: "Actions" });
        fireEvent.click(trigger);
        fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

        expect(trigger).toHaveFocus();
    });

    it("closes when pointer or focus moves outside", () => {
        render(
            <>
                <SconeDropdown trigger={<button type="button">Actions</button>} items={items} />
                <button type="button">Outside</button>
            </>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Actions" }));
        fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Actions" }));
        fireEvent.focusIn(screen.getByRole("button", { name: "Outside" }));

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("focuses the first enabled item when opened from the keyboard", () => {
        render(<SconeDropdown trigger={<button type="button">Actions</button>} items={items} />);

        fireEvent.keyDown(screen.getByRole("button", { name: "Actions" }), { key: "ArrowDown" });

        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    });

    it("supports controlled open state", () => {
        const onOpenChange = vi.fn();

        render(
            <SconeDropdown
                trigger={<button type="button">Actions</button>}
                items={items}
                open
                onOpenChange={onOpenChange}
            />,
        );

        expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("renders compound children when items are omitted", () => {
        render(
            <SconeDropdown trigger={<button type="button">Actions</button>}>
                <SconeDropdownItem>Custom action</SconeDropdownItem>
            </SconeDropdown>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Actions" }));

        expect(screen.getByRole("menuitem", { name: "Custom action" })).toBeInTheDocument();
    });
});
