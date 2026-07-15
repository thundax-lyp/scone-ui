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
    info: "border-sky-600 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    success:
        "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    warning: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
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
