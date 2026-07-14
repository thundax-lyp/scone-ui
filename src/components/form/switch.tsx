import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeSwitchProps extends Omit<
    React.ComponentPropsWithoutRef<typeof Switch>,
    "size" | "checked" | "defaultChecked" | "onCheckedChange"
> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
}

const switchSizeMap: Record<SconeControlSize, React.ComponentProps<typeof Switch>["size"]> = {
    sm: "sm",
    md: "default",
    lg: "default",
};

export const SconeSwitch = React.forwardRef<React.ElementRef<typeof Switch>, SconeSwitchProps>(
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
