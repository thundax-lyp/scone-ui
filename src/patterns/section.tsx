import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeDensity } from "@/types/foundation";

export interface SectionRootProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    density?: SconeDensity;
}

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    children?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 2 | 3 | 4;
}

export type SectionDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export type SectionActionsProps = React.HTMLAttributes<HTMLDivElement>;

export interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface SectionFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const sectionDensityClassNames: Record<SconeDensity, string> = {
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
                {title ? <SectionTitle>{title}</SectionTitle> : null}
                {description ? <SectionDescription>{description}</SectionDescription> : null}
                {children}
            </div>
            {actions ? (
                <SectionActions data-scone-section-header-actions="">
                    {actions}
                </SectionActions>
            ) : null}
        </div>
    );
}

function SectionTitle({ level = 2, className, children, ...props }: SectionTitleProps) {
    const Heading = `h${level}` as "h2" | "h3" | "h4";

    return (
        <Heading
            data-scone-section-part="title"
            className={cn("min-w-0 text-base font-semibold text-foreground", className)}
            {...props}
        >
            {children}
        </Heading>
    );
}

function SectionDescription({ className, children, ...props }: SectionDescriptionProps) {
    return (
        <p
            data-scone-section-part="description"
            className={cn("mt-xs min-w-0 text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    );
}

function SectionActions({ className, children, ...props }: SectionActionsProps) {
    return (
        <div
            data-scone-section-part="actions"
            className={cn("flex shrink-0 flex-wrap items-center justify-end gap-sm", className)}
            {...props}
        >
            {children}
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
    Title: SectionTitle,
    Description: SectionDescription,
    Actions: SectionActions,
    Content: SectionContent,
    Footer: SectionFooter,
};
