import * as React from "react";

import { cn } from "@/lib/cn";
import type { Key, SconeTone } from "@/types/foundation";

export interface SconeTimelineItem {
    key: Key;
    title: React.ReactNode;
    description?: React.ReactNode;
    time?: React.ReactNode;
    tone?: SconeTone;
    icon?: React.ReactNode;
}

export interface SconeTimelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    items: SconeTimelineItem[];
    pending?: React.ReactNode;
    reverse?: boolean;
    onItemClick?: (item: SconeTimelineItem) => void;
    className?: string;
}

const markerToneClassNames: Record<SconeTone, string> = {
    neutral: "border-border bg-background text-muted-foreground",
    info: "border-[var(--scone-color-info)] bg-[color-mix(in_srgb,var(--scone-color-info)_10%,transparent)] text-[var(--scone-color-info)]",
    success:
        "border-[var(--scone-color-success)] bg-[color-mix(in_srgb,var(--scone-color-success)_10%,transparent)] text-[var(--scone-color-success)]",
    warning:
        "border-[var(--scone-color-warning)] bg-[color-mix(in_srgb,var(--scone-color-warning)_10%,transparent)] text-[var(--scone-color-warning)]",
    danger: "border-destructive bg-destructive/10 text-destructive",
};

const TimelineMarker = ({ item }: { item: SconeTimelineItem }) => {
    return (
        <span
            className={cn(
                "z-10 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background text-xs",
                markerToneClassNames[item.tone ?? "neutral"],
            )}
            aria-hidden="true"
        >
            {item.icon ?? ""}
        </span>
    );
};

export const SconeTimeline = React.forwardRef<HTMLDivElement, SconeTimelineProps>(
    ({ items, pending, reverse = false, onItemClick, className, ...props }, ref) => {
        const orderedItems = reverse ? [...items].reverse() : items;
        const pendingNode =
            pending !== undefined ? (
                <li className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
                    <span
                        className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-background"
                        aria-hidden="true"
                    />
                    <div className="min-w-0 pb-4 text-sm text-muted-foreground">{pending}</div>
                </li>
            ) : null;
        const renderedItems = orderedItems.map((item, index) => {
            const content = (
                <div className="min-w-0 space-y-1 text-left">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="min-w-0 font-medium break-words text-foreground">
                            {item.title}
                        </span>
                        {item.time !== undefined ? (
                            <span className="shrink-0 text-xs text-muted-foreground">
                                {item.time}
                            </span>
                        ) : null}
                    </div>
                    {item.description !== undefined ? (
                        <div className="break-words text-muted-foreground">{item.description}</div>
                    ) : null}
                </div>
            );

            return (
                <li
                    key={item.key}
                    className={cn(
                        "relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3",
                        index < orderedItems.length - 1 || pending !== undefined
                            ? "after:absolute after:top-6 after:bottom-0 after:left-3 after:w-px after:bg-border"
                            : undefined,
                    )}
                >
                    <TimelineMarker item={item} />
                    <div className="min-w-0 pb-4 text-sm">
                        {onItemClick ? (
                            <button
                                type="button"
                                className="block w-full rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onClick={() => onItemClick(item)}
                            >
                                {content}
                            </button>
                        ) : (
                            content
                        )}
                    </div>
                </li>
            );
        });

        return (
            <div ref={ref} className={cn("min-w-0", className)} {...props}>
                <ol className="min-w-0">
                    {reverse ? pendingNode : null}
                    {renderedItems}
                    {reverse ? null : pendingNode}
                </ol>
            </div>
        );
    },
);
SconeTimeline.displayName = "SconeTimeline";
