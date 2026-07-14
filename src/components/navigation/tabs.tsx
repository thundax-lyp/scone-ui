/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface SconeTabsItem {
    value: string;
    label: React.ReactNode;
    content?: React.ReactNode;
    disabled?: boolean;
}

export interface SconeTabsProps extends Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    "onValueChange"
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    activationMode?: "automatic" | "manual";
    items?: SconeTabsItem[];
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
}

function SconeTabsRoot({
    className,
    orientation = "horizontal",
    activationMode = "automatic",
    items,
    ariaLabel,
    children,
    ...props
}: SconeTabsProps) {
    return (
        <TabsPrimitive.Root
            data-scone-navigation="tabs"
            orientation={orientation}
            activationMode={activationMode}
            className={cn(
                "flex min-w-0 gap-3",
                orientation === "vertical" ? "flex-row" : "flex-col",
                className,
            )}
            {...props}
        >
            {items ? (
                <>
                    <SconeTabsList aria-label={ariaLabel}>
                        {items.map((item) => (
                            <SconeTabsTrigger
                                key={item.value}
                                value={item.value}
                                disabled={item.disabled}
                            >
                                {item.label}
                            </SconeTabsTrigger>
                        ))}
                    </SconeTabsList>
                    {items.map((item) => (
                        <SconeTabsContent key={item.value} value={item.value}>
                            {item.content}
                        </SconeTabsContent>
                    ))}
                </>
            ) : (
                children
            )}
        </TabsPrimitive.Root>
    );
}

export interface SconeTabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
    className?: string;
}

const SconeTabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    SconeTabsListProps
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex w-fit items-center gap-1 rounded-md bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col",
            className,
        )}
        {...props}
    />
));
SconeTabsList.displayName = "SconeTabsList";

export interface SconeTabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
    className?: string;
}

const SconeTabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    SconeTabsTriggerProps
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex h-9 min-w-0 items-center justify-center rounded-sm px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm",
            className,
        )}
        {...props}
    />
));
SconeTabsTrigger.displayName = "SconeTabsTrigger";

export interface SconeTabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
    className?: string;
}

const SconeTabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    SconeTabsContentProps
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn("min-w-0 text-sm outline-none", className)}
        {...props}
    />
));
SconeTabsContent.displayName = "SconeTabsContent";

export const SconeTabs = Object.assign(SconeTabsRoot, {
    List: SconeTabsList,
    Trigger: SconeTabsTrigger,
    Content: SconeTabsContent,
});
