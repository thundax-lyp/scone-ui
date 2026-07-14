import * as React from "react";

import { cn } from "@/lib/cn";

const toolbarDensityClass = {
    compact: "min-h-control-sm gap-xs py-xs",
    default: "min-h-control-md gap-sm py-sm",
};

export interface SconeToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    start?: React.ReactNode;
    end?: React.ReactNode;
    density?: "compact" | "default";
}

export const SconeToolbar = React.forwardRef<HTMLDivElement, SconeToolbarProps>(
    ({ start, end, children, density = "default", className, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                data-scone-layout="toolbar"
                data-density={density}
                className={cn(
                    "flex w-full flex-wrap items-center justify-between",
                    toolbarDensityClass[density],
                    className,
                )}
                style={style}
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
