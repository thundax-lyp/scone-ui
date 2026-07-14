import * as React from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize, SconeOption } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeSelectProps<Value extends string = string> extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectTrigger>,
    "value" | "defaultValue"
> {
    options: Array<SconeOption<Value>>;
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
    contentClassName?: string;
}

const selectSizeMap: Record<SconeControlSize, React.ComponentProps<typeof SelectTrigger>["size"]> =
    {
        sm: "sm",
        md: "default",
        lg: "default",
    };

const selectSizeClassNames: Record<SconeControlSize, string> = {
    sm: "min-w-36",
    md: "min-w-40",
    lg: "h-9 min-w-44 text-base",
};

export const SconeSelect = React.forwardRef<HTMLButtonElement, SconeSelectProps>(
    (
        {
            options,
            value,
            defaultValue,
            onValueChange,
            open,
            defaultOpen,
            onOpenChange,
            placeholder,
            ariaLabel,
            invalid,
            readOnly,
            disabled,
            size = "md",
            className,
            contentClassName,
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
            "aria-invalid": invalid ?? props["aria-invalid"],
        });
        const isDisabled = controlProps.disabled || controlProps.readOnly;

        return (
            <Select
                value={currentValue}
                open={currentOpen}
                onOpenChange={(nextOpen) => {
                    if (!isDisabled) {
                        setCurrentOpen(nextOpen);
                    }
                }}
                onValueChange={(nextValue) => setCurrentValue(nextValue)}
                disabled={isDisabled}
            >
                <SelectTrigger
                    ref={ref}
                    size={selectSizeMap[size]}
                    className={cn(selectSizeClassNames[size], className)}
                    {...controlProps}
                    disabled={isDisabled}
                    readOnly={undefined}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={contentClassName}>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    },
);

SconeSelect.displayName = "SconeSelect";
