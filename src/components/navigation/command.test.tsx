import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeCommand } from "./command";

const items = [
    {
        key: "open",
        label: "Open record",
        value: "open record",
        group: "Actions",
        keywords: ["view"],
    },
    {
        key: "archive",
        label: "Archive record",
        value: "archive record",
        group: "Actions",
        disabled: true,
    },
    {
        key: "settings",
        label: "Settings",
        value: "settings",
        group: "Navigation",
    },
];

describe("SconeCommand", () => {
    it("filters commands from input", () => {
        render(<SconeCommand items={items} />);

        fireEvent.change(screen.getByRole("textbox", { name: "Command search" }), {
            target: { value: "settings" },
        });

        expect(screen.getByRole("option", { name: "Settings" })).toBeInTheDocument();
        expect(screen.queryByRole("option", { name: "Open record" })).not.toBeInTheDocument();
    });

    it("calls onValueChange in controlled search mode", () => {
        const onValueChange = vi.fn();

        render(<SconeCommand items={items} value="" onValueChange={onValueChange} />);

        fireEvent.change(screen.getByRole("textbox", { name: "Command search" }), {
            target: { value: "open" },
        });

        expect(onValueChange).toHaveBeenCalledWith("open");
    });

    it("renders groups and loading state", () => {
        const { rerender } = render(<SconeCommand items={items} />);

        expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument();
        expect(screen.getByRole("group", { name: "Navigation" })).toBeInTheDocument();

        rerender(<SconeCommand items={items} loading />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading");
    });

    it("renders empty state", () => {
        render(<SconeCommand items={items} defaultValue="missing" renderEmpty="Nothing found" />);

        expect(screen.getByText("Nothing found")).toBeInTheDocument();
    });

    it("selects enabled items with keyboard", () => {
        const onSelect = vi.fn();

        render(<SconeCommand items={items} onSelect={onSelect} />);

        const input = screen.getByRole("textbox", { name: "Command search" });
        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(onSelect).toHaveBeenCalledWith("open", items[0]);
    });

    it("does not select disabled items", () => {
        const onSelect = vi.fn();

        render(<SconeCommand items={items} selectedKey="archive" onSelect={onSelect} />);

        fireEvent.keyDown(screen.getByRole("textbox", { name: "Command search" }), {
            key: "Enter",
        });
        fireEvent.click(screen.getByRole("option", { name: "Archive record" }));

        expect(onSelect).not.toHaveBeenCalled();
    });
});
