import * as React from "react";

import { cn } from "@/lib/cn";

export type SconeTypographySize = "sm" | "md" | "lg";
export type SconeTypographyWeight = "regular" | "medium" | "semibold";
export type SconeTypographyTone = "default" | "muted" | "danger" | "success" | "warning";
export type SconeTypographyElement = keyof React.JSX.IntrinsicElements;

export interface SconeTypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: SconeTypographyElement;
    size?: SconeTypographySize;
    weight?: SconeTypographyWeight;
    tone?: SconeTypographyTone;
    truncate?: boolean | number;
    children?: React.ReactNode;
    className?: string;
}

export type SconeTextProps = SconeTypographyProps;
export type SconeTitleProps = SconeTypographyProps;
export type SconeParagraphProps = SconeTypographyProps;

const sizeClassNames: Record<SconeTypographySize, string> = {
    sm: "text-xs leading-5",
    md: "text-sm leading-6",
    lg: "text-base leading-7",
};

const weightClassNames: Record<SconeTypographyWeight, string> = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
};

const toneClassNames: Record<SconeTypographyTone, string> = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    danger: "text-destructive",
    success: "text-[var(--scone-color-success)]",
    warning: "text-[var(--scone-color-warning)]",
};

const getTruncateClassName = (truncate: boolean | number | undefined): string | undefined => {
    if (truncate === true) {
        return "truncate";
    }

    if (typeof truncate === "number" && truncate > 0) {
        return "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical]";
    }

    return undefined;
};

const getTruncateStyle = (
    truncate: boolean | number | undefined,
    style: React.CSSProperties | undefined,
): React.CSSProperties | undefined => {
    if (typeof truncate !== "number" || truncate <= 0) {
        return style;
    }

    return {
        ...style,
        WebkitLineClamp: truncate,
    };
};

export const SconeTypography = React.forwardRef<HTMLElement, SconeTypographyProps>(
    (
        {
            as: Component = "span",
            size = "md",
            weight = "regular",
            tone = "default",
            truncate,
            className,
            style,
            ...props
        },
        ref,
    ) => {
        return React.createElement(Component, {
            ...props,
            ref,
            style: getTruncateStyle(truncate, style),
            className: cn(
                "min-w-0 tracking-normal",
                sizeClassNames[size],
                weightClassNames[weight],
                toneClassNames[tone],
                getTruncateClassName(truncate),
                className,
            ),
        });
    },
);
SconeTypography.displayName = "SconeTypography";

export const SconeText = React.forwardRef<HTMLElement, SconeTextProps>((props, ref) => (
    <SconeTypography {...props} ref={ref} as={props.as ?? "span"} />
));
SconeText.displayName = "SconeText";

export const SconeTitle = React.forwardRef<HTMLElement, SconeTitleProps>(
    ({ weight = "semibold", size = "lg", ...props }, ref) => (
        <SconeTypography {...props} ref={ref} as={props.as ?? "h3"} size={size} weight={weight} />
    ),
);
SconeTitle.displayName = "SconeTitle";

export const SconeParagraph = React.forwardRef<HTMLElement, SconeParagraphProps>((props, ref) => (
    <SconeTypography {...props} ref={ref} as={props.as ?? "p"} />
));
SconeParagraph.displayName = "SconeParagraph";
