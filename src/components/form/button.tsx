import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { SconeControlSize } from "@/types/foundation";

export interface SconeButtonProps extends Omit<
    React.ComponentPropsWithoutRef<typeof Button>,
    "size" | "aria-label"
> {
    size?: SconeControlSize;
    loading?: boolean;
    ariaLabel?: string;
}

const buttonSizeMap: Record<
    SconeControlSize,
    React.ComponentPropsWithoutRef<typeof Button>["size"]
> = {
    sm: "sm",
    md: "default",
    lg: "lg",
};

export const SconeButton = React.forwardRef<React.ElementRef<typeof Button>, SconeButtonProps>(
    (
        {
            size = "md",
            loading = false,
            disabled = false,
            ariaLabel,
            onClick,
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
                if (isDisabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }

                onClick?.(event);
            },
            [isDisabled, onClick],
        );

        return (
            <Button
                ref={ref}
                size={buttonSizeMap[size]}
                disabled={isDisabled}
                aria-disabled={isDisabled || undefined}
                aria-busy={loading || undefined}
                aria-label={ariaLabel}
                data-loading={loading || undefined}
                className={cn(loading && "cursor-wait", className)}
                onClick={handleClick}
                {...props}
            >
                {loading ? (
                    <span
                        aria-hidden="true"
                        className="size-3 animate-spin rounded-full border border-current border-t-transparent"
                    />
                ) : null}
                {children}
            </Button>
        );
    },
);

SconeButton.displayName = "SconeButton";
