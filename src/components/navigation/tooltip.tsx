import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

export interface SconeTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: "top" | "right" | "bottom" | "left";
    delay?: number;
    className?: string;
}

export function SconeTooltip({
    content,
    children,
    open,
    defaultOpen,
    onOpenChange,
    side = "top",
    delay = 0,
    className,
}: SconeTooltipProps) {
    const tooltipId = React.useId();
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [currentOpen, setOpen] = useControllableState({
        value: open,
        defaultValue: defaultOpen ?? false,
        onValueChange: onOpenChange,
    });
    const isOpen = Boolean(currentOpen);

    React.useEffect(
        () => () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        },
        [],
    );

    const openTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => setOpen(true), delay);
            return;
        }
        setOpen(true);
    };

    const closeTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpen(false);
    };

    React.useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeTooltip();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    });

    const trigger = React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)
        ? React.cloneElement(children, {
              "aria-describedby": isOpen ? tooltipId : children.props["aria-describedby"],
              onFocus: (event: React.FocusEvent<HTMLElement>) => {
                  children.props.onFocus?.(event);
                  openTooltip();
              },
              onBlur: (event: React.FocusEvent<HTMLElement>) => {
                  children.props.onBlur?.(event);
                  closeTooltip();
              },
              onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
                  children.props.onMouseEnter?.(event);
                  openTooltip();
              },
              onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
                  children.props.onMouseLeave?.(event);
                  closeTooltip();
              },
              onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
                  children.props.onPointerMove?.(event);
                  openTooltip();
              },
              onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
                  children.props.onPointerLeave?.(event);
                  closeTooltip();
              },
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
                  children.props.onKeyDown?.(event);
                  if (!event.defaultPrevented && event.key === "Escape") {
                      closeTooltip();
                  }
              },
          })
        : children;

    return (
        <span className="relative inline-flex">
            {trigger}
            {isOpen ? (
                <span
                    id={tooltipId}
                    role="tooltip"
                    data-scone-navigation="tooltip"
                    data-side={side}
                    className={cn(
                        "absolute z-50 w-max max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
                        side === "top" && "bottom-full left-1/2 mb-1 -translate-x-1/2",
                        side === "bottom" && "top-full left-1/2 mt-1 -translate-x-1/2",
                        side === "left" && "top-1/2 right-full mr-1 -translate-y-1/2",
                        side === "right" && "top-1/2 left-full ml-1 -translate-y-1/2",
                        className,
                    )}
                >
                    {content}
                </span>
            ) : null}
        </span>
    );
}
