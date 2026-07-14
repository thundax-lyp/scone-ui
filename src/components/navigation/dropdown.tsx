import * as React from "react";

import { cn } from "@/lib/utils";
import { useControllableState } from "@/lib/use-controllable-state";
import type { Key } from "@/types/foundation";

export interface SconeActionItem {
    key: Key;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    destructive?: boolean;
    separatorBefore?: boolean;
    className?: string;
}

export interface SconeDropdownProps {
    trigger: React.ReactNode;
    items?: SconeActionItem[];
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSelect?: (item: SconeActionItem) => void;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    modal?: boolean;
    ariaLabel?: string;
    className?: string;
}

interface SconeDropdownContextValue {
    close: () => void;
}

const SconeDropdownContext = React.createContext<SconeDropdownContextValue | null>(null);

function useDropdownContext(): SconeDropdownContextValue {
    return React.useContext(SconeDropdownContext) ?? { close: () => undefined };
}

export function SconeDropdown({
    trigger,
    items,
    children,
    open,
    defaultOpen,
    onOpenChange,
    onSelect,
    align = "start",
    side = "bottom",
    ariaLabel,
    className,
}: SconeDropdownProps) {
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const [currentOpen, setOpen] = useControllableState({
        value: open,
        defaultValue: defaultOpen ?? false,
        onValueChange: onOpenChange,
    });
    const isOpen = Boolean(currentOpen);
    const triggerElement = React.isValidElement<React.ButtonHTMLAttributes<HTMLButtonElement>>(
        trigger,
    )
        ? React.cloneElement(trigger, {
              ref: triggerRef,
              "aria-haspopup": "menu",
              "aria-expanded": isOpen,
              "aria-label": ariaLabel ?? trigger.props["aria-label"],
              onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                  trigger.props.onClick?.(event);
                  if (!event.defaultPrevented) {
                      setOpen(!isOpen);
                  }
              },
              onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
                  trigger.props.onKeyDown?.(event);
                  if (event.defaultPrevented) {
                      return;
                  }
                  if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setOpen(!isOpen);
                  }
                  if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setOpen(true);
                  }
              },
          })
        : trigger;

    const close = React.useCallback(() => {
        triggerRef.current?.focus();
        setOpen(false);
    }, [setOpen]);

    return (
        <SconeDropdownContext.Provider value={{ close }}>
            <div className="relative inline-flex">
                {triggerElement}
                {isOpen ? (
                    <div
                        role="menu"
                        data-scone-navigation="dropdown"
                        data-align={align}
                        data-side={side}
                        className={cn(
                            "absolute z-50 mt-1 min-w-40 rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-border",
                            side === "top" && "bottom-full mb-1 mt-0",
                            align === "end" && "right-0",
                            align === "center" && "left-1/2 -translate-x-1/2",
                            className,
                        )}
                        onKeyDown={(event) => {
                            const items = Array.from(
                                event.currentTarget.querySelectorAll<HTMLElement>(
                                    "[role='menuitem']:not([aria-disabled='true'])",
                                ),
                            );
                            const currentIndex = items.findIndex(
                                (item) => item === document.activeElement,
                            );
                            if (event.key === "Escape") {
                                event.preventDefault();
                                close();
                            }
                            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                                event.preventDefault();
                                const delta = event.key === "ArrowDown" ? 1 : -1;
                                const nextIndex =
                                    currentIndex < 0
                                        ? 0
                                        : (currentIndex + delta + items.length) % items.length;
                                items[nextIndex]?.focus();
                            }
                        }}
                    >
                        {items
                            ? items.map((item) => (
                                  <React.Fragment key={String(item.key)}>
                                      {item.separatorBefore ? <SconeDropdownSeparator /> : null}
                                      <SconeDropdownItem
                                          disabled={item.disabled}
                                          destructive={item.destructive}
                                          className={item.className}
                                          onSelect={() => onSelect?.(item)}
                                      >
                                          {item.icon}
                                          <span>{item.label}</span>
                                      </SconeDropdownItem>
                                  </React.Fragment>
                              ))
                            : children}
                    </div>
                ) : null}
            </div>
        </SconeDropdownContext.Provider>
    );
}

export interface SconeDropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    destructive?: boolean;
    onSelect?: () => void;
    className?: string;
}

export const SconeDropdownItem = React.forwardRef<HTMLDivElement, SconeDropdownItemProps>(
    (
        { disabled, destructive, onSelect, className, children, onClick, onKeyDown, ...props },
        ref,
    ) => {
        const { close } = useDropdownContext();

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={disabled ? undefined : -1}
                aria-disabled={disabled || undefined}
                data-disabled={disabled || undefined}
                data-destructive={destructive || undefined}
                className={cn(
                    "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[destructive=true]:text-destructive data-[destructive=true]:focus:bg-destructive/10 data-[destructive=true]:focus:text-destructive",
                    className,
                )}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !disabled) {
                        onSelect?.();
                        close();
                    }
                }}
                onKeyDown={(event) => {
                    onKeyDown?.(event);
                    if (!event.defaultPrevented && !disabled && event.key === "Enter") {
                        event.preventDefault();
                        onSelect?.();
                        close();
                    }
                }}
                {...props}
            >
                {children}
            </div>
        );
    },
);
SconeDropdownItem.displayName = "SconeDropdownItem";

export function SconeDropdownSeparator() {
    return <div role="separator" className="-mx-1 my-1 h-px bg-border" />;
}

export function SconeDropdownLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("px-2 py-1 text-xs text-muted-foreground", className)} {...props} />;
}
