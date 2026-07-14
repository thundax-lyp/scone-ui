import * as React from "react";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useControllableState } from "@/lib/use-controllable-state";
import type { Key } from "@/types/foundation";

export interface SconeTreeNode {
    key: Key;
    title: React.ReactNode;
    children?: SconeTreeNode[];
    disabled?: boolean;
    disableCheckbox?: boolean;
    className?: string;
}

export interface SconeTreeSelectInfo {
    node: SconeTreeNode;
    selected: boolean;
}

export interface SconeTreeCheckInfo {
    node: SconeTreeNode;
    checked: boolean;
}

export interface SconeTreeExpandInfo {
    node: SconeTreeNode;
    expanded: boolean;
}

export interface SconeTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    treeData: SconeTreeNode[];
    selectedKeys?: Key[];
    defaultSelectedKeys?: Key[];
    checkedKeys?: Key[];
    defaultCheckedKeys?: Key[];
    expandedKeys?: Key[];
    defaultExpandedKeys?: Key[];
    checkable?: boolean;
    selectable?: boolean;
    multiple?: boolean;
    onSelect?: (keys: Key[], info: SconeTreeSelectInfo) => void;
    onCheck?: (keys: Key[], info: SconeTreeCheckInfo) => void;
    onExpand?: (keys: Key[], info: SconeTreeExpandInfo) => void;
    ariaLabel?: string;
    className?: string;
}

interface VisibleTreeNode {
    node: SconeTreeNode;
    key: Key;
    parentKey?: Key;
    level: number;
}

function keyEquals(left: Key, right: Key): boolean {
    return String(left) === String(right);
}

function hasKey(keys: Key[], key: Key): boolean {
    return keys.some((item) => keyEquals(item, key));
}

function withoutKey(keys: Key[], key: Key): Key[] {
    return keys.filter((item) => !keyEquals(item, key));
}

function flattenVisibleNodes(
    nodes: SconeTreeNode[],
    expandedKeys: Key[],
    level = 1,
    parentKey?: Key,
): VisibleTreeNode[] {
    return nodes.flatMap((node) => {
        const current = { node, key: node.key, parentKey, level };
        const children =
            node.children?.length && hasKey(expandedKeys, node.key)
                ? flattenVisibleNodes(node.children, expandedKeys, level + 1, node.key)
                : [];

        return [current, ...children];
    });
}

