import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeTone } from "@/types/foundation";

export interface SconeBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    count?: number | string;
    dot?: boolean;
    tone?: SconeTone;
    overflow?: number;
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
}

const badgeToneClassNames: Record<SconeTone, string> = {
    neutral: "bg-muted text-muted-foreground ring-border",
    info: "bg-sky-600 text-white ring-sky-600",
    success: "bg-emerald-600 text-white ring-emerald-600",
    warning: "bg-amber-500 text-white ring-amber-500",
    danger: "bg-destructive text-destructive-foreground ring-destructive",
};

function formatCount(count: number | string | undefined, overflow: number): string | undefined {
    if (count === undefined || count === null || count === "" || count === 0) {
        return undefined;
    }

    if (typeof count === "number" && count > overflow) {
        return `${overflow}+`;
    }

    return String(count);
}

export const SconeBadge = React.forwardRef<HTMLSpanElement, SconeBadgeProps>(
    (
        {
            count,
            dot = false,
            tone = "danger",
            overflow = 99,
            ariaLabel,
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const displayCount = formatCount(count, overflow);
        const visible = dot || displayCount !== undefined;
        const indicator = visible ? (
            <span
                aria-label={ariaLabel}
                aria-hidden={ariaLabel ? undefined : true}
                className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-full text-[10px] leading-none font-medium ring-2 ring-background",
                    dot ? "size-2.5" : "min-w-5 px-1.5 py-0.5",
                    badgeToneClassNames[tone],
                    className,
                )}
                {...props}
            >
                {dot ? null : displayCount}
            </span>
        ) : null;

        if (children) {
            return (
                <span ref={ref} className="relative inline-flex w-fit max-w-full align-middle">
                    {children}
                    {indicator ? (
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                            {indicator}
                        </span>
                    ) : null}
                </span>
            );
        }

        return (
            <span ref={ref} className="inline-flex w-fit align-middle">
                {indicator}
            </span>
        );
    },
);
SconeBadge.displayName = "SconeBadge";
