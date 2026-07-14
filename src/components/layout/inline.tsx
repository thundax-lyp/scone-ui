import * as React from "react";

import { cn } from "../../lib/utils";
import type { SconeSpacingToken } from "../../types/foundation";

const inlineGapClass: Record<SconeSpacingToken, string> = {
    none: "gap-0",
    xs: "gap-xs",
    sm: "gap-sm",
    md: "gap-md",
    lg: "gap-lg",
    xl: "gap-xl",
};

const inlineAlignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
};

export interface SconeInlineProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: SconeSpacingToken;
    align?: "start" | "center" | "end" | "baseline";
    wrap?: boolean;
    split?: React.ReactNode;
}

function renderInlineChildren(children: React.ReactNode, split: React.ReactNode): React.ReactNode {
    const childItems = React.Children.toArray(children);

    if (split == null || childItems.length < 2) {
        return children;
    }

    return childItems.flatMap((child, index) => {
        if (index === childItems.length - 1) {
            return [child];
        }

        return [
            child,
            <span aria-hidden="true" data-scone-inline-split="" key={`scone-inline-split-${index}`}>
                {split}
            </span>,
        ];
    });
}

export const SconeInline = React.forwardRef<HTMLDivElement, SconeInlineProps>(
    (
        { gap = "sm", align = "center", wrap = false, split, children, className, style, ...props },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                {...props}
                data-scone-layout="inline"
                data-gap={gap}
                data-align={align}
                data-wrap={wrap ? "" : undefined}
                className={cn(
                    "flex flex-row",
                    wrap && "flex-wrap",
                    inlineGapClass[gap],
                    inlineAlignClass[align],
                    className,
                )}
                style={style}
            >
                {renderInlineChildren(children, split)}
            </div>
        );
    },
);

SconeInline.displayName = "SconeInline";
