import * as React from "react";

import { cn } from "@/lib/cn";

export interface SconeFormSectionProps extends React.HTMLAttributes<HTMLElement> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

export const SconeFormSection = React.forwardRef<HTMLElement, SconeFormSectionProps>(
    ({ title, description, actions, children, className, ...props }, ref) => {
        const hasHeader = title !== undefined || description !== undefined || actions !== undefined;

        return (
            <section
                ref={ref}
                data-scone-form-section=""
                className={cn("space-y-md", className)}
                {...props}
            >
                {hasHeader ? (
                    <header className="flex flex-wrap items-start justify-between gap-md">
                        <div className="min-w-0 space-y-1">
                            {title !== undefined ? (
                                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                            ) : null}
                            {description !== undefined ? (
                                <p className="text-sm text-muted-foreground">{description}</p>
                            ) : null}
                        </div>
                        {actions !== undefined ? (
                            <div className="flex shrink-0 flex-wrap items-center gap-sm">
                                {actions}
                            </div>
                        ) : null}
                    </header>
                ) : null}
                <div className="space-y-md">{children}</div>
            </section>
        );
    },
);

SconeFormSection.displayName = "SconeFormSection";
