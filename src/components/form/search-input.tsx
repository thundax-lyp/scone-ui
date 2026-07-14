import { Loader2, Search, X } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeSearchInputProps extends Omit<
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
    loading?: boolean;
    clearable?: boolean;
    clearLabel?: string;
}

const inputSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 pl-7 pr-7 text-sm",
    md: "pl-8 pr-8",
    lg: "h-9 pl-9 pr-9 text-base",
};

export const SconeSearchInput = React.forwardRef<HTMLInputElement, SconeSearchInputProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            onChange,
            ariaLabel,
            invalid,
            size = "md",
            loading = false,
            clearable = true,
            clearLabel = "Clear search",
            className,
            disabled,
            readOnly,
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
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": invalid ?? props["aria-invalid"],
        });
        const hasValue = Boolean(currentValue);
        const canClear = clearable && hasValue && !controlProps.disabled && !controlProps.readOnly;

        return (
            <div data-scone-search-input="" className="relative">
                <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                    ref={ref}
                    type="search"
                    value={currentValue}
                    className={cn(inputSizeClassNames[size], className)}
                    onChange={(event) => {
                        setCurrentValue(event.currentTarget.value);
                        onChange?.(event);
                    }}
                    {...controlProps}
                />
                {loading ? (
                    <Loader2
                        aria-label="Search loading"
                        className="absolute right-2.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
                    />
                ) : canClear ? (
                    <button
                        type="button"
                        aria-label={clearLabel}
                        className="absolute right-1.5 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => setCurrentValue("")}
                    >
                        <X aria-hidden="true" className="size-3.5" />
                    </button>
                ) : null}
            </div>
        );
    },
);

SconeSearchInput.displayName = "SconeSearchInput";
