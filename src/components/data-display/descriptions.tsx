import * as React from "react";

import { cn } from "@/lib/cn";
import type { Key, ResponsiveValue, SconeDensity } from "@/types/foundation";

export interface SconeDescriptionItem {
    key: Key;
    label: React.ReactNode;
    value: React.ReactNode;
    span?: 1 | 2 | 3 | 4;
    emptyFallback?: React.ReactNode;
}

export interface SconeDescriptionsProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "children"
> {
    title?: React.ReactNode;
    items: SconeDescriptionItem[];
    columns?: number | ResponsiveValue<number>;
    bordered?: boolean;
    density?: SconeDensity;
    className?: string;
}

const descriptionsDensityClassNames: Record<SconeDensity, string> = {
    compact: "gap-2 text-xs",
    default: "gap-3 text-sm",
    comfortable: "gap-4 text-sm",
};

const itemDensityClassNames: Record<SconeDensity, string> = {
    compact: "gap-1 p-2",
    default: "gap-1.5 p-3",
    comfortable: "gap-2 p-4",
};

type DescriptionsStyle = React.CSSProperties & Record<`--dd-columns${string}`, number>;

function getColumnsStyle(
    columns: number | ResponsiveValue<number> | undefined,
    style: React.CSSProperties | undefined,
): React.CSSProperties {
    const resolved = columns ?? 3;
    const nextStyle: DescriptionsStyle = {
        ...style,
        "--dd-columns": typeof resolved === "number" ? resolved : (resolved.sm ?? 1),
    };

    if (typeof resolved !== "number") {
        nextStyle["--dd-columns-sm"] = resolved.sm ?? nextStyle["--dd-columns"];
        nextStyle["--dd-columns-md"] = resolved.md ?? nextStyle["--dd-columns-sm"];
        nextStyle["--dd-columns-lg"] = resolved.lg ?? nextStyle["--dd-columns-md"];
        nextStyle["--dd-columns-xl"] = resolved.xl ?? nextStyle["--dd-columns-lg"];
    }

    return nextStyle;
}

export const SconeDescriptions = React.forwardRef<HTMLDivElement, SconeDescriptionsProps>(
    (
        {
            title,
            items,
            columns = 3,
            bordered = false,
            density = "default",
            className,
            style,
            ...props
        },
        ref,
    ) => (
        <div ref={ref} className={cn("min-w-0 space-y-3", className)} {...props}>
            {title !== undefined ? (
                <div className="text-sm font-semibold text-foreground">{title}</div>
            ) : null}
            <dl
                style={getColumnsStyle(columns, style)}
                className={cn(
                    "grid min-w-0 [grid-template-columns:repeat(var(--dd-columns),minmax(0,1fr))] sm:[grid-template-columns:repeat(var(--dd-columns-sm,var(--dd-columns)),minmax(0,1fr))] md:[grid-template-columns:repeat(var(--dd-columns-md,var(--dd-columns)),minmax(0,1fr))] lg:[grid-template-columns:repeat(var(--dd-columns-lg,var(--dd-columns)),minmax(0,1fr))] xl:[grid-template-columns:repeat(var(--dd-columns-xl,var(--dd-columns)),minmax(0,1fr))]",
                    descriptionsDensityClassNames[density],
                )}
            >
                {items.map((item) => (
                    <div
                        key={item.key}
                        style={{ gridColumn: `span ${item.span ?? 1} / span ${item.span ?? 1}` }}
                        className={cn(
                            "min-w-0",
                            bordered && "rounded-md border border-border",
                            itemDensityClassNames[density],
                        )}
                    >
                        <dt className="break-words text-muted-foreground">{item.label}</dt>
                        <dd className="min-w-0 break-words text-foreground">
                            {item.value ?? item.emptyFallback}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    ),
);
SconeDescriptions.displayName = "SconeDescriptions";
