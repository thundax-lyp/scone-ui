import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "defaultValue" | "onChange"
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    ariaLabel?: string;
    invalid?: boolean;
    size?: SconeControlSize;
}

const inputSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 px-2 text-sm",
    md: "",
    lg: "h-9 px-3 text-base",
};

export const SconeInput = React.forwardRef<HTMLInputElement, SconeInputProps>(
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
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<string>({
            value,
            defaultValue,
            onValueChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": invalid ?? props["aria-invalid"],
        });

        return (
            <Input
                ref={ref}
                value={currentValue}
                className={cn(inputSizeClassNames[size], className)}
                onChange={(event) => {
                    setCurrentValue(event.currentTarget.value);
                    onChange?.(event);
                }}
                {...controlProps}
            />
        );
    },
);

SconeInput.displayName = "SconeInput";
