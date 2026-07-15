import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeTone } from "@/types/foundation";

export interface SconeStatisticProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "children" | "prefix"
> {
    title?: React.ReactNode;
    value: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    description?: React.ReactNode;
    tone?: SconeTone;
    className?: string;
}

const statisticToneClassNames: Record<SconeTone, string> = {
    neutral: "text-foreground",
    info: "text-[var(--scone-color-info)]",
    success: "text-[var(--scone-color-success)]",
    warning: "text-[var(--scone-color-warning)]",
    danger: "text-destructive",
};

export const SconeStatistic = React.forwardRef<HTMLDivElement, SconeStatisticProps>(
    ({ title, value, prefix, suffix, description, tone = "neutral", className, ...props }, ref) => (
        <div ref={ref} className={cn("min-w-0 space-y-1", className)} {...props}>
            {title !== undefined ? (
                <div className="text-sm font-medium text-muted-foreground">{title}</div>
            ) : null}
            <div
                className={cn(
                    "flex min-w-0 items-baseline gap-1 text-2xl leading-tight font-semibold tracking-normal",
                    statisticToneClassNames[tone],
                )}
            >
                {prefix !== undefined ? <span className="shrink-0 text-base">{prefix}</span> : null}
                <span className="min-w-0 truncate">{value}</span>
                {suffix !== undefined ? <span className="shrink-0 text-base">{suffix}</span> : null}
            </div>
            {description !== undefined ? (
                <div className="text-sm text-muted-foreground">{description}</div>
            ) : null}
        </div>
    ),
);
SconeStatistic.displayName = "SconeStatistic";
