import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconePasswordInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "defaultValue" | "onChange"
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    ariaLabel?: string;
    invalid?: boolean;
    size?: SconeControlSize;
    visibilityLabel?: string;
    hideVisibilityLabel?: string;
}

const inputSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 pr-8 text-sm",
    md: "pr-9",
    lg: "h-9 pr-10 text-base",
};

export const SconePasswordInput = React.forwardRef<HTMLInputElement, SconePasswordInputProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            size = "md",
            visibilityLabel = "Show password",
            hideVisibilityLabel = "Hide password",
            className,
            disabled,
            readOnly,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [visible, setVisible] = React.useState(false);
        const [currentValue, setCurrentValue] = useControllableState<string>({
            value,
            defaultValue,
            onValueChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": invalid ?? props["aria-invalid"],
        });
        const canToggle = !controlProps.disabled && !controlProps.readOnly;

        return (
            <div data-scone-password-input="" className="relative">
                <Input
                    ref={ref}
                    type={visible ? "text" : "password"}
                    value={currentValue}
                    className={cn(inputSizeClassNames[size], className)}
                    onChange={(event) => {
                        setCurrentValue(event.currentTarget.value);
                        onChange?.(event);
                    }}
                    {...controlProps}
                />
                <button
                    type="button"
                    aria-label={visible ? hideVisibilityLabel : visibilityLabel}
                    aria-pressed={visible}
                    disabled={!canToggle}
                    className="absolute right-1.5 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setVisible((current) => !current)}
                >
                    {visible ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                        <Eye aria-hidden="true" className="size-4" />
                    )}
                </button>
            </div>
        );
    },
);

SconePasswordInput.displayName = "SconePasswordInput";
