import * as React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/cn";
import type { Key, SconeAlign, SconeDensity } from "@/types/foundation";

export interface SconeTableColumn<T> {
    key: Key;
    title: React.ReactNode;
    dataIndex?: keyof T | readonly (string | number)[];
    width?: number | string;
    minWidth?: number;
    align?: SconeAlign;
    sortable?: boolean;
    render?: (value: unknown, record: T, index: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface SconeTableScroll {
    x?: number | string | true;
}

export interface SconeTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    ariaLabel?: string;
    columns: SconeTableColumn<T>[];
    dataSource: T[];
    rowKey: string | ((record: T) => Key);
    renderEmpty?: React.ReactNode | (() => React.ReactNode);
    renderError?: React.ReactNode | (() => React.ReactNode);
    loading?: boolean;
    density?: SconeDensity;
    scroll?: SconeTableScroll;
    onRow?: (record: T) => React.HTMLAttributes<HTMLTableRowElement>;
    onCell?: (record: T, column: SconeTableColumn<T>) => React.HTMLAttributes<HTMLTableCellElement>;
    className?: string;
}

const tableDensityClassNames: Record<SconeDensity, string> = {
    compact: "[&_td]:py-1.5 [&_th]:h-8",
    default: "[&_td]:py-2 [&_th]:h-10",
    comfortable: "[&_td]:py-3 [&_th]:h-12",
};

const alignClassNames: Record<SconeAlign, string> = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
};

const renderStateNode = (node: React.ReactNode | (() => React.ReactNode)): React.ReactNode => {
    return typeof node === "function" ? node() : node;
};

const getRecordKey = <T,>(record: T, rowKey: string | ((record: T) => Key)): Key => {
    if (typeof rowKey === "function") {
        return rowKey(record);
    }

    return (record as Record<string, Key>)[rowKey];
};

const getValue = <T,>(record: T, dataIndex: SconeTableColumn<T>["dataIndex"]): unknown => {
    if (dataIndex === undefined) {
        return undefined;
    }

    if (Array.isArray(dataIndex)) {
        return dataIndex.reduce<unknown>((current, key) => {
            if (current === null || current === undefined) {
                return undefined;
            }

            return (current as Record<string | number, unknown>)[key];
        }, record);
    }

    return record[dataIndex as keyof T];
};

const getScrollStyle = (scroll: SconeTableScroll | undefined): React.CSSProperties | undefined => {
    if (!scroll?.x) {
        return undefined;
    }

    if (scroll.x === true) {
        return { minWidth: "max-content" };
    }

    return { minWidth: scroll.x };
};

const SconeTableInner = <T,>(
    {
        ariaLabel,
        columns,
        dataSource,
        rowKey,
        renderEmpty = "No data",
        renderError,
        loading = false,
        density = "default",
        scroll,
        onRow,
        onCell,
        className,
        ...props
    }: SconeTableProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const stateColSpan = Math.max(columns.length, 1);

    let body: React.ReactNode;

    if (loading) {
        body = (
            <TableRow>
                <TableCell
                    colSpan={stateColSpan}
                    className="py-8 text-center text-muted-foreground"
                >
                    <span role="status">Loading</span>
                </TableCell>
            </TableRow>
        );
    } else if (renderError !== undefined) {
        body = (
            <TableRow>
                <TableCell colSpan={stateColSpan} className="py-8 text-center text-destructive">
                    <span role="alert">{renderStateNode(renderError)}</span>
                </TableCell>
            </TableRow>
        );
    } else if (dataSource.length === 0) {
        body = (
            <TableRow>
                <TableCell
                    colSpan={stateColSpan}
                    className="py-8 text-center text-muted-foreground"
                >
                    {renderStateNode(renderEmpty)}
                </TableCell>
            </TableRow>
        );
    } else {
        body = dataSource.map((record) => {
            const rowProps = onRow?.(record) ?? {};

            return (
                <TableRow key={getRecordKey(record, rowKey)} {...rowProps}>
                    {columns.map((column, index) => {
                        const value = getValue(record, column.dataIndex);
                        const cellProps = onCell?.(record, column) ?? {};

                        return (
                            <TableCell
                                key={column.key}
                                {...cellProps}
                                style={{
                                    width: column.width,
                                    minWidth: column.minWidth,
                                    ...cellProps.style,
                                }}
                                className={cn(
                                    column.align && alignClassNames[column.align],
                                    column.className,
                                    cellProps.className,
                                )}
                            >
                                {column.render
                                    ? column.render(value, record, index)
                                    : (value as React.ReactNode)}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        });
    }

    return (
        <div ref={ref} className={cn("min-w-0 overflow-x-auto", className)} {...props}>
            <Table
                aria-label={ariaLabel}
                style={getScrollStyle(scroll)}
                className={cn("min-w-full", tableDensityClassNames[density])}
            >
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                style={{ width: column.width, minWidth: column.minWidth }}
                                className={cn(
                                    column.align && alignClassNames[column.align],
                                    column.headerClassName,
                                )}
                            >
                                <span className="inline-flex items-center gap-1">
                                    {column.title}
                                    {column.sortable ? <span aria-hidden="true">↕</span> : null}
                                </span>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>{body}</TableBody>
            </Table>
        </div>
    );
};

export const SconeTable = React.forwardRef(SconeTableInner) as <T>(
    props: SconeTableProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;
(SconeTable as { displayName?: string }).displayName = "SconeTable";
