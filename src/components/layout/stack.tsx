import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeSpacingToken } from "../../types/foundation";

const stackGapClass: Record<SconeSpacingToken, string> = {
    none: "gap-0",
    xs: "gap-xs",
    sm: "gap-sm",
    md: "gap-md",
    lg: "gap-lg",
    xl: "gap-xl",
};

const stackAlignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

export interface SconeStackProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: SconeSpacingToken;
    align?: "start" | "center" | "end" | "stretch";
}

export const SconeStack = React.forwardRef<HTMLDivElement, SconeStackProps>(
    ({ gap = "md", align = "stretch", children, className, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                data-scone-layout="stack"
                data-gap={gap}
                data-align={align}
                className={cn(
                    "flex flex-col",
                    stackGapClass[gap],
                    stackAlignClass[align],
                    className,
                )}
                style={style}
            >
                {children}
            </div>
        );
    },
);

SconeStack.displayName = "SconeStack";
