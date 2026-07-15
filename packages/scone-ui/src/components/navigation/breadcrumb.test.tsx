import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeBreadcrumb } from "./breadcrumb";

const items = [
    { key: "home", label: "Home", href: "/" },
    { key: "settings", label: "Settings", href: "/settings" },
    { key: "profile", label: "Profile" },
];

describe("SconeBreadcrumb", () => {
    it("marks the final item as the current page", () => {
        render(<SconeBreadcrumb items={items} />);

        expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
        expect(screen.getByText("Profile")).toHaveAttribute("aria-current", "page");
    });

    it("calls onItemClick with the clicked item", () => {
        const onItemClick = vi.fn();

        render(<SconeBreadcrumb items={items} onItemClick={onItemClick} />);
        fireEvent.click(screen.getByRole("link", { name: "Home" }));

        expect(onItemClick).toHaveBeenCalledWith(items[0]);
    });

    it("expands collapsed items from the overflow button", () => {
        render(<SconeBreadcrumb items={items} maxItems={2} />);

        expect(screen.queryByText("Settings")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Show 1 hidden breadcrumb items" }));

        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("does not call onItemClick for disabled items", () => {
        const onItemClick = vi.fn();

        render(
            <SconeBreadcrumb
                items={[items[0], { key: "disabled", label: "Disabled", disabled: true }, items[2]]}
                onItemClick={onItemClick}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Disabled" }));

        expect(onItemClick).not.toHaveBeenCalled();
    });
});
