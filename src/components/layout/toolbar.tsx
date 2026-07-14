import * as React from "react";

import { cn } from "../../lib/utils";

const toolbarDensityClass = {
    compact: "min-h-control-sm gap-xs py-xs",
    default: "min-h-control-md gap-sm py-sm",
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
                            className="flex shrink-0 items-center justify-end gap-sm"
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
