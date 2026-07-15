import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

type SconeSwitchPrimitiveSize = "sm" | "default";

export interface SconeSwitchProps extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "checked" | "defaultChecked" | "onChange" | "size"
> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
}

const switchSizeMap: Record<SconeControlSize, SconeSwitchPrimitiveSize> = {
    sm: "sm",
    md: "default",
    lg: "default",
};

export const SconeSwitch = React.forwardRef<HTMLButtonElement, SconeSwitchProps>(
    (
        {
            checked,
            defaultChecked,
            onCheckedChange,
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
        const { readOnly: controlReadOnly, ...switchControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;

        return (
            <Switch
                ref={ref}
                size={switchSizeMap[size]}
                checked={currentChecked}
                disabled={isDisabled}
                className={cn(size === "lg" && "scale-110", className)}
                onCheckedChange={(nextChecked) => {
                    if (!isDisabled) {
                        setCurrentChecked(nextChecked);
                    }
                }}
                {...switchControlProps}
            />
        );
    },
);

SconeSwitch.displayName = "SconeSwitch";
