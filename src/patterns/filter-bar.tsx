import * as React from "react";

import { SconeButton, SconeSearchInput } from "@/components/form";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

export type FilterBarFilters = Record<string, unknown>;

export interface FilterBarState {
    searchValue: string;
    filters: FilterBarFilters;
}

type FilterBarFilterControls = React.ReactNode;

export interface FilterBarRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onReset"> {
    children?: React.ReactNode;
    search?: React.ReactNode;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filters?: FilterBarFilters | FilterBarFilterControls;
    defaultFilters?: FilterBarFilters;
    onFiltersChange?: (filters: FilterBarFilters) => void;
    expandedContent?: React.ReactNode;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    onApply?: (state: FilterBarState) => void;
    onReset?: () => void;
    applyLabel?: React.ReactNode;
    resetLabel?: React.ReactNode;
    expandLabel?: React.ReactNode;
    collapseLabel?: React.ReactNode;
    applyDisabled?: boolean;
    resetDisabled?: boolean;
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

function isFilterState(filters: FilterBarRootProps["filters"]): filters is FilterBarFilters {
    return (
        filters !== null &&
        filters !== undefined &&
        typeof filters === "object" &&
        !React.isValidElement(filters) &&
        !Array.isArray(filters)
    );
}

function shouldRenderSearch({
    search,
    searchValue,
    defaultSearchValue,
    onSearchChange,
}: Pick<FilterBarRootProps, "search" | "searchValue" | "defaultSearchValue" | "onSearchChange">) {
    return (
        search !== undefined ||
        searchValue !== undefined ||
        defaultSearchValue !== undefined ||
        onSearchChange !== undefined
    );
}

function FilterBarRoot({
    search,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    searchPlaceholder = "Search",
    filters,
    defaultFilters,
    onFiltersChange,
    expandedContent,
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    onApply,
    onReset,
    applyLabel = "Apply",
    resetLabel = "Reset",
    expandLabel = "More filters",
    collapseLabel = "Less filters",
    applyDisabled = false,
    resetDisabled = false,
    className,
    children,
    onClick,
    ...props
}: FilterBarRootProps) {
    const filterControls = isFilterState(filters) ? undefined : filters;
    const controlledFilters = isFilterState(filters) ? filters : undefined;
    const [effectiveSearchValue = "", setSearchValue] = useControllableState({
        value: searchValue,
        defaultValue: defaultSearchValue ?? "",
        onValueChange: onSearchChange,
    });
    const [effectiveFilters = {}, setFilters] = useControllableState<FilterBarFilters>({
        value: controlledFilters,
        defaultValue: () => defaultFilters ?? {},
        onValueChange: onFiltersChange,
    });
    const [effectiveExpanded = false, setExpanded] = useControllableState({
        value: expanded,
        defaultValue: defaultExpanded,
        onValueChange: onExpandedChange,
    });
    const hasExpandedContent = expandedContent !== undefined && expandedContent !== null;
    const hasActions = onApply !== undefined || onReset !== undefined;
    const rendersSearch = shouldRenderSearch({
        search,
        searchValue,
        defaultSearchValue,
        onSearchChange,
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

    const handleAction = (actionName: string | undefined) => {
        switch (actionName) {
            case "apply":
                onApply?.({ searchValue: effectiveSearchValue, filters: effectiveFilters });
                break;
            case "reset":
                if (searchValue === undefined) {
                    setSearchValue("");
                }
                if (controlledFilters === undefined) {
                    setFilters({});
                }
                onReset?.();
                break;
            case "toggle":
                setExpanded(!effectiveExpanded);
                break;
        }
    };

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        onClick?.(event);

        if (event.defaultPrevented || !(event.target instanceof Element)) {
            return;
        }

        const action = event.target.closest<HTMLElement>("[data-scone-filter-bar-action]");

        if (!action || !event.currentTarget.contains(action)) {
            return;
        }

        handleAction(action.dataset.sconeFilterBarAction);
    };

    return (
        <FilterBarContext.Provider value={contextValue}>
            <div
                data-scone-pattern="filter-bar"
                data-expanded={effectiveExpanded ? "true" : undefined}
                className={cn(
                    "flex min-w-0 flex-col gap-sm rounded-lg border border-border bg-background p-sm",
                    className,
                )}
                onClick={handleClick}
                {...props}
            >
                {children ?? (
                    <>
                        <div
                            data-scone-filter-bar-part="row"
                            className="flex min-w-0 flex-wrap items-center gap-sm"
                        >
                            {rendersSearch ? (
                                <div
                                    data-scone-filter-bar-part="search"
                                    className="min-w-56 flex-1"
                                >
                                    {search ?? (
                                        <SconeSearchInput
                                            ariaLabel="Search"
                                            value={effectiveSearchValue}
                                            onValueChange={setSearchValue}
                                            placeholder={searchPlaceholder}
                                        />
                                    )}
                                </div>
                            ) : null}
                            {filterControls ? (
                                <div
                                    data-scone-filter-bar-part="filters"
                                    className="flex min-w-0 flex-wrap items-center gap-sm"
                                >
                                    {filterControls}
                                </div>
                            ) : null}
                            {hasExpandedContent || hasActions ? (
                                <div
                                    data-scone-filter-bar-part="actions"
                                    className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-sm"
                                >
                                    {hasExpandedContent ? (
                                        <SconeButton
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleAction("toggle")}
                                            aria-expanded={effectiveExpanded}
                                        >
                                            {effectiveExpanded ? collapseLabel : expandLabel}
                                        </SconeButton>
                                    ) : null}
                                    {onReset ? (
                                        <SconeButton
                                            type="button"
                                            variant="outline"
                                            disabled={resetDisabled}
                                            onClick={() => handleAction("reset")}
                                        >
                                            {resetLabel}
                                        </SconeButton>
                                    ) : null}
                                    {onApply ? (
                                        <SconeButton
                                            type="button"
                                            disabled={applyDisabled}
                                            onClick={() => handleAction("apply")}
                                        >
                                            {applyLabel}
                                        </SconeButton>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                        {hasExpandedContent && effectiveExpanded ? (
                            <div
                                data-scone-filter-bar-part="expanded"
                                className="grid min-w-0 gap-sm border-t border-border pt-sm"
                            >
                                {expandedContent}
                            </div>
                        ) : null}
                    </>
                )}
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
