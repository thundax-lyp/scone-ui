"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface SconeSeparatorProps extends Omit<
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    "asChild"
> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    className?: string;
}

export const SconeSeparator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    SconeSeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
        <SeparatorPrimitive.Root
            ref={ref}
            data-scone-layout="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
                className,
            )}
            {...props}
        />
    );
});

SconeSeparator.displayName = "SconeSeparator";
