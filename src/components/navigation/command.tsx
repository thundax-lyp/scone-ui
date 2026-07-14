import * as React from "react";

import { cn } from "@/lib/utils";
import { useControllableState } from "@/lib/use-controllable-state";

export interface SconeCommandItem {
    key: string;
    label: React.ReactNode;
    value?: string;
    description?: React.ReactNode;
    group?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    keywords?: string[];
    className?: string;
}

export interface SconeCommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    items: SconeCommandItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    selectedKey?: string;
    onSelect?: (key: string, item: SconeCommandItem) => void;
    loading?: boolean;
    renderEmpty?: React.ReactNode | (() => React.ReactNode);
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

function itemSearchText(item: SconeCommandItem): string {
    return [item.value, item.key, item.keywords?.join(" ")].filter(Boolean).join(" ").toLowerCase();
}

function renderEmptyState(renderEmpty: SconeCommandProps["renderEmpty"]): React.ReactNode {
    return typeof renderEmpty === "function" ? renderEmpty() : renderEmpty;
}

export const SconeCommand = React.forwardRef<HTMLDivElement, SconeCommandProps>(
    (
        {
            items,
            value,
            defaultValue = "",
            onValueChange,
            selectedKey,
            onSelect,
            loading = false,
            renderEmpty = "No results",
            placeholder = "Search commands",
            ariaLabel = "Command search",
            className,
            ...props
        },
        ref,
    ) => {
        const [searchValue, setSearchValue] = useControllableState({
            value,
            defaultValue,
            onValueChange,
        });
        const [activeKey, setActiveKey] = React.useState<string | undefined>(selectedKey);
        const normalizedQuery = (searchValue ?? "").trim().toLowerCase();
        const filteredItems = normalizedQuery
            ? items.filter((item) => itemSearchText(item).includes(normalizedQuery))
            : items;
        const enabledItems = filteredItems.filter((item) => !item.disabled);
        const groupedItems = filteredItems.reduce<Record<string, SconeCommandItem[]>>(
            (acc, item) => {
                const group = item.group ?? "";
                acc[group] = [...(acc[group] ?? []), item];
                return acc;
            },
            {},
        );

        React.useEffect(() => {
            setActiveKey(selectedKey);
        }, [selectedKey]);

        const moveActive = (delta: 1 | -1) => {
            if (enabledItems.length === 0) {
                return;
            }
            const currentIndex = enabledItems.findIndex((item) => item.key === activeKey);
            const nextIndex =
                currentIndex < 0
                    ? 0
                    : (currentIndex + delta + enabledItems.length) % enabledItems.length;
            setActiveKey(enabledItems[nextIndex]?.key);
        };

        const selectActive = () => {
            const item = enabledItems.find((candidate) => candidate.key === activeKey);
            if (item) {
                onSelect?.(item.key, item);
            }
        };

        return (
            <div
                ref={ref}
                data-scone-navigation="command"
                className={cn(
                    "flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground",
                    className,
                )}
                onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                        event.preventDefault();
                        moveActive(1);
                    }
                    if (event.key === "ArrowUp") {
                        event.preventDefault();
                        moveActive(-1);
                    }
                    if (event.key === "Enter") {
                        event.preventDefault();
                        selectActive();
                    }
                }}
                {...props}
            >
                <input
                    aria-label={ariaLabel}
                    value={searchValue ?? ""}
                    placeholder={placeholder}
                    className="h-10 border-b border-border bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                    onChange={(event) => setSearchValue(event.currentTarget.value)}
                />
                <div
                    role="listbox"
                    aria-busy={loading || undefined}
                    className="max-h-72 overflow-auto p-1"
                >
                    {loading ? (
                        <div role="status" className="px-2 py-3 text-sm text-muted-foreground">
                            Loading
                        </div>
                    ) : null}
                    {!loading && filteredItems.length === 0 ? (
                        <div className="px-2 py-3 text-sm text-muted-foreground">
                            {renderEmptyState(renderEmpty)}
                        </div>
                    ) : null}
                    {!loading
                        ? Object.entries(groupedItems).map(([group, groupItems]) => (
                              <div
                                  key={group || "default"}
                                  role="group"
                                  aria-label={group || undefined}
                              >
                                  {group ? (
                                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                                          {group}
                                      </div>
                                  ) : null}
                                  {groupItems.map((item) => {
                                      const active = item.key === activeKey;

                                      return (
                                          <div
                                              key={item.key}
                                              role="option"
                                              aria-selected={active}
                                              aria-disabled={item.disabled || undefined}
                                              data-active={active || undefined}
                                              className={cn(
                                                  "flex cursor-default items-start gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-active:bg-accent data-active:text-accent-foreground aria-disabled:opacity-50",
                                                  item.className,
                                              )}
                                              onMouseEnter={() => {
                                                  if (!item.disabled) {
                                                      setActiveKey(item.key);
                                                  }
                                              }}
                                              onClick={() => {
                                                  if (!item.disabled) {
                                                      onSelect?.(item.key, item);
                                                  }
                                              }}
                                          >
                                              {item.icon ? (
                                                  <span className="mt-0.5 shrink-0">
                                                      {item.icon}
                                                  </span>
                                              ) : null}
                                              <span className="min-w-0">
                                                  <span className="block truncate">
                                                      {item.label}
                                                  </span>
                                                  {item.description ? (
                                                      <span className="block truncate text-xs text-muted-foreground">
                                                          {item.description}
                                                      </span>
                                                  ) : null}
                                              </span>
                                          </div>
                                      );
                                  })}
                              </div>
                          ))
                        : null}
                </div>
            </div>
        );
    },
);

SconeCommand.displayName = "SconeCommand";
