import { fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { SconePagination } from "./pagination";

const state = {
    page: 2,
    pageSize: 10,
    total: 57,
};

describe("SconePagination", () => {
    it("renders a named pagination nav with range, pages, and page size control", () => {
        render(<SconePagination ariaLabel="User pagination" state={state} />);

        const pagination = screen.getByRole("navigation", { name: "User pagination" });

        expect(within(pagination).getByText("11-20 / 57")).toBeInTheDocument();
        expect(within(pagination).getByRole("button", { name: "2" })).toHaveAttribute(
            "aria-current",
            "page",
        );
        expect(within(pagination).getByRole("combobox", { name: "Rows per page" })).toHaveValue(
            "10",
        );
    });

    it("submits page changes from previous, next, and page buttons", () => {
        const onChange = vi.fn();

        render(<SconePagination state={state} onChange={onChange} />);

        fireEvent.click(screen.getByRole("button", { name: "Previous" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        fireEvent.click(screen.getByRole("button", { name: "3" }));

        expect(onChange).toHaveBeenNthCalledWith(1, { ...state, page: 1 }, "page");
        expect(onChange).toHaveBeenNthCalledWith(2, { ...state, page: 3 }, "page");
        expect(onChange).toHaveBeenNthCalledWith(3, { ...state, page: 3 }, "page");
    });

    it("disables previous and next at page boundaries", () => {
        const { rerender } = render(
            <SconePagination state={{ page: 1, pageSize: 10, total: 57 }} />,
        );

        expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();

        rerender(<SconePagination state={{ page: 6, pageSize: 10, total: 57 }} />);

        expect(screen.getByRole("button", { name: "Previous" })).not.toBeDisabled();
        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    });

    it("resets to the first page when page size changes", () => {
        const onChange = vi.fn();

        render(<SconePagination state={state} onChange={onChange} pageSizeOptions={[10, 25]} />);

        fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
            target: { value: "25" },
        });

        expect(onChange).toHaveBeenCalledWith({ page: 1, pageSize: 25, total: 57 }, "pageSize");
    });

    it("applies density, className, and ref to the nav", () => {
        const ref = createRef<HTMLElement>();

        render(
            <SconePagination
                ref={ref}
                className="custom-pagination"
                density="compact"
                state={state}
            />,
        );

        expect(ref.current).toBe(screen.getByRole("navigation", { name: "Pagination" }));
        expect(ref.current).toHaveClass("custom-pagination", "gap-xs", "text-xs");
        expect(screen.getByRole("button", { name: "Previous" })).toHaveClass("h-7");
    });
});
