import * as React from "react";

import { SconeToolbar } from "@/components/layout/toolbar";
import { cn } from "@/lib/cn";
import type {
    Key,
    SconeDensity,
    SconePaginationChangeReason,
    SconePaginationState,
    SconeRowSelection,
} from "@/types/foundation";

export interface DataTableRootProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    density?: SconeDensity;
    rowSelection?: SconeRowSelection<T>;
    pagination?: SconePaginationState;
    onPaginationChange?: (
        nextState: SconePaginationState,
        reason: SconePaginationChangeReason,
    ) => void;
}

export interface DataTableFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export interface DataTableAction {
    key: Key;
    label: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: React.ReactNode;
    start?: React.ReactNode;
    end?: React.ReactNode;
    actions?: React.ReactNode | DataTableAction[];
    selectedCount?: number;
}

export interface DataTableBulkActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedKeys?: Key[];
    selectedRows?: unknown[];
    actions?: React.ReactNode | DataTableAction[];
    onClearSelection?: () => void;
}

interface DataTableContextValue {
    density: SconeDensity;
    rowSelection?: SconeRowSelection<unknown>;
    pagination?: SconePaginationState;
    onPaginationChange?: (
        nextState: SconePaginationState,
        reason: SconePaginationChangeReason,
    ) => void;
}

const DataTableContext = React.createContext<DataTableContextValue | null>(null);

function useDataTableContext(): DataTableContextValue {
    return (
        React.useContext(DataTableContext) ?? {
            density: "default",
        }
    );
}

function renderActions(actions: React.ReactNode | DataTableAction[] | undefined): React.ReactNode {
    if (!Array.isArray(actions)) {
        return actions;
    }

    return actions.map((action) => (
        <button
            key={action.key}
            type="button"
            disabled={action.disabled}
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            onClick={action.onClick}
        >
            {action.label}
        </button>
    ));
}

function DataTableRoot<T>({
    density = "default",
    rowSelection,
    pagination,
    onPaginationChange,
    className,
    children,
    ...props
}: DataTableRootProps<T>) {
    const contextValue = React.useMemo<DataTableContextValue>(
        () => ({
            density,
            rowSelection: rowSelection as SconeRowSelection<unknown> | undefined,
            pagination,
            onPaginationChange,
        }),
        [density, onPaginationChange, pagination, rowSelection],
    );

    return (
        <DataTableContext.Provider value={contextValue}>
            <div
                data-scone-pattern="data-table"
                data-density={density}
                className={cn("flex min-w-0 flex-col gap-sm", className)}
                {...props}
            >
                {children}
            </div>
        </DataTableContext.Provider>
    );
}

function DataTableFilterBar({ className, children, ...props }: DataTableFilterBarProps) {
    return (
        <div
            data-scone-data-table-part="filter-bar"
            className={cn("min-w-0", className)}
            {...props}
        >
            {children}
        </div>
    );
}

function DataTableToolbar({
    title,
    start,
    end,
    actions,
    selectedCount,
    className,
    ...props
}: DataTableToolbarProps) {
    const { density, rowSelection } = useDataTableContext();
    const derivedSelectedCount = selectedCount ?? rowSelection?.selectedRowKeys.length;
    const renderedActions = renderActions(actions);

    return (
        <SconeToolbar
            density={density === "compact" ? "compact" : "default"}
            className={className}
            start={
                <div className="flex min-w-0 flex-wrap items-center gap-sm">
                    {title ? <div className="font-medium text-foreground">{title}</div> : null}
                    {start}
                    {derivedSelectedCount !== undefined ? (
                        <span className="text-sm text-muted-foreground">
                            {derivedSelectedCount} selected
                        </span>
                    ) : null}
                </div>
            }
            end={
                <div className="flex shrink-0 flex-wrap items-center justify-end gap-sm">
                    {end}
                    {renderedActions}
                </div>
            }
            {...props}
        />
    );
}

function DataTableBulkActions({
    selectedKeys,
    selectedRows,
    actions,
    onClearSelection,
    className,
    children,
    ...props
}: DataTableBulkActionsProps) {
    const { rowSelection } = useDataTableContext();
    const effectiveSelectedKeys = selectedKeys ?? rowSelection?.selectedRowKeys ?? [];
    const effectiveSelectedRows = selectedRows ?? [];

    if (effectiveSelectedKeys.length === 0) {
        return null;
    }

    const clearSelection = () => {
        if (onClearSelection) {
            onClearSelection();
            return;
        }

        rowSelection?.onChange?.([], []);
    };

    return (
        <div
            data-scone-data-table-part="bulk-actions"
            className={cn(
                "flex min-w-0 flex-wrap items-center justify-between gap-sm rounded-lg border border-border bg-muted/30 px-3 py-2",
                className,
            )}
            {...props}
        >
            <span className="text-sm text-muted-foreground">
                {effectiveSelectedKeys.length} selected
            </span>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-sm">
                {children}
                {renderActions(actions)}
                <button
                    type="button"
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    onClick={clearSelection}
                >
                    Clear selection
                </button>
            </div>
            <span hidden>{effectiveSelectedRows.length}</span>
        </div>
    );
}

export const DataTable = {
    Root: DataTableRoot,
    FilterBar: DataTableFilterBar,
    Toolbar: DataTableToolbar,
    BulkActions: DataTableBulkActions,
};
