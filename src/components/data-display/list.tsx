import * as React from "react";

import { cn } from "@/lib/cn";
import type { Key, SconeDensity } from "@/types/foundation";

export interface SconeListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    dataSource: T[];
    renderItem: (item: T) => React.ReactNode;
    rowKey: string | ((item: T) => Key);
    loading?: boolean;
    renderEmpty?: React.ReactNode | (() => React.ReactNode);
    renderError?: React.ReactNode | (() => React.ReactNode);
    density?: SconeDensity;
    bordered?: boolean;
    className?: string;
}

const listDensityClassNames: Record<SconeDensity, string> = {
    compact: "divide-y text-xs",
    default: "divide-y text-sm",
    comfortable: "divide-y text-sm",
};

const itemDensityClassNames: Record<SconeDensity, string> = {
    compact: "py-2",
    default: "py-3",
    comfortable: "py-4",
};

function renderStateNode(node: React.ReactNode | (() => React.ReactNode)): React.ReactNode {
    return typeof node === "function" ? node() : node;
}

function getItemKey<T>(item: T, rowKey: string | ((item: T) => Key)): Key {
    if (typeof rowKey === "function") {
        return rowKey(item);
    }

    return (item as Record<string, Key>)[rowKey];
}

function SconeListInner<T>(
    {
        dataSource,
        renderItem,
        rowKey,
        loading = false,
        renderEmpty = "No data",
        renderError,
        density = "default",
        bordered = false,
        className,
        ...props
    }: SconeListProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    let content: React.ReactNode;

    if (loading) {
        content = (
            <div role="status" className="py-6 text-center text-muted-foreground">
                Loading
            </div>
        );
    } else if (renderError !== undefined) {
        content = (
            <div role="alert" className="py-6 text-center text-destructive">
                {renderStateNode(renderError)}
            </div>
        );
    } else if (dataSource.length === 0) {
        content = (
            <div className="py-6 text-center text-muted-foreground">
                {renderStateNode(renderEmpty)}
            </div>
        );
    } else {
        content = dataSource.map((item) => (
            <div
                key={getItemKey(item, rowKey)}
                className={cn("min-w-0", itemDensityClassNames[density])}
            >
                {renderItem(item)}
            </div>
        ));
    }

    return (
        <div
            ref={ref}
            className={cn(
                "min-w-0",
                bordered && "rounded-md border border-border px-3",
                listDensityClassNames[density],
                className,
            )}
            {...props}
        >
            {content}
        </div>
    );
}

export const SconeList = React.forwardRef(SconeListInner) as <T>(
    props: SconeListProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;
(SconeList as { displayName?: string }).displayName = "SconeList";
