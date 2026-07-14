import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "../../lib/utils";
import type { SconeStatus } from "../../types/foundation";

export interface SconeProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    status?: SconeStatus;
    showLabel?: boolean;
    label?: React.ReactNode;
}

const statusClasses: Record<SconeStatus, string> = {
    idle: "[&_[data-slot=progress-indicator]]:bg-muted-foreground",
    active: "[&_[data-slot=progress-indicator]]:bg-primary",
    success: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
    error: "[&_[data-slot=progress-indicator]]:bg-destructive",
};

function normalizeProgress(
    value: number,
    max: number,
): {
    value: number;
    max: number;
    percent: number;
} {
    const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;
    const finiteValue = Number.isFinite(value) ? value : 0;
    const normalizedValue = Math.min(Math.max(finiteValue, 0), normalizedMax);

    return {
        value: normalizedValue,
        max: normalizedMax,
        percent: Math.round((normalizedValue / normalizedMax) * 100),
    };
}

export const SconeProgress = React.forwardRef<HTMLDivElement, SconeProgressProps>(
    (
        { value = 0, max = 100, status = "active", showLabel = false, label, className, ...props },
        ref,
    ) => {
        const normalizedProgress = normalizeProgress(value, max);

        return (
            <div
                ref={ref}
                data-scone-progress=""
                data-status={status}
                className={cn("grid w-full gap-2", className)}
                {...props}
            >
                {label || showLabel ? (
                    <div className="flex items-center justify-between gap-3 text-sm">
                        {label ? (
                            <div className="min-w-0 text-muted-foreground">{label}</div>
                        ) : (
                            <span />
                        )}
                        {showLabel ? (
                            <div className="shrink-0 font-medium text-foreground">
                                {normalizedProgress.percent}%
                            </div>
                        ) : null}
                    </div>
                ) : null}
                <ProgressPrimitive.Root
                    value={normalizedProgress.value}
                    max={normalizedProgress.max}
                    aria-valuetext={`${normalizedProgress.percent}%`}
                    className={cn(
                        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
                        statusClasses[status],
                    )}
                    data-slot="progress"
                >
                    <ProgressPrimitive.Indicator
                        className="size-full flex-1 bg-primary transition-all"
                        data-slot="progress-indicator"
                        style={{ transform: `translateX(-${100 - normalizedProgress.percent}%)` }}
                    />
                </ProgressPrimitive.Root>
            </div>
        );
    },
);
SconeProgress.displayName = "SconeProgress";
