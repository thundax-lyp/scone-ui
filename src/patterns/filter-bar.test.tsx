import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterBar } from "./filter-bar";

describe("FilterBar", () => {
    it("renders search input, fields, actions, and summary", () => {
        render(
            <FilterBar.Root>
                <FilterBar.Search ariaLabel="Search users" placeholder="Find users" />
                <FilterBar.Fields>
                    <label htmlFor="status">Status</label>
                    <select id="status" />
                </FilterBar.Fields>
                <FilterBar.Actions>
                    <button type="button">Apply</button>
                </FilterBar.Actions>
                <FilterBar.Summary>2 filters active</FilterBar.Summary>
            </FilterBar.Root>,
        );

        expect(screen.getByPlaceholderText("Find users")).toHaveAttribute(
            "data-scone-filter-bar-part",
            "search",
        );
        expect(
            screen.getByLabelText("Status").closest("[data-scone-filter-bar-part='fields']"),
        ).toBeInTheDocument();
        expect(
            screen
                .getByRole("button", { name: "Apply" })
                .closest("[data-scone-filter-bar-part='actions']"),
        ).toBeInTheDocument();
        expect(
            screen.getByText("2 filters active").closest("[data-scone-filter-bar-part='summary']"),
        ).toBeInTheDocument();
    });

    it("updates search value through controlled boundary", () => {
        const onSearchChange = vi.fn();

        render(
            <FilterBar.Root searchValue="alpha" onSearchChange={onSearchChange}>
                <FilterBar.Search ariaLabel="Search" />
            </FilterBar.Root>,
        );

        const search = screen.getByRole("textbox", { name: "Search" });
        fireEvent.change(search, { target: { value: "beta" } });

        expect(search).toHaveValue("alpha");
        expect(onSearchChange).toHaveBeenCalledWith("beta");
    });

    it("applies and resets current filter state from action buttons", () => {
        const onApply = vi.fn();
        const onReset = vi.fn();

        render(
            <FilterBar.Root
                defaultSearchValue="alice"
                defaultFilters={{ status: "active" }}
                onApply={onApply}
                onReset={onReset}
            >
                <FilterBar.Search ariaLabel="Search" />
                <FilterBar.Actions>
                    <button type="button" data-scone-filter-bar-action="apply">
                        Apply
                    </button>
                    <button type="button" data-scone-filter-bar-action="reset">
                        Reset
                    </button>
                </FilterBar.Actions>
            </FilterBar.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Apply" }));
        expect(onApply).toHaveBeenCalledWith({
            searchValue: "alice",
            filters: { status: "active" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("");
    });

    it("toggles expanded state from caller action buttons", () => {
        const onExpandedChange = vi.fn();

        render(
            <FilterBar.Root expanded={false} onExpandedChange={onExpandedChange}>
                <FilterBar.Fields>Advanced filters</FilterBar.Fields>
                <FilterBar.Actions>
                    <button type="button" data-scone-filter-bar-action="toggle">
                        Expand
                    </button>
                </FilterBar.Actions>
            </FilterBar.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Expand" }));

        expect(onExpandedChange).toHaveBeenCalledWith(true);
        expect(
            screen.getByText("Advanced filters").closest("[data-scone-filter-bar-part='fields']"),
        ).not.toHaveAttribute("data-expanded");
    });

    it("exposes wrapping layout semantics for narrow screens", () => {
        render(
            <FilterBar.Root defaultExpanded>
                <FilterBar.Search />
                <FilterBar.Fields>Fields</FilterBar.Fields>
                <FilterBar.Actions>
                    <button type="button">Apply</button>
                </FilterBar.Actions>
            </FilterBar.Root>,
        );

        expect(screen.getByText("Fields").closest("[data-scone-pattern='filter-bar']")).toHaveClass(
            "flex-wrap",
        );
        expect(
            screen.getByText("Fields").closest("[data-scone-filter-bar-part='fields']"),
        ).toHaveAttribute("data-expanded", "true");
    });
});
