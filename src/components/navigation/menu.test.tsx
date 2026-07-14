import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeMenu } from "./menu";

const items = [
    { key: "dashboard", label: "Dashboard" },
    {
        key: "settings",
        label: "Settings",
        children: [
            { key: "profile", label: "Profile" },
            { key: "billing", label: "Billing", disabled: true },
        ],
    },
];

describe("SconeMenu", () => {
    it("selects leaf items without route assumptions", () => {
        const onSelect = vi.fn();

        render(<SconeMenu items={items} onSelect={onSelect} />);

        fireEvent.click(screen.getByRole("menuitem", { name: "Dashboard" }));

        expect(onSelect).toHaveBeenCalledWith("dashboard", items[0]);
        expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveAttribute(
            "aria-current",
            "page",
        );
    });

    it("toggles open groups and reports open keys", () => {
        const onOpenChange = vi.fn();

        render(<SconeMenu items={items} onOpenChange={onOpenChange} />);

        fireEvent.click(screen.getByRole("menuitem", { name: "Settings" }));

        expect(onOpenChange).toHaveBeenCalledWith(["settings"]);
        expect(screen.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
    });

    it("keeps collapsed item names accessible", () => {
        render(<SconeMenu items={items} collapsed />);

        expect(screen.getByRole("menuitem", { name: "Dashboard" })).toBeInTheDocument();
    });

    it("does not select disabled items", () => {
        const onSelect = vi.fn();

        render(<SconeMenu items={items} defaultOpenKeys={["settings"]} onSelect={onSelect} />);

        fireEvent.click(screen.getByRole("menuitem", { name: "Billing" }));

        expect(onSelect).not.toHaveBeenCalled();
    });

    it("moves focus with keyboard controls", () => {
        render(<SconeMenu items={items} defaultOpenKeys={["settings"]} />);

        const dashboard = screen.getByRole("menuitem", { name: "Dashboard" });
        dashboard.focus();
        fireEvent.keyDown(screen.getByRole("navigation", { name: "Menu" }), {
            key: "ArrowDown",
        });

        expect(screen.getByRole("menuitem", { name: "Settings" })).toHaveFocus();
    });

    it("uses horizontal arrow keys for horizontal menus", () => {
        render(<SconeMenu items={items} orientation="horizontal" />);

        const dashboard = screen.getByRole("menuitem", { name: "Dashboard" });
        dashboard.focus();
        fireEvent.keyDown(screen.getByRole("navigation", { name: "Menu" }), {
            key: "ArrowRight",
        });

        expect(screen.getByRole("menuitem", { name: "Settings" })).toHaveFocus();
    });
});
