import * as React from "react";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";
import type { Key } from "@/types/foundation";

export interface SconeBreadcrumbItem {
    key: Key;
    label: React.ReactNode;
    href?: string;
    disabled?: boolean;
    asChild?: boolean;
    className?: string;
}

export interface SconeBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    items: SconeBreadcrumbItem[];
    separator?: React.ReactNode;
    maxItems?: number;
    onItemClick?: (item: SconeBreadcrumbItem) => void;
    ariaLabel?: string;
    className?: string;
}

const getVisibleItems = (
    items: SconeBreadcrumbItem[],
    maxItems?: number,
): SconeBreadcrumbItem[] => {
    if (!maxItems || maxItems < 2 || items.length <= maxItems) {
        return items;
    }

    return [items[0], ...items.slice(items.length - (maxItems - 1))];
};

export const SconeBreadcrumb = React.forwardRef<HTMLElement, SconeBreadcrumbProps>(
    (
        { items, separator, maxItems, onItemClick, ariaLabel = "Breadcrumb", className, ...props },
        ref,
    ) => {
        const [expanded, setExpanded] = React.useState(false);
        const visibleItems = expanded ? items : getVisibleItems(items, maxItems);
        const hiddenCount = items.length - visibleItems.length;
        const hasCollapsedItems = hiddenCount > 0;
        const hiddenItems = hasCollapsedItems ? items.slice(1, hiddenCount + 1) : [];
        const resolvedSeparator = separator ?? <ChevronRightIcon className="size-3.5" />;

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                data-scone-navigation="breadcrumb"
                className={cn("text-sm text-muted-foreground", className)}
                {...props}
            >
                <ol className="flex flex-wrap items-center gap-1.5">
                    {visibleItems.map((item, index) => {
                        const isFirst = index === 0;
                        const isCurrent = item.key === items[items.length - 1]?.key;
                        let Comp: typeof Slot.Root | "a" | "button" = "button";

                        if (item.asChild) {
                            Comp = Slot.Root;
                        } else if (item.href) {
                            Comp = "a";
                        }

                        return (
                            <React.Fragment key={String(item.key)}>
                                {!isFirst ? (
                                    <li
                                        aria-hidden="true"
                                        className="inline-flex items-center text-muted-foreground"
                                    >
                                        {resolvedSeparator}
                                    </li>
                                ) : null}
                                {hasCollapsedItems && index === 1 ? (
                                    <>
                                        <li>
                                            <button
                                                type="button"
                                                aria-label={`Show ${hiddenItems.length} hidden breadcrumb items`}
                                                className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                                                onClick={() => setExpanded(true)}
                                            >
                                                <MoreHorizontalIcon className="size-4" />
                                            </button>
                                        </li>
                                        <li
                                            aria-hidden="true"
                                            className="inline-flex items-center text-muted-foreground"
                                        >
                                            {resolvedSeparator}
                                        </li>
                                    </>
                                ) : null}
                                <li className="inline-flex items-center">
                                    {isCurrent ? (
                                        <span
                                            aria-current="page"
                                            className={cn(
                                                "font-medium text-foreground",
                                                item.className,
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Comp
                                            href={item.asChild ? undefined : item.href}
                                            type={item.asChild || item.href ? undefined : "button"}
                                            aria-disabled={item.disabled || undefined}
                                            disabled={
                                                !item.asChild && !item.href
                                                    ? item.disabled
                                                    : undefined
                                            }
                                            className={cn(
                                                "inline-flex items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                                                item.disabled && "pointer-events-none opacity-50",
                                                item.className,
                                            )}
                                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                                if (item.disabled) {
                                                    event.preventDefault();
                                                    return;
                                                }
                                                onItemClick?.(item);
                                            }}
                                        >
                                            {item.label}
                                        </Comp>
                                    )}
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ol>
            </nav>
        );
    },
);

SconeBreadcrumb.displayName = "SconeBreadcrumb";
