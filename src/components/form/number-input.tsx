import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeNumberInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "defaultValue" | "onChange"
> {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number | undefined) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    ariaLabel?: string;
    invalid?: boolean;
    size?: SconeControlSize;
}

const inputSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 pr-8 text-sm",
    md: "pr-9",
    lg: "h-9 pr-10 text-base",
};

function clampNumber(value: number, min?: number | string, max?: number | string): number {
    const numericMin = min === undefined ? undefined : Number(min);
    const numericMax = max === undefined ? undefined : Number(max);
    let nextValue = value;

    if (numericMin !== undefined && Number.isFinite(numericMin)) {
        nextValue = Math.max(nextValue, numericMin);
    }
    if (numericMax !== undefined && Number.isFinite(numericMax)) {
        nextValue = Math.min(nextValue, numericMax);
    }

    return nextValue;
}

export const SconeNumberInput = React.forwardRef<HTMLInputElement, SconeNumberInputProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            size = "md",
            className,
            min,
            max,
            step = 1,
            disabled,
            readOnly,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<number | undefined>({
            value,
            defaultValue,
            onValueChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const isDisabled = controlProps.disabled || controlProps.readOnly;
        const stepValue = Number(step) || 1;

        const commitNumber = (nextValue: number | undefined) => {
            setCurrentValue(nextValue === undefined ? undefined : clampNumber(nextValue, min, max));
        };

        return (
            <div data-scone-number-input="" className="relative">
                <Input
                    ref={ref}
                    type="number"
                    value={currentValue ?? ""}
                    min={min}
                    max={max}
                    step={step}
                    className={cn(inputSizeClassNames[size], className)}
                    onChange={(event) => {
                        const rawValue = event.currentTarget.value;
                        commitNumber(rawValue === "" ? undefined : Number(rawValue));
                        onChange?.(event);
                    }}
                    {...controlProps}
                />
                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col">
                    <button
                        type="button"
                        aria-label="Increment value"
                        disabled={isDisabled}
                        className="inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => commitNumber((currentValue ?? 0) + stepValue)}
                    >
                        <ChevronUp aria-hidden="true" className="size-3" />
                    </button>
                    <button
                        type="button"
                        aria-label="Decrement value"
                        disabled={isDisabled}
                        className="inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => commitNumber((currentValue ?? 0) - stepValue)}
                    >
                        <ChevronDown aria-hidden="true" className="size-3" />
                    </button>
                </div>
            </div>
        );
    },
);

SconeNumberInput.displayName = "SconeNumberInput";
