import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeOrientation } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeSliderProps extends Omit<
    React.ComponentPropsWithoutRef<typeof Slider>,
    "value" | "defaultValue" | "onValueChange" | "orientation"
> {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    orientation?: SconeOrientation;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
}

export const SconeSlider = React.forwardRef<React.ElementRef<typeof Slider>, SconeSliderProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            orientation = "horizontal",
            ariaLabel,
            invalid,
            readOnly,
            disabled,
            className,
            min = 0,
            max = 100,
            step = 1,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<number[]>({
            value,
            defaultValue: defaultValue ?? [min],
            onValueChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...sliderControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;

        return (
            <Slider
                ref={ref}
                value={currentValue}
                min={min}
                max={max}
                step={step}
                orientation={orientation}
                disabled={isDisabled}
                className={cn("min-w-32", className)}
                onValueChange={(nextValue) => {
                    if (!isDisabled) {
                        setCurrentValue(nextValue);
                    }
                }}
                {...sliderControlProps}
            />
        );
    },
);

SconeSlider.displayName = "SconeSlider";
