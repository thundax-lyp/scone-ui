import * as React from "react";

import {
    SconeTable,
    type SconeTableColumn,
    type SconeTableScroll,
} from "@/components/data-display";
import { SconeToolbar } from "@/components/layout/toolbar";
import { SconePagination } from "@/components/navigation";
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

export interface DataTableToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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

export interface DataTableTableRegionProps<T> extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children"
> {
    ariaLabel?: string;
    columns?: SconeTableColumn<T>[];
    dataSource?: T[];
    rowKey?: string | ((record: T) => Key);
    children?: React.ReactNode;
    loading?: boolean;
    error?: React.ReactNode | (() => React.ReactNode);
    empty?: React.ReactNode | (() => React.ReactNode);
    heightPreset?: "sm" | "md" | "lg" | "full";
    viewportClassName?: string;
    stickyHeader?: boolean;
    scroll?: SconeTableScroll;
}

export interface DataTablePaginationProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange"
> {
    state?: SconePaginationState;
    onChange?: (nextState: SconePaginationState, reason: SconePaginationChangeReason) => void;
    pageSizeOptions?: number[];
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

const tableRegionHeightClassNames = {
    sm: "min-h-[16rem]",
    md: "min-h-[24rem]",
    lg: "min-h-[32rem]",
    full: "min-h-full",
};

const selectionColumnKey = "__scone_selection__";

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

function renderStateNode(node: React.ReactNode | (() => React.ReactNode)): React.ReactNode {
    return typeof node === "function" ? node() : node;
}

function getRecordKey<T>(record: T, rowKey: string | ((record: T) => Key)): Key {
    if (typeof rowKey === "function") {
        return rowKey(record);
    }

    return (record as Record<string, Key>)[rowKey];
}

function getSelectedRows<T>(
    dataSource: T[],
    rowKey: string | ((record: T) => Key),
    selectedRowKeys: Key[],
): T[] {
    const selectedKeySet = new Set(selectedRowKeys);

    return dataSource.filter((record) => selectedKeySet.has(getRecordKey(record, rowKey)));
}

function withSelectionColumn<T>(
    columns: SconeTableColumn<T>[],
    dataSource: T[],
    rowKey: string | ((record: T) => Key),
    rowSelection: SconeRowSelection<unknown>,
): SconeTableColumn<T>[] {
    const typedRowSelection = rowSelection as SconeRowSelection<T>;
    const selectedKeySet = new Set(typedRowSelection.selectedRowKeys);
    const selectableRows = dataSource.filter(
        (record) => !typedRowSelection.getCheckboxProps?.(record)?.disabled,
    );
    const selectableKeys = selectableRows.map((record) => getRecordKey(record, rowKey));
    const selectedSelectableKeys = selectableKeys.filter((key) => selectedKeySet.has(key));
    const allSelected =
        selectableKeys.length > 0 && selectedSelectableKeys.length === selectableKeys.length;
    const someSelected = selectedSelectableKeys.length > 0 && !allSelected;

    const updateSelection = (nextKeys: Key[]) => {
        typedRowSelection.onChange?.(nextKeys, getSelectedRows(dataSource, rowKey, nextKeys));
    };

    const selectionColumn: SconeTableColumn<T> = {
        key: selectionColumnKey,
        title: (
            <input
                aria-label="Select all rows"
                aria-checked={someSelected ? "mixed" : allSelected}
                type="checkbox"
                checked={allSelected}
                disabled={selectableKeys.length === 0}
                onChange={() => {
                    if (allSelected) {
                        updateSelection(
                            typedRowSelection.selectedRowKeys.filter(
                                (key) => !selectableKeys.includes(key),
                            ),
                        );
                        return;
                    }

                    updateSelection(
                        Array.from(
                            new Set([...typedRowSelection.selectedRowKeys, ...selectableKeys]),
                        ),
                    );
                }}
            />
        ),
        width: 44,
        render: (_value, record) => {
            const key = getRecordKey(record, rowKey);
            const checkboxProps = typedRowSelection.getCheckboxProps?.(record);
            const disabled = checkboxProps?.disabled ?? false;

            return (
                <input
                    aria-label={checkboxProps?.ariaLabel ?? `Select row ${String(key)}`}
                    type="checkbox"
                    checked={selectedKeySet.has(key)}
                    disabled={disabled}
                    onChange={() => {
                        if (disabled) {
                            return;
                        }

                        const nextKeys = selectedKeySet.has(key)
                            ? typedRowSelection.selectedRowKeys.filter(
                                  (selectedKey) => selectedKey !== key,
                              )
                            : [...typedRowSelection.selectedRowKeys, key];

                        updateSelection(nextKeys);
                    }}
                    onClick={(event) => event.stopPropagation()}
                />
            );
        },
    };

    return [selectionColumn, ...columns];
}

function DataTableTableRegion<T>({
    ariaLabel,
    columns,
    dataSource,
    rowKey,
    children,
    loading = false,
    error,
    empty = "No data",
    heightPreset,
    viewportClassName,
    stickyHeader = false,
    scroll,
    className,
    ...props
}: DataTableTableRegionProps<T>) {
    const { density, rowSelection } = useDataTableContext();
    const hasDataMode = columns !== undefined && dataSource !== undefined && rowKey !== undefined;
    const isEmpty = hasDataMode
        ? dataSource.length === 0
        : children === undefined || children === null;

    let content: React.ReactNode;

    if (loading) {
        content = (
            <div className="flex min-h-24 items-center justify-center text-sm text-muted-foreground">
                <span role="status">Loading</span>
            </div>
        );
    } else if (error !== undefined) {
        content = (
            <div className="flex min-h-24 items-center justify-center text-sm text-destructive">
                <span role="alert">{renderStateNode(error)}</span>
            </div>
        );
    } else if (isEmpty) {
        content = (
            <div className="flex min-h-24 items-center justify-center text-sm text-muted-foreground">
                {renderStateNode(empty)}
            </div>
        );
    } else if (hasDataMode) {
        content = (
            <SconeTable
                ariaLabel={ariaLabel}
                columns={
                    rowSelection
                        ? withSelectionColumn(columns, dataSource, rowKey, rowSelection)
                        : columns
                }
                dataSource={dataSource}
                rowKey={rowKey}
                density={density}
                scroll={scroll}
                renderEmpty={null}
            />
        );
    } else {
        content = children;
    }

    return (
        <div
            data-scone-data-table-part="table-region"
            data-sticky-header={stickyHeader || undefined}
            className={cn("min-w-0", className)}
            {...props}
        >
            <div
                data-scone-data-table-viewport=""
                className={cn(
                    "min-w-0 overflow-auto",
                    heightPreset && tableRegionHeightClassNames[heightPreset],
                    stickyHeader && "[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10",
                    viewportClassName,
                )}
            >
                {content}
            </div>
        </div>
    );
}

function DataTablePagination({
    state,
    onChange,
    pageSizeOptions,
    className,
    ...props
}: DataTablePaginationProps) {
    const { density, pagination, onPaginationChange } = useDataTableContext();
    const effectiveState = state ?? pagination;
    const effectiveOnChange = onChange ?? onPaginationChange;

    if (!effectiveState) {
        return null;
    }

    return (
        <div
            data-scone-data-table-part="pagination"
            className={cn("flex justify-end", className)}
            {...props}
        >
            <SconePagination
                state={effectiveState}
                onChange={effectiveOnChange}
                pageSizeOptions={pageSizeOptions}
                density={density === "compact" ? "compact" : "default"}
            />
        </div>
    );
}

export const DataTable = {
    Root: DataTableRoot,
    FilterBar: DataTableFilterBar,
    Toolbar: DataTableToolbar,
    BulkActions: DataTableBulkActions,
    TableRegion: DataTableTableRegion,
    Pagination: DataTablePagination,
};
