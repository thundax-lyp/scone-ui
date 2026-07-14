import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useControllableState } from "@/lib/use-controllable-state";

export interface SconeNavigationItem {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: SconeNavigationItem[];
    disabled?: boolean;
    asChild?: boolean;
    className?: string;
}

export interface SconeMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    items: SconeNavigationItem[];
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    openKeys?: string[];
    defaultOpenKeys?: string[];
    onSelect?: (key: string, item: SconeNavigationItem) => void;
    onOpenChange?: (keys: string[]) => void;
    orientation?: "vertical" | "horizontal";
    collapsed?: boolean;
    ariaLabel?: string;
    className?: string;
}

function toggleKey(keys: string[], key: string): string[] {
    return keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key];
}

function getVisibleKeys(items: SconeNavigationItem[], openKeys: string[]): string[] {
    return items.flatMap((item) => [
        item.key,
        ...(item.children && openKeys.includes(item.key)
            ? getVisibleKeys(item.children, openKeys)
            : []),
    ]);
}

export const SconeMenu = React.forwardRef<HTMLDivElement, SconeMenuProps>(
    (
        {
            items,
            selectedKeys,
            defaultSelectedKeys = [],
            openKeys,
            defaultOpenKeys = [],
            onSelect,
            onOpenChange,
            orientation = "vertical",
            collapsed = false,
            ariaLabel = "Menu",
            className,
            ...props
        },
        ref,
    ) => {
        const [currentSelectedKeys, setSelectedKeys] = useControllableState({
            value: selectedKeys,
            defaultValue: defaultSelectedKeys,
        });
        const [currentOpenKeys, setOpenKeys] = useControllableState({
            value: openKeys,
            defaultValue: defaultOpenKeys,
            onValueChange: onOpenChange,
        });
        const resolvedSelectedKeys = currentSelectedKeys ?? [];
        const resolvedOpenKeys = currentOpenKeys ?? [];
        const visibleKeys = getVisibleKeys(items, resolvedOpenKeys);
        const itemRefs = React.useRef(new Map<string, HTMLButtonElement>());

        const focusKey = (key: string | undefined) => {
            if (!key) {
                return;
            }
            itemRefs.current.get(key)?.focus();
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            const activeKey = [...itemRefs.current.entries()].find(
                ([, element]) => element === document.activeElement,
            )?.[0];
            const activeIndex = visibleKeys.indexOf(activeKey ?? "");
            const nextKey =
                orientation === "vertical" ? event.key === "ArrowDown" : event.key === "ArrowRight";
            const previousKey =
                orientation === "vertical" ? event.key === "ArrowUp" : event.key === "ArrowLeft";

            if (nextKey || previousKey) {
                event.preventDefault();
                const delta = nextKey ? 1 : -1;
                const nextIndex =
                    activeIndex < 0
                        ? 0
                        : (activeIndex + delta + visibleKeys.length) % visibleKeys.length;
                focusKey(visibleKeys[nextIndex]);
            }
        };

        const renderItems = (menuItems: SconeNavigationItem[], depth = 0) => (
            <ul
                role={depth === 0 ? "menubar" : "menu"}
                aria-orientation={depth === 0 ? orientation : "vertical"}
                className={cn(
                    depth === 0 &&
                        (orientation === "horizontal"
                            ? "flex flex-row gap-1"
                            : "flex flex-col gap-1"),
                    depth > 0 && "mt-1 ml-4 flex flex-col gap-1",
                )}
            >
                {menuItems.map((item) => {
                    const selected = resolvedSelectedKeys.includes(item.key);
                    const expanded = resolvedOpenKeys.includes(item.key);
                    const hasChildren = Boolean(item.children?.length);

                    return (
                        <li key={item.key} role="none">
                            <button
                                ref={(node) => {
                                    if (node) {
                                        itemRefs.current.set(item.key, node);
                                    } else {
                                        itemRefs.current.delete(item.key);
                                    }
                                }}
                                type="button"
                                role="menuitem"
                                aria-current={selected ? "page" : undefined}
                                aria-expanded={hasChildren ? expanded : undefined}
                                aria-disabled={item.disabled || undefined}
                                disabled={item.disabled}
                                title={collapsed ? String(item.label) : undefined}
                                className={cn(
                                    "flex min-h-9 w-full min-w-0 items-center gap-2 rounded-md px-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                                    selected && "bg-accent text-accent-foreground",
                                    collapsed && "justify-center px-2",
                                    item.className,
                                )}
                                onClick={() => {
                                    if (item.disabled) {
                                        return;
                                    }
                                    if (hasChildren) {
                                        setOpenKeys((previous) =>
                                            toggleKey(previous ?? [], item.key),
                                        );
                                        return;
                                    }
                                    setSelectedKeys([item.key]);
                                    onSelect?.(item.key, item);
                                }}
                            >
                                {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
                                <span className={cn("min-w-0 truncate", collapsed && "sr-only")}>
                                    {item.label}
                                </span>
                                {hasChildren && !collapsed ? (
                                    <ChevronDownIcon
                                        className={cn(
                                            "ml-auto size-4 shrink-0 transition-transform",
                                            expanded && "rotate-180",
                                        )}
                                    />
                                ) : null}
                            </button>
                            {hasChildren && expanded && !collapsed
                                ? renderItems(item.children ?? [], depth + 1)
                                : null}
                        </li>
                    );
                })}
            </ul>
        );

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                data-scone-navigation="menu"
                data-orientation={orientation}
                data-collapsed={collapsed || undefined}
                className={cn("min-w-0", className)}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {renderItems(items)}
            </nav>
        );
    },
);

SconeMenu.displayName = "SconeMenu";
