import * as React from "react";

import { cn } from "@/lib/utils";
import type { SconeSpacingToken } from "@/types/foundation";

const stackGapClass: Record<SconeSpacingToken, string> = {
    none: "gap-0",
    xs: "gap-[var(--scone-spacing-xs)]",
    sm: "gap-[var(--scone-spacing-sm)]",
    md: "gap-[var(--scone-spacing-md)]",
    lg: "gap-[var(--scone-spacing-lg)]",
    xl: "gap-[var(--scone-spacing-xl)]",
};

const stackAlignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

export interface SconeStackProps {
    gap?: SconeSpacingToken;
    align?: "start" | "center" | "end" | "stretch";
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const SconeStack = React.forwardRef<HTMLDivElement, SconeStackProps>(
    ({ gap = "md", align = "stretch", children, className, style }, ref) => {
        return (
            <div
                ref={ref}
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
