import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterBar } from "./filter-bar";

describe("FilterBar", () => {
    it("renders search input, fields, actions, and summary", () => {
        render(
            <FilterBar.Root>
                <FilterBar.Search ariaLabel="Search users" placeholder="Find users" />
                <FilterBar.Fields role="group" aria-label="Filter fields">
                    <label htmlFor="status">Status</label>
                    <select id="status" />
                </FilterBar.Fields>
                <FilterBar.Actions role="group" aria-label="Filter actions">
                    <button type="button">Apply</button>
                </FilterBar.Actions>
                <FilterBar.Summary role="status">2 filters active</FilterBar.Summary>
            </FilterBar.Root>,
        );

        expect(screen.getByPlaceholderText("Find users")).toHaveAttribute(
            "data-scone-filter-bar-part",
            "search",
        );
        expect(screen.getByRole("group", { name: "Filter fields" })).toHaveAttribute(
            "data-scone-filter-bar-part",
            "fields",
        );
        expect(screen.getByLabelText("Status")).toBeInTheDocument();
        expect(screen.getByRole("group", { name: "Filter actions" })).toContainElement(
            screen.getByRole("button", { name: "Apply" }),
        );
        expect(screen.getByRole("status")).toHaveTextContent("2 filters active");
    });

    it("updates search value through controlled compound boundary", () => {
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
                <FilterBar.Fields role="group" aria-label="Advanced filters">
                    Advanced filters
                </FilterBar.Fields>
                <FilterBar.Actions>
                    <button type="button" data-scone-filter-bar-action="toggle">
                        Expand
                    </button>
                </FilterBar.Actions>
            </FilterBar.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Expand" }));

        expect(onExpandedChange).toHaveBeenCalledWith(true);
        expect(screen.getByRole("group", { name: "Advanced filters" })).not.toHaveAttribute(
            "data-expanded",
        );
    });

    it("renders controlled built-in search input and reports changes", () => {
        const onSearchChange = vi.fn();

        render(<FilterBar.Root searchValue="" onSearchChange={onSearchChange} />);

        fireEvent.change(screen.getByRole("searchbox", { name: "Search" }), {
            target: { value: "abc" },
        });

        expect(onSearchChange).toHaveBeenCalledWith("abc");
    });

    it("renders built-in search for default search values and applies visible input state", () => {
        const onApply = vi.fn();

        render(<FilterBar.Root defaultSearchValue="alice" onApply={onApply} />);

        const search = screen.getByRole("searchbox", { name: "Search" });
        expect(search).toHaveValue("alice");

        fireEvent.change(search, { target: { value: "bob" } });
        fireEvent.click(screen.getByRole("button", { name: "Apply" }));

        expect(onApply).toHaveBeenCalledWith({ searchValue: "bob", filters: {} });
    });

    it("uses a search slot instead of the built-in search input", () => {
        render(<FilterBar.Root search={<input aria-label="Custom search" />} searchValue="abc" />);

        expect(screen.getByLabelText("Custom search")).toBeInTheDocument();
        expect(screen.queryByRole("searchbox", { name: "Search" })).not.toBeInTheDocument();
    });

    it("renders filter controls and controlled expanded content", () => {
        const { rerender } = render(
            <FilterBar.Root
                filters={<button type="button">Status</button>}
                expandedContent={<label htmlFor="owner">Owner</label>}
                expanded={false}
            />,
        );

        expect(screen.getByRole("button", { name: "Status" })).toBeInTheDocument();
        expect(screen.queryByText("Owner")).not.toBeInTheDocument();

        rerender(
            <FilterBar.Root
                filters={<button type="button">Status</button>}
                expandedContent={<label htmlFor="owner">Owner</label>}
                expanded
            />,
        );

        expect(screen.getByText("Owner")).toBeInTheDocument();
    });

    it("requests expanded state changes without mutating controlled state", () => {
        const onExpandedChange = vi.fn();

        render(
            <FilterBar.Root
                expanded={false}
                onExpandedChange={onExpandedChange}
                expandedContent={<div>Advanced filters</div>}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "More filters" }));

        expect(onExpandedChange).toHaveBeenCalledWith(true);
        expect(screen.queryByText("Advanced filters")).not.toBeInTheDocument();
    });

    it("handles uncontrolled expanded state", () => {
        const onExpandedChange = vi.fn();

        render(
            <FilterBar.Root
                defaultExpanded
                onExpandedChange={onExpandedChange}
                expandedContent={<div>Advanced filters</div>}
            />,
        );

        expect(screen.getByText("Advanced filters")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Less filters" }));

        expect(onExpandedChange).toHaveBeenCalledWith(false);
        expect(screen.queryByText("Advanced filters")).not.toBeInTheDocument();
    });

    it("calls built-in Apply and Reset without clearing controlled inputs", () => {
        const onApply = vi.fn();
        const onReset = vi.fn();
        const onSearchChange = vi.fn();

        render(
            <FilterBar.Root
                searchValue="abc"
                onSearchChange={onSearchChange}
                onApply={onApply}
                onReset={onReset}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Apply" }));
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));

        expect(onApply).toHaveBeenCalledWith({ searchValue: "abc", filters: {} });
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("searchbox", { name: "Search" })).toHaveValue("abc");
        expect(onSearchChange).not.toHaveBeenCalled();
    });

    it("disables built-in Apply and Reset independently", () => {
        const onApply = vi.fn();
        const onReset = vi.fn();

        render(<FilterBar.Root onApply={onApply} onReset={onReset} applyDisabled resetDisabled />);

        fireEvent.click(screen.getByRole("button", { name: "Apply" }));
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));

        expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
        expect(onApply).not.toHaveBeenCalled();
        expect(onReset).not.toHaveBeenCalled();
    });
});
