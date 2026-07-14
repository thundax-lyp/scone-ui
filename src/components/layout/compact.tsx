import * as React from "react";

import { cn } from "../../lib/utils";

const compactOrientationClass = {
    horizontal:
        "flex-row [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
    vertical:
        "flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
};

const compactSizeClass = {
    sm: "[&>*]:min-h-control-sm",
    md: "[&>*]:min-h-control-md",
};

export interface SconeCompactProps {
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "md";
    children?: React.ReactNode;
    className?: string;
}

export const SconeCompact = React.forwardRef<HTMLDivElement, SconeCompactProps>(
    ({ orientation = "horizontal", size = "md", children, className }, ref) => {
        return (
            <div
                ref={ref}
                data-scone-layout="compact"
                data-orientation={orientation}
                data-size={size}
                className={cn(
                    "inline-flex isolate",
                    compactOrientationClass[orientation],
                    compactSizeClass[size],
                    className,
                )}
            >
                {children}
            </div>
        );
    },
);

SconeCompact.displayName = "SconeCompact";
