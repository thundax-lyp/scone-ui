import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";

import { cn } from "@/lib/cn";

export interface SconeCollapsibleProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function SconeCollapsible({
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    children,
    className,
}: SconeCollapsibleProps) {
    return (
        <CollapsiblePrimitive.Root
            data-scone-navigation="collapsible"
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            className={cn("w-full", className)}
        >
            <CollapsiblePrimitive.Trigger className="inline-flex items-center rounded-md text-sm font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
                {trigger}
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="pt-2 text-sm text-muted-foreground">
                {children}
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    );
}
