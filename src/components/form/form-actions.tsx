import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeAlign } from "@/types/foundation";

export interface SconeFormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: SconeAlign;
    sticky?: boolean;
    children?: React.ReactNode;
}

const alignClassNames: Record<SconeAlign, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
};

export const SconeFormActions = React.forwardRef<HTMLDivElement, SconeFormActionsProps>(
    ({ align = "end", sticky = false, children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-scone-form-actions=""
                data-align={align}
                data-sticky={sticky || undefined}
                className={cn(
                    "flex flex-wrap items-center gap-sm border-border bg-background py-sm",
                    alignClassNames[align],
                    sticky && "sticky bottom-0 z-10 border-t",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

SconeFormActions.displayName = "SconeFormActions";
