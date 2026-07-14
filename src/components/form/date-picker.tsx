import { Calendar, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeDatePickerProps extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "defaultValue"
> {
    value?: Date;
    defaultValue?: Date;
    onValueChange?: (value: Date | undefined) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabledDate?: (date: Date) => boolean;
    placeholder?: string;
    formatLabel?: (date: Date) => string;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
}

const triggerSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 text-sm",
    md: "h-8 text-sm",
    lg: "h-9 text-base",
};

function defaultFormatLabel(date: Date): string {
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

function isSameDay(left: Date | undefined, right: Date): boolean {
    return (
        left !== undefined &&
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
}

function getMonthDays(anchorDate: Date): Date[] {
    const year = anchorDate.getFullYear();
    const month = anchorDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, index) => new Date(year, month, index + 1));
}

export const SconeDatePicker = React.forwardRef<HTMLButtonElement, SconeDatePickerProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            open,
            defaultOpen,
            onOpenChange,
            disabledDate,
            placeholder = "Select date",
            formatLabel = defaultFormatLabel,
            ariaLabel,
            invalid,
            readOnly,
            disabled,
            size = "md",
            className,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<Date | undefined>({
            value,
            defaultValue,
            onValueChange,
        });
        const [currentOpen, setCurrentOpen] = useControllableState<boolean>({
            value: open,
            defaultValue: defaultOpen ?? false,
            onValueChange: onOpenChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...datePickerControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;
        const monthDays = getMonthDays(currentValue ?? new Date());

        const updateOpen = (nextOpen: boolean) => {
            if (!isDisabled) {
                setCurrentOpen(nextOpen);
            }
        };

        const selectDate = (date: Date | undefined) => {
            setCurrentValue(date);
            updateOpen(false);
        };

        return (
            <div data-scone-date-picker="" className="relative">
                <button
                    ref={ref}
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={currentOpen}
                    className={cn(
                        "flex w-full min-w-40 items-center justify-between gap-sm rounded-lg border border-input bg-transparent px-2.5 py-1 text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                        triggerSizeClassNames[size],
                        className,
                    )}
                    onClick={() => updateOpen(!currentOpen)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            updateOpen(true);
                        }
                    }}
                    {...datePickerControlProps}
                    disabled={isDisabled}
                >
                    <span className={cn(!currentValue && "text-muted-foreground")}>
                        {currentValue ? formatLabel(currentValue) : placeholder}
                    </span>
                    <span className="ml-auto flex items-center gap-xs">
                        {currentValue && !isDisabled ? (
                            <span
                                role="button"
                                tabIndex={-1}
                                aria-label="Clear date"
                                className="inline-flex size-4 items-center justify-center"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectDate(undefined);
                                }}
                            >
                                <X aria-hidden="true" className="size-3.5" />
                            </span>
                        ) : null}
                        <Calendar aria-hidden="true" className="size-4 opacity-50" />
                    </span>
                </button>
                {currentOpen ? (
                    <div
                        role="dialog"
                        aria-label="Choose date"
                        className="absolute z-50 mt-1 grid w-72 grid-cols-7 gap-1 rounded-lg bg-popover p-2 text-popover-foreground shadow-md ring-1 ring-foreground/10"
                    >
                        {monthDays.map((date) => {
                            const blocked = disabledDate?.(date) ?? false;
                            const selected = isSameDay(currentValue, date);

                            return (
                                <button
                                    key={date.toISOString()}
                                    type="button"
                                    aria-label={formatLabel(date)}
                                    aria-pressed={selected}
                                    disabled={blocked}
                                    className={cn(
                                        "inline-flex h-8 items-center justify-center rounded-md text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
                                        selected && "bg-primary text-primary-foreground",
                                    )}
                                    onClick={() => selectDate(date)}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    },
);

SconeDatePicker.displayName = "SconeDatePicker";
