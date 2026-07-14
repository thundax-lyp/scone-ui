import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeCheckboxProps extends Omit<
    React.ComponentPropsWithoutRef<typeof Checkbox>,
    "checked" | "defaultChecked" | "onCheckedChange"
> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    indeterminate?: boolean;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
}

const checkboxSizeClassNames: Record<SconeControlSize, string> = {
    sm: "size-3.5",
    md: "",
    lg: "size-5",
};

export const SconeCheckbox = React.forwardRef<
    React.ElementRef<typeof Checkbox>,
    SconeCheckboxProps
>(
    (
        {
            checked,
            defaultChecked,
            onCheckedChange,
            indeterminate = false,
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
        const [currentChecked, setCurrentChecked] = useControllableState<boolean>({
            value: checked,
            defaultValue: defaultChecked,
            onValueChange: onCheckedChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...checkboxControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;
        const renderedChecked =
            indeterminate && currentChecked === undefined ? "indeterminate" : currentChecked;

        return (
            <Checkbox
                ref={ref}
                checked={renderedChecked}
                disabled={isDisabled}
                className={cn(checkboxSizeClassNames[size], className)}
                onCheckedChange={(nextChecked) => {
                    if (!isDisabled && typeof nextChecked === "boolean") {
                        setCurrentChecked(nextChecked);
                    }
                }}
                {...checkboxControlProps}
            />
        );
    },
);

SconeCheckbox.displayName = "SconeCheckbox";
