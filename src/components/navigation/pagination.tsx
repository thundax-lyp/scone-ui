import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconePaginationChangeReason, SconePaginationState } from "@/types/foundation";

export interface SconePaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    ariaLabel?: string;
    state: SconePaginationState;
    onChange?: (nextState: SconePaginationState, reason: SconePaginationChangeReason) => void;
    pageSizeOptions?: number[];
    density?: "compact" | "default";
}

const defaultPageSizeOptions = [10, 20, 50, 100];

const densityClassNames = {
    compact: {
        root: "gap-xs text-xs",
        control: "h-7 min-w-7 rounded-md px-2 text-xs",
        select: "h-7 rounded-md px-2 text-xs",
    },
    default: {
        root: "gap-sm text-sm",
        control: "h-8 min-w-8 rounded-lg px-2.5 text-sm",
        select: "h-8 rounded-lg px-2.5 text-sm",
    },
};

function getPageCount(state: SconePaginationState): number {
    if (state.pageSize <= 0) {
        return 1;
    }

    return Math.max(1, Math.ceil(state.total / state.pageSize));
}

function getVisiblePages(currentPage: number, pageCount: number): number[] {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(pageCount, currentPage + 2);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPageRange(state: SconePaginationState): string {
    if (state.total <= 0 || state.pageSize <= 0) {
        return `0-0 / ${state.total}`;
    }

    const start = (state.page - 1) * state.pageSize + 1;
    const end = Math.min(state.page * state.pageSize, state.total);

    return `${start}-${end} / ${state.total}`;
}

function getPageSizeOptions(options: number[], pageSize: number): number[] {
    return Array.from(new Set([...options, pageSize])).sort((left, right) => left - right);
}

export const SconePagination = React.forwardRef<HTMLElement, SconePaginationProps>(
    (
        {
            ariaLabel = "Pagination",
            state,
            onChange,
            pageSizeOptions = defaultPageSizeOptions,
            density = "default",
            className,
            ...props
        },
        ref,
    ) => {
        const pageCount = getPageCount(state);
        const currentPage = Math.min(Math.max(state.page, 1), pageCount);
        const classes = densityClassNames[density];
        const visiblePages = getVisiblePages(currentPage, pageCount);

        const commitChange = (
            nextState: SconePaginationState,
            reason: SconePaginationChangeReason,
        ) => {
            onChange?.(nextState, reason);
        };

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                data-scone-navigation="pagination"
                data-density={density}
                className={cn("flex flex-wrap items-center justify-end", classes.root, className)}
                {...props}
            >
                <span className="shrink-0 text-muted-foreground">{getPageRange(state)}</span>
                <div className="flex items-center gap-xs">
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-center border border-border bg-background font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                            classes.control,
                        )}
                        disabled={currentPage <= 1}
                        onClick={() => commitChange({ ...state, page: currentPage - 1 }, "page")}
                    >
                        Previous
                    </button>
                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            type="button"
                            aria-current={page === currentPage ? "page" : undefined}
                            className={cn(
                                "inline-flex items-center justify-center border font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                                page === currentPage
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background",
                                classes.control,
                            )}
                            onClick={() => commitChange({ ...state, page }, "page")}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-center border border-border bg-background font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                            classes.control,
                        )}
                        disabled={currentPage >= pageCount}
                        onClick={() => commitChange({ ...state, page: currentPage + 1 }, "page")}
                    >
                        Next
                    </button>
                </div>
                <label className="inline-flex items-center gap-xs text-muted-foreground">
                    <span>Rows</span>
                    <select
                        aria-label="Rows per page"
                        value={state.pageSize}
                        className={cn(
                            "border border-border bg-background transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50",
                            classes.select,
                        )}
                        onChange={(event) =>
                            commitChange(
                                {
                                    page: 1,
                                    pageSize: Number(event.currentTarget.value),
                                    total: state.total,
                                },
                                "pageSize",
                            )
                        }
                    >
                        {getPageSizeOptions(pageSizeOptions, state.pageSize).map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </label>
            </nav>
        );
    },
);

SconePagination.displayName = "SconePagination";
