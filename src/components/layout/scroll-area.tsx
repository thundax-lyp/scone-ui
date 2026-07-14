import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface SconeScrollAreaProps extends Omit<
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    "onScroll"
> {
    children?: React.ReactNode;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    className?: string;
    viewportClassName?: string;
}

export const SconeScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    SconeScrollAreaProps
>(({ className, viewportClassName, children, onScroll, ...props }, ref) => {
    return (
        <ScrollAreaPrimitive.Root
            ref={ref}
            data-scone-layout="scroll-area"
            className={cn("relative", className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                data-scone-scroll-area-viewport=""
                className={cn(
                    "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
                    viewportClassName,
                )}
                onScroll={onScroll}
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.ScrollAreaScrollbar
                data-scone-scroll-area-scrollbar=""
                orientation="vertical"
                className="flex touch-none p-px transition-colors select-none data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent"
            >
                <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
            </ScrollAreaPrimitive.ScrollAreaScrollbar>
            <ScrollAreaPrimitive.ScrollAreaScrollbar
                data-scone-scroll-area-scrollbar=""
                orientation="horizontal"
                className="flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent"
            >
                <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
            </ScrollAreaPrimitive.ScrollAreaScrollbar>
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
});

SconeScrollArea.displayName = "SconeScrollArea";
