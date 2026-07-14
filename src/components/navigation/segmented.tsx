import * as React from "react";

import { cn } from "@/lib/cn";
import { composeRefs } from "@/lib/compose-refs";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeOption } from "@/types/foundation";

export interface SconeSegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
    options: SconeOption<string>[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    size?: "sm" | "md";
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
}

const sizeClassNames = {
    sm: "h-8 px-2 text-xs",
    md: "h-9 px-3 text-sm",
};

export const SconeSegmented = React.forwardRef<HTMLDivElement, SconeSegmentedProps>(
    (
        {
            options,
            value,
            defaultValue,
            onValueChange,
            size = "md",
            disabled = false,
            ariaLabel = "Segmented control",
            className,
            ...props
        },
        ref,
    ) => {
        const rootRef = React.useRef<HTMLDivElement | null>(null);
        const [currentValue, setCurrentValue] = useControllableState({
            value,
            defaultValue: defaultValue ?? options.find((option) => !option.disabled)?.value,
            onValueChange,
        });

        const enabledOptions = options.filter((option) => !option.disabled);
        const moveSelection = (direction: 1 | -1): string | undefined => {
            if (disabled || enabledOptions.length === 0) {
                return undefined;
            }

            const currentIndex = enabledOptions.findIndex(
                (option) => option.value === currentValue,
            );
            const nextIndex =
                currentIndex < 0
                    ? 0
                    : (currentIndex + direction + enabledOptions.length) % enabledOptions.length;
            const nextValue = enabledOptions[nextIndex]?.value;

            if (nextValue) {
                setCurrentValue(nextValue);
            }

            return nextValue;
        };

        const focusOption = (optionValue: string | undefined) => {
            if (!optionValue) {
                return;
            }

            const optionButton = Array.from(
                rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-value]") ?? [],
            ).find((button) => button.dataset.value === optionValue);

            optionButton?.focus();
        };

        return (
            <div
                ref={composeRefs(rootRef, ref)}
                role="radiogroup"
                aria-label={ariaLabel}
                aria-disabled={disabled || undefined}
                data-scone-navigation="segmented"
                className={cn(
                    "inline-flex w-fit rounded-md border border-border bg-muted p-0.5",
                    disabled && "opacity-60",
                    className,
                )}
                onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                        event.preventDefault();
                        focusOption(moveSelection(1));
                    }
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                        event.preventDefault();
                        focusOption(moveSelection(-1));
                    }
                }}
                {...props}
            >
                {options.map((option) => {
                    const selected = option.value === currentValue;
                    const optionDisabled = disabled || option.disabled;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            disabled={optionDisabled}
                            tabIndex={selected ? 0 : -1}
                            data-value={option.value}
                            className={cn(
                                "inline-flex min-w-0 items-center justify-center rounded-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                                sizeClassNames[size],
                                selected
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                                optionDisabled && "pointer-events-none opacity-50",
                            )}
                            onClick={() => {
                                if (!optionDisabled) {
                                    setCurrentValue(option.value);
                                }
                            }}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        );
    },
);

SconeSegmented.displayName = "SconeSegmented";
