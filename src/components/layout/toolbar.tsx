import * as React from "react";

import { cn } from "@/lib/utils";

const toolbarDensityClass = {
    compact:
        "min-h-[var(--scone-toolbar-height-compact)] gap-[var(--scone-spacing-xs)] py-[var(--scone-spacing-xs)]",
    default:
        "min-h-[var(--scone-toolbar-height-default)] gap-[var(--scone-spacing-sm)] py-[var(--scone-spacing-sm)]",
};

export interface SconeToolbarProps {
    start?: React.ReactNode;
    end?: React.ReactNode;
    children?: React.ReactNode;
    density?: "compact" | "default";
    className?: string;
}

export const SconeToolbar = React.forwardRef<HTMLDivElement, SconeToolbarProps>(
    ({ start, end, children, density = "default", className }, ref) => {
        return (
            <div
                ref={ref}
                data-scone-layout="toolbar"
                data-density={density}
                className={cn(
                    "flex w-full flex-wrap items-center justify-between",
                    toolbarDensityClass[density],
                    className,
                )}
            >
                {children ?? (
                    <>
                        <div
                            data-scone-toolbar-start=""
                            className="flex min-w-0 flex-1 items-center"
                        >
                            {start}
                        </div>
                        <div
                            data-scone-toolbar-end=""
                            className="flex shrink-0 items-center justify-end gap-[var(--scone-spacing-sm)]"
                        >
                            {end}
                        </div>
                    </>
                )}
            </div>
        );
    },
);

SconeToolbar.displayName = "SconeToolbar";
