import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { SconeControlSize } from "@/types/foundation";

import { useSconeTextControl } from "./text-control";

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
        const { currentValue, controlProps, handleChange } = useSconeTextControl({
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            controlProps: props,
        });

        return (
            <Input
                ref={ref}
                value={currentValue}
                className={cn(inputSizeClassNames[size], className)}
                onChange={handleChange}
                {...controlProps}
            />
        );
    },
);

SconeInput.displayName = "SconeInput";
