import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeDensity } from "@/types/foundation";

export interface SectionRootProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    density?: SconeDensity;
}

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface SectionFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const sectionDensityClassNames = {
    compact: "gap-xs",
    default: "gap-sm",
    comfortable: "gap-md",
};

function SectionRoot({ density = "default", className, children, ...props }: SectionRootProps) {
    return (
        <section
            data-scone-pattern="section"
            data-density={density}
            className={cn("flex min-w-0 flex-col", sectionDensityClassNames[density], className)}
            {...props}
        >
            {children}
        </section>
    );
}

function SectionHeader({
    title,
    description,
    actions,
    className,
    children,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            data-scone-section-part="header"
            className={cn("flex min-w-0 flex-wrap items-start justify-between gap-sm", className)}
            {...props}
        >
            <div data-scone-section-header-content="" className="min-w-0 flex-1">
                {title ? <h2 className="text-lg font-semibold text-foreground">{title}</h2> : null}
                {description ? (
                    <p className="mt-xs text-sm text-muted-foreground">{description}</p>
                ) : null}
                {children}
            </div>
            {actions ? (
                <div
                    data-scone-section-header-actions=""
                    className="flex shrink-0 flex-wrap items-center justify-end gap-sm"
                >
                    {actions}
                </div>
            ) : null}
        </div>
    );
}

function SectionContent({ className, children, ...props }: SectionContentProps) {
    return (
        <div data-scone-section-part="content" className={cn("min-w-0", className)} {...props}>
            {children}
        </div>
    );
}

function SectionFooter({ className, children, ...props }: SectionFooterProps) {
    return (
        <div
            data-scone-section-part="footer"
            className={cn("min-w-0 text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export const Section = {
    Root: SectionRoot,
    Header: SectionHeader,
    Content: SectionContent,
    Footer: SectionFooter,
};
