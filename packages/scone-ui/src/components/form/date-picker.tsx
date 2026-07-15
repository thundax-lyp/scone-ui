import { Calendar, X } from "lucide-react";
import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const defaultFormatLabel = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

const isSameDay = (left: Date | undefined, right: Date): boolean => {
    return (
        left !== undefined &&
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
};

const getMonthDays = (anchorDate: Date): Date[] => {
    const year = anchorDate.getFullYear();
    const month = anchorDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, index) => new Date(year, month, index + 1));
};

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
        const rootRef = React.useRef<HTMLDivElement>(null);
        const contentRef = React.useRef<HTMLDivElement>(null);
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

        const updateOpen = React.useCallback(
            (nextOpen: boolean) => {
                if (!isDisabled) {
                    setCurrentOpen(nextOpen);
                }
            },
            [isDisabled, setCurrentOpen],
        );

        const selectDate = (date: Date | undefined) => {
            setCurrentValue(date);
            updateOpen(false);
        };

        React.useEffect(() => {
            if (!currentOpen) {
                return;
            }

            const handlePointerDown = (event: PointerEvent) => {
                const target = event.target;
                if (!(target instanceof Node)) {
                    return;
                }
                if (rootRef.current?.contains(target) || contentRef.current?.contains(target)) {
                    return;
                }
                updateOpen(false);
            };

            document.addEventListener("pointerdown", handlePointerDown);
            return () => document.removeEventListener("pointerdown", handlePointerDown);
        }, [currentOpen, updateOpen]);

        return (
            <Popover open={currentOpen} onOpenChange={updateOpen}>
                <div ref={rootRef} data-scone-date-picker="" className="relative">
                    <PopoverTrigger asChild>
                        <button
                            ref={ref}
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded={currentOpen}
                            className={cn(
                                "flex w-full min-w-40 items-center justify-between gap-sm rounded-lg border border-input bg-transparent px-2.5 py-1 text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                                currentValue && !isDisabled && "pr-12",
                                triggerSizeClassNames[size],
                                className,
                            )}
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
                            <Calendar aria-hidden="true" className="ml-auto size-4 opacity-50" />
                        </button>
                    </PopoverTrigger>
                    {currentValue && !isDisabled ? (
                        <button
                            type="button"
                            aria-label="Clear date"
                            className="absolute top-1/2 right-7 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            onClick={(event) => {
                                event.stopPropagation();
                                selectDate(undefined);
                            }}
                        >
                            <X aria-hidden="true" className="size-3.5" />
                        </button>
                    ) : null}
                </div>
                <PopoverContent
                    ref={contentRef}
                    align="start"
                    role="dialog"
                    aria-label="Choose date"
                    className="grid w-72 grid-cols-7 gap-1 p-2"
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
                                    "inline-flex h-8 items-center justify-center rounded-md text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
                                    selected && "bg-primary text-primary-foreground",
                                )}
                                onClick={() => selectDate(date)}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </PopoverContent>
            </Popover>
        );
    },
);

SconeDatePicker.displayName = "SconeDatePicker";
