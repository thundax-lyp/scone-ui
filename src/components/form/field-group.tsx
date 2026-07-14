import * as React from "react";

import { cn } from "@/lib/cn";

export interface SconeFieldGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    columns?: 1 | 2 | 3;
    children?: React.ReactNode;
}

const columnsClassNames: Record<NonNullable<SconeFieldGroupProps["columns"]>, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
};

export const SconeFieldGroup = React.forwardRef<HTMLFieldSetElement, SconeFieldGroupProps>(
    ({ title, description, columns = 1, children, className, ...props }, ref) => {
        return (
            <fieldset
                ref={ref}
                data-scone-field-group=""
                data-columns={columns}
                className={cn("space-y-sm", className)}
                {...props}
            >
                {title !== undefined || description !== undefined ? (
                    <div className="space-y-1">
                        {title !== undefined ? (
                            <legend className="text-sm font-medium text-foreground">{title}</legend>
                        ) : null}
                        {description !== undefined ? (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        ) : null}
                    </div>
                ) : null}
                <div className={cn("grid gap-md", columnsClassNames[columns])}>{children}</div>
            </fieldset>
        );
    },
);

SconeFieldGroup.displayName = "SconeFieldGroup";
