import * as React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeOption, SconeOrientation } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeRadioGroupProps<Value extends string = string> extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
> {
    options: Array<SconeOption<Value>>;
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value) => void;
    orientation?: SconeOrientation;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    name?: string;
    required?: boolean;
}

export const SconeRadioGroup = React.forwardRef<HTMLDivElement, SconeRadioGroupProps>(
    (
        {
            options,
            value,
            defaultValue,
            onValueChange,
            orientation = "vertical",
            ariaLabel,
            invalid,
            readOnly,
            disabled,
            className,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<string>({
            value,
            defaultValue,
            onValueChange: onValueChange as ((value: string) => void) | undefined,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...radioGroupControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;

        return (
            <RadioGroup
                ref={ref}
                value={currentValue}
                orientation={orientation}
                disabled={isDisabled}
                className={cn(orientation === "horizontal" && "flex flex-wrap gap-md", className)}
                onValueChange={(nextValue) => {
                    if (!isDisabled) {
                        setCurrentValue(nextValue);
                    }
                }}
                {...radioGroupControlProps}
            >
                {options.map((option) => {
                    const itemId = `${controlProps.id ?? "scone-radio"}-${option.value}`;

                    return (
                        <div key={option.value} className="flex items-center gap-sm">
                            <RadioGroupItem
                                id={itemId}
                                value={option.value}
                                disabled={isDisabled || option.disabled}
                                aria-invalid={controlProps["aria-invalid"]}
                            />
                            <label
                                htmlFor={itemId}
                                className={cn(
                                    "text-sm text-foreground",
                                    (isDisabled || option.disabled) &&
                                        "cursor-not-allowed opacity-50",
                                )}
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </RadioGroup>
        );
    },
);

SconeRadioGroup.displayName = "SconeRadioGroup";
