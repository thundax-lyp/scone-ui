import * as React from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeTextAreaProps extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "defaultValue" | "onChange"
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    ariaLabel?: string;
    invalid?: boolean;
    size?: SconeControlSize;
    autoSize?: boolean;
    showCount?: boolean;
}

const textAreaSizeClassNames: Record<SconeControlSize, string> = {
    sm: "min-h-14 px-2 py-1.5 text-sm",
    md: "",
    lg: "min-h-20 px-3 py-2.5 text-base",
};

export const SconeTextArea = React.forwardRef<HTMLTextAreaElement, SconeTextAreaProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            size = "md",
            autoSize = false,
            showCount = false,
            maxLength,
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
        const count = currentValue?.length ?? 0;

        return (
            <div data-scone-textarea="" className="space-y-1">
                <Textarea
                    ref={ref}
                    value={currentValue}
                    maxLength={maxLength}
                    data-autosize={autoSize || undefined}
                    className={cn(
                        textAreaSizeClassNames[size],
                        autoSize && "field-sizing-content",
                        className,
                    )}
                    onChange={(event) => {
                        setCurrentValue(event.currentTarget.value);
                        onChange?.(event);
                    }}
                    {...controlProps}
                />
                {showCount ? (
                    <div aria-live="polite" className="text-right text-xs text-muted-foreground">
                        {maxLength !== undefined ? `${count}/${maxLength}` : count}
                    </div>
                ) : null}
            </div>
        );
    },
);

SconeTextArea.displayName = "SconeTextArea";
