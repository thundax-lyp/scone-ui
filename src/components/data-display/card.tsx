import * as React from "react";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";

export interface SconeCardProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "children"
> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    variant?: "plain" | "outlined" | "elevated";
    children?: React.ReactNode;
    className?: string;
}

const cardVariantClassNames: Record<NonNullable<SconeCardProps["variant"]>, string> = {
    plain: "border-transparent bg-transparent shadow-none ring-0",
    outlined: "shadow-none ring-1 ring-border",
    elevated: "shadow-sm ring-1 ring-foreground/10",
};

export const SconeCard = React.forwardRef<HTMLDivElement, SconeCardProps>(
    (
        {
            title,
            description,
            actions,
            footer,
            loading = false,
            variant = "outlined",
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const hasHeader = title !== undefined || description !== undefined || actions !== undefined;

        return (
            <Card
                ref={ref}
                aria-busy={loading || undefined}
                className={cn(cardVariantClassNames[variant], className)}
                {...props}
            >
                {hasHeader ? (
                    <CardHeader>
                        {title !== undefined ? <CardTitle>{title}</CardTitle> : null}
                        {description !== undefined ? (
                            <CardDescription>{description}</CardDescription>
                        ) : null}
                        {actions !== undefined ? <CardAction>{actions}</CardAction> : null}
                    </CardHeader>
                ) : null}
                <CardContent>
                    <div className="relative min-h-8">
                        <div className={cn(loading && "opacity-50")}>{children}</div>
                        {loading ? (
                            <div
                                role="status"
                                aria-label="Loading card"
                                className="absolute inset-0 flex items-center justify-center rounded-md bg-background/60 text-sm text-muted-foreground"
                            >
                                Loading
                            </div>
                        ) : null}
                    </div>
                </CardContent>
                {footer !== undefined ? <CardFooter>{footer}</CardFooter> : null}
            </Card>
        );
    },
);
SconeCard.displayName = "SconeCard";
