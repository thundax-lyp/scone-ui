import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface SconeTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: "top" | "right" | "bottom" | "left";
    delay?: number;
    className?: string;
}

export function SconeTooltip({
    content,
    children,
    open,
    defaultOpen,
    onOpenChange,
    side = "top",
    delay = 0,
    className,
}: SconeTooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={delay}>
            <TooltipPrimitive.Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={side}
                        sideOffset={4}
                        data-scone-navigation="tooltip"
                        className={cn(
                            "z-50 max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
                            className,
                        )}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-foreground" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
