/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

export interface SconeTabsItem {
    value: string;
    label: React.ReactNode;
    content?: React.ReactNode;
    disabled?: boolean;
}

export interface SconeTabsProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    activationMode?: "automatic" | "manual";
    items?: SconeTabsItem[];
    ariaLabel?: string;
    children?: React.ReactNode;
}

interface SconeTabsContextValue {
    value: string | undefined;
    setValue: (value: string) => void;
    orientation: "horizontal" | "vertical";
    activationMode: "automatic" | "manual";
    baseId: string;
}

const SconeTabsContext = React.createContext<SconeTabsContextValue | null>(null);

const useSconeTabsContext = (component: string): SconeTabsContextValue => {
    const context = React.useContext(SconeTabsContext);
    if (!context) {
        throw new Error(`${component} must be used inside SconeTabs.`);
    }
    return context;
};

const SconeTabsRoot = React.forwardRef<HTMLDivElement, SconeTabsProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            orientation = "horizontal",
            activationMode = "automatic",
            items,
            ariaLabel,
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const firstEnabledItem = items?.find((item) => !item.disabled)?.value;
        const [currentValue, setCurrentValue] = useControllableState({
            value,
            defaultValue: defaultValue ?? firstEnabledItem,
            onValueChange,
        });
        const context = React.useMemo(
            () => ({
                value: currentValue,
                setValue: (nextValue: string) => setCurrentValue(nextValue),
                orientation,
                activationMode,
                baseId: generatedId,
            }),
            [activationMode, currentValue, generatedId, orientation, setCurrentValue],
        );

        return (
            <SconeTabsContext.Provider value={context}>
                <div
                    ref={ref}
                    data-scone-navigation="tabs"
                    data-orientation={orientation}
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
                </div>
            </SconeTabsContext.Provider>
        );
    },
);
SconeTabsRoot.displayName = "SconeTabsRoot";

export interface SconeTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const SconeTabsList = React.forwardRef<HTMLDivElement, SconeTabsListProps>(
    ({ className, onKeyDown, ...props }, ref) => {
        const { orientation, activationMode, setValue } = useSconeTabsContext("SconeTabs.List");

        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation={orientation}
                data-orientation={orientation}
                className={cn(
                    "inline-flex w-fit items-center gap-1 rounded-md bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col",
                    className,
                )}
                onKeyDown={(event) => {
                    onKeyDown?.(event);
                    if (event.defaultPrevented) {
                        return;
                    }

                    const nextKey =
                        orientation === "horizontal"
                            ? event.key === "ArrowRight"
                            : event.key === "ArrowDown";
                    const previousKey =
                        orientation === "horizontal"
                            ? event.key === "ArrowLeft"
                            : event.key === "ArrowUp";

                    if (!nextKey && !previousKey) {
                        return;
                    }

                    event.preventDefault();
                    const tabs = Array.from(
                        event.currentTarget.querySelectorAll<HTMLButtonElement>(
                            "[role='tab']:not(:disabled)",
                        ),
                    );
                    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
                    const delta = nextKey ? 1 : -1;
                    const nextIndex =
                        currentIndex < 0 ? 0 : (currentIndex + delta + tabs.length) % tabs.length;
                    const nextTab = tabs[nextIndex];
                    nextTab?.focus();
                    if (activationMode === "automatic" && nextTab?.dataset.value) {
                        setValue(nextTab.dataset.value);
                    }
                }}
                {...props}
            />
        );
    },
);
SconeTabsList.displayName = "SconeTabsList";

export interface SconeTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    className?: string;
}

const SconeTabsTrigger = React.forwardRef<HTMLButtonElement, SconeTabsTriggerProps>(
    ({ value, className, children, disabled, onClick, onKeyDown, ...props }, ref) => {
        const context = useSconeTabsContext("SconeTabs.Trigger");
        const selected = context.value === value;
        const triggerId = `${context.baseId}-trigger-${value}`;
        const contentId = `${context.baseId}-content-${value}`;

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                id={triggerId}
                aria-selected={selected}
                aria-controls={contentId}
                disabled={disabled}
                tabIndex={selected ? 0 : -1}
                data-value={value}
                data-active={selected || undefined}
                className={cn(
                    "inline-flex h-9 min-w-0 items-center justify-center rounded-sm px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm",
                    className,
                )}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !disabled) {
                        context.setValue(value);
                    }
                }}
                onKeyDown={(event) => {
                    onKeyDown?.(event);
                    if (event.defaultPrevented || disabled) {
                        return;
                    }
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        context.setValue(value);
                    }
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);
SconeTabsTrigger.displayName = "SconeTabsTrigger";

export interface SconeTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    className?: string;
}

const SconeTabsContent = React.forwardRef<HTMLDivElement, SconeTabsContentProps>(
    ({ value, className, children, ...props }, ref) => {
        const context = useSconeTabsContext("SconeTabs.Content");
        const selected = context.value === value;

        if (!selected) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                id={`${context.baseId}-content-${value}`}
                aria-labelledby={`${context.baseId}-trigger-${value}`}
                className={cn("min-w-0 text-sm outline-none", className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);
SconeTabsContent.displayName = "SconeTabsContent";

export const SconeTabs = Object.assign(SconeTabsRoot, {
    List: SconeTabsList,
    Trigger: SconeTabsTrigger,
    Content: SconeTabsContent,
});
