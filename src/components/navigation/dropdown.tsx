/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
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
    modal,
    ariaLabel,
    className,
}: SconeDropdownProps) {
    return (
        <DropdownMenuPrimitive.Root
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            modal={modal}
        >
            <DropdownMenuPrimitive.Trigger asChild aria-label={ariaLabel}>
                {trigger}
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                    align={align}
                    side={side}
                    sideOffset={4}
                    data-scone-navigation="dropdown"
                    className={cn(
                        "z-50 min-w-40 rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-border",
                        className,
                    )}
                >
                    {items
                        ? items.map((item) => (
                              <React.Fragment key={String(item.key)}>
                                  {item.separatorBefore ? (
                                      <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />
                                  ) : null}
                                  <DropdownMenuPrimitive.Item
                                      disabled={item.disabled}
                                      data-destructive={item.destructive || undefined}
                                      className={cn(
                                          "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[destructive=true]:text-destructive data-[destructive=true]:focus:bg-destructive/10 data-[destructive=true]:focus:text-destructive",
                                          item.className,
                                      )}
                                      onSelect={() => onSelect?.(item)}
                                  >
                                      {item.icon}
                                      <span>{item.label}</span>
                                  </DropdownMenuPrimitive.Item>
                              </React.Fragment>
                          ))
                        : children}
                </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
    );
}

export const SconeDropdownItem = DropdownMenuPrimitive.Item;
export const SconeDropdownSeparator = DropdownMenuPrimitive.Separator;
export const SconeDropdownLabel = DropdownMenuPrimitive.Label;