export const SconeTree = React.forwardRef<HTMLDivElement, SconeTreeProps>(
    (
        {
            treeData,
            selectedKeys,
            defaultSelectedKeys = [],
            checkedKeys,
            defaultCheckedKeys = [],
            expandedKeys,
            defaultExpandedKeys = [],
            checkable = false,
            selectable = true,
            multiple = false,
            onSelect,
            onCheck,
            onExpand,
            ariaLabel = "Tree",
            className,
            ...props
        },
        ref,
    ) => {
        const [currentSelectedKeys, setSelectedKeys] = useControllableState({
            value: selectedKeys,
            defaultValue: defaultSelectedKeys,
        });
        const [currentCheckedKeys, setCheckedKeys] = useControllableState({
            value: checkedKeys,
            defaultValue: defaultCheckedKeys,
        });
        const [currentExpandedKeys, setExpandedKeys] = useControllableState({
            value: expandedKeys,
            defaultValue: defaultExpandedKeys,
        });
        const resolvedSelectedKeys = currentSelectedKeys ?? [];
        const resolvedCheckedKeys = currentCheckedKeys ?? [];
        const resolvedExpandedKeys = currentExpandedKeys ?? [];
        const visibleNodes = flattenVisibleNodes(treeData, resolvedExpandedKeys);
        const [activeKey, setActiveKey] = React.useState<Key | undefined>(visibleNodes[0]?.key);
        const itemRefs = React.useRef(new Map<string, HTMLDivElement>());

        React.useEffect(() => {
            if (!activeKey || !visibleNodes.some((item) => keyEquals(item.key, activeKey))) {
                setActiveKey(visibleNodes[0]?.key);
            }
        }, [activeKey, visibleNodes]);

        const focusKey = (key: Key | undefined) => {
            if (key === undefined) {
                return;
            }
            setActiveKey(key);
            itemRefs.current.get(String(key))?.focus();
        };

        const updateExpanded = (node: SconeTreeNode, expanded: boolean) => {
            if (node.disabled || !node.children?.length) {
                return;
            }
            const nextKeys = expanded
                ? [...resolvedExpandedKeys, node.key]
                : withoutKey(resolvedExpandedKeys, node.key);
            setExpandedKeys(nextKeys);
            onExpand?.(nextKeys, { node, expanded });
        };

        const updateSelected = (node: SconeTreeNode) => {
            if (!selectable || node.disabled) {
                return;
            }
            const selected = hasKey(resolvedSelectedKeys, node.key);
            const nextKeys = multiple
                ? selected
                    ? withoutKey(resolvedSelectedKeys, node.key)
                    : [...resolvedSelectedKeys, node.key]
                : [node.key];
            setSelectedKeys(nextKeys);
            onSelect?.(nextKeys, { node, selected: !selected });
        };

        const updateChecked = (node: SconeTreeNode) => {
            if (!checkable || node.disabled || node.disableCheckbox) {
                return;
            }
            const checked = hasKey(resolvedCheckedKeys, node.key);
            const nextKeys = checked
                ? withoutKey(resolvedCheckedKeys, node.key)
                : [...resolvedCheckedKeys, node.key];
            setCheckedKeys(nextKeys);
            onCheck?.(nextKeys, { node, checked: !checked });
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            const index = visibleNodes.findIndex((item) => keyEquals(item.key, activeKey ?? ""));
            const current = visibleNodes[index];
            if (!current) {
                return;
            }

            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const delta = event.key === "ArrowDown" ? 1 : -1;
                const nextIndex = (index + delta + visibleNodes.length) % visibleNodes.length;
                focusKey(visibleNodes[nextIndex]?.key);
            }

            if (event.key === "Home") {
                event.preventDefault();
                focusKey(visibleNodes[0]?.key);
            }

            if (event.key === "End") {
                event.preventDefault();
                focusKey(visibleNodes[visibleNodes.length - 1]?.key);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                const expanded = hasKey(resolvedExpandedKeys, current.key);
                if (current.node.children?.length && !expanded) {
                    updateExpanded(current.node, true);
                    return;
                }
                if (current.node.children?.length) {
                    focusKey(current.node.children[0]?.key);
                }
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                const expanded = hasKey(resolvedExpandedKeys, current.key);
                if (current.node.children?.length && expanded) {
                    updateExpanded(current.node, false);
                    return;
                }
                focusKey(current.parentKey);
            }

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                updateSelected(current.node);
            }
        };

        return (
            <div
                ref={ref}
                role="tree"
                aria-label={ariaLabel}
                data-scone-navigation="tree"
                className={cn("flex flex-col gap-1 text-sm", className)}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {visibleNodes.map(({ node, key, level }) => {
                    const expanded = hasKey(resolvedExpandedKeys, key);
                    const selected = hasKey(resolvedSelectedKeys, key);
                    const checked = hasKey(resolvedCheckedKeys, key);
                    const active = activeKey !== undefined && keyEquals(activeKey, key);
                    const hasChildren = Boolean(node.children?.length);

                    return (
                        <div
                            key={String(key)}
                            ref={(element) => {
                                if (element) {
                                    itemRefs.current.set(String(key), element);
                                } else {
                                    itemRefs.current.delete(String(key));
                                }
                            }}
                            role="treeitem"
                            aria-level={level}
                            aria-selected={selectable ? selected : undefined}
                            aria-checked={checkable ? checked : undefined}
                            aria-expanded={hasChildren ? expanded : undefined}
                            aria-disabled={node.disabled || undefined}
                            tabIndex={active ? 0 : -1}
                            className={cn(
                                "flex min-h-8 items-center gap-2 rounded-md px-2 text-muted-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
                                selected && "bg-accent text-accent-foreground",
                                node.disabled && "opacity-50",
                                node.className,
                            )}
                            style={{ paddingLeft: `${(level - 1) * 1.25 + 0.5}rem` }}
                            onFocus={() => setActiveKey(key)}
                            onClick={() => updateSelected(node)}
                        >
                            {hasChildren ? (
                                <button
                                    type="button"
                                    aria-label={expanded ? "Collapse node" : "Expand node"}
                                    disabled={node.disabled}
                                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        updateExpanded(node, !expanded);
                                    }}
                                >
                                    <ChevronRightIcon
                                        className={cn(
                                            "size-4 transition-transform",
                                            expanded && "rotate-90",
                                        )}
                                    />
                                </button>
                            ) : (
                                <span className="size-5 shrink-0" />
                            )}
                            {checkable ? (
                                <input
                                    type="checkbox"
                                    aria-label={`Check ${String(node.title)}`}
                                    checked={checked}
                                    disabled={node.disabled || node.disableCheckbox}
                                    className="size-4"
                                    onChange={() => updateChecked(node)}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            ) : null}
                            <span className="min-w-0 truncate">{node.title}</span>
                        </div>
                    );
                })}
            </div>
        );
    },
);

SconeTree.displayName = "SconeTree";
