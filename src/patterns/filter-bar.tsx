import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

export type FilterBarFilters = Record<string, unknown>;

export interface FilterBarState {
    searchValue: string;
    filters: FilterBarFilters;
}

export interface FilterBarRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onReset"> {
    children: React.ReactNode;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchChange?: (value: string) => void;
    filters?: FilterBarFilters;
    defaultFilters?: FilterBarFilters;
    onFiltersChange?: (filters: FilterBarFilters) => void;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    onApply?: (state: FilterBarState) => void;
    onReset?: () => void;
}

export interface FilterBarSearchProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue"
> {
    placeholder?: string;
    ariaLabel?: string;
}

export interface FilterBarFieldsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface FilterBarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface FilterBarSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

interface FilterBarContextValue {
    searchValue: string;
    setSearchValue: (value: string) => void;
    filters: FilterBarFilters;
    setFilters: (filters: FilterBarFilters) => void;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

const FilterBarContext = React.createContext<FilterBarContextValue | null>(null);

function useFilterBarContext(): FilterBarContextValue {
    const context = React.useContext(FilterBarContext);

    if (!context) {
        throw new Error("FilterBar compound parts must be rendered inside FilterBar.Root.");
    }

    return context;
}

function FilterBarRoot({
    searchValue,
    defaultSearchValue = "",
    onSearchChange,
    filters,
    defaultFilters,
    onFiltersChange,
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    onApply,
    onReset,
    className,
    children,
    onClick,
    ...props
}: FilterBarRootProps) {
    const [effectiveSearchValue = "", setSearchValue] = useControllableState({
        value: searchValue,
        defaultValue: defaultSearchValue,
        onValueChange: onSearchChange,
    });
    const [effectiveFilters = {}, setFilters] = useControllableState<FilterBarFilters>({
        value: filters,
        defaultValue: () => defaultFilters ?? {},
        onValueChange: onFiltersChange,
    });
    const [effectiveExpanded = false, setExpanded] = useControllableState({
        value: expanded,
        defaultValue: defaultExpanded,
        onValueChange: onExpandedChange,
    });

    const contextValue = React.useMemo<FilterBarContextValue>(
        () => ({
            searchValue: effectiveSearchValue,
            setSearchValue,
            filters: effectiveFilters,
            setFilters,
            expanded: effectiveExpanded,
            setExpanded,
        }),
        [
            effectiveExpanded,
            effectiveFilters,
            effectiveSearchValue,
            setExpanded,
            setFilters,
            setSearchValue,
        ],
    );

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        onClick?.(event);

        if (event.defaultPrevented || !(event.target instanceof Element)) {
            return;
        }

        const action = event.target.closest<HTMLElement>("[data-scone-filter-bar-action]");

        if (!action || !event.currentTarget.contains(action)) {
            return;
        }

        switch (action.dataset.sconeFilterBarAction) {
            case "apply":
                onApply?.({ searchValue: effectiveSearchValue, filters: effectiveFilters });
                break;
            case "reset":
                setSearchValue("");
                setFilters({});
                onReset?.();
                break;
            case "toggle":
                setExpanded(!effectiveExpanded);
                break;
        }
    };

    return (
        <FilterBarContext.Provider value={contextValue}>
            <div
                data-scone-pattern="filter-bar"
                data-expanded={effectiveExpanded ? "true" : undefined}
                className={cn(
                    "flex min-w-0 flex-wrap items-center gap-sm rounded-lg border border-border bg-background p-sm",
                    className,
                )}
                onClick={handleClick}
                {...props}
            >
                {children}
            </div>
        </FilterBarContext.Provider>
    );
}

function FilterBarSearch({
    ariaLabel = "Search filters",
    placeholder = "Search",
    className,
    onChange,
    ...props
}: FilterBarSearchProps) {
    const { searchValue, setSearchValue } = useFilterBarContext();

    return (
        <input
            data-scone-filter-bar-part="search"
            aria-label={ariaLabel}
            placeholder={placeholder}
            value={searchValue}
            className={cn(
                "h-9 min-w-48 rounded-md border border-input bg-background px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            onChange={(event) => {
                setSearchValue(event.currentTarget.value);
                onChange?.(event);
            }}
            {...props}
        />
    );
}

function FilterBarFields({ className, children, ...props }: FilterBarFieldsProps) {
    const { expanded } = useFilterBarContext();

    return (
        <div
            data-scone-filter-bar-part="fields"
            data-expanded={expanded ? "true" : undefined}
            className={cn("flex min-w-0 flex-1 flex-wrap items-center gap-sm", className)}
            {...props}
        >
            {children}
        </div>
    );
}

function FilterBarActions({ className, children, ...props }: FilterBarActionsProps) {
    return (
        <div
            data-scone-filter-bar-part="actions"
            className={cn("flex shrink-0 flex-wrap items-center justify-end gap-sm", className)}
            {...props}
        >
            {children}
        </div>
    );
}

function FilterBarSummary({ className, children, ...props }: FilterBarSummaryProps) {
    if (!children) {
        return null;
    }

    return (
        <div
            data-scone-filter-bar-part="summary"
            className={cn("basis-full text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export const FilterBar = {
    Root: FilterBarRoot,
    Search: FilterBarSearch,
    Fields: FilterBarFields,
    Actions: FilterBarActions,
    Summary: FilterBarSummary,
};
