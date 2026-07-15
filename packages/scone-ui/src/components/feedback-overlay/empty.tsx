import * as React from "react";

import { cn } from "@/lib/cn";

export interface SconeEmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    image?: React.ReactNode;
    action?: React.ReactNode;
}

export const SconeEmpty = React.forwardRef<HTMLDivElement, SconeEmptyProps>(
    ({ title, description, image, action, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-scone-empty=""
                className={cn(
                    "flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center",
                    className,
                )}
                {...props}
            >
                {image ? (
                    <div className="text-muted-foreground" data-slot="empty-image">
                        {image}
                    </div>
                ) : null}
                <div className="space-y-1">
                    {title ? <div className="font-medium text-foreground">{title}</div> : null}
                    {description ? (
                        <div className="text-sm text-muted-foreground">{description}</div>
                    ) : null}
                    {children}
                </div>
                {action ? (
                    <div className="flex justify-center" data-slot="empty-action">
                        {action}
                    </div>
                ) : null}
            </div>
        );
    },
);
SconeEmpty.displayName = "SconeEmpty";
