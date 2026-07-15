import * as React from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import type { SconeControlSize } from "@/types/foundation";

import { useSconeTextControl } from "./text-control";

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
        const { currentValue, controlProps, handleChange } = useSconeTextControl({
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            controlProps: props,
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
                    onChange={handleChange}
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
