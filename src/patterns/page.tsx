import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeDensity } from "@/types/foundation";

export interface PageRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    maxWidth?: "narrow" | "content" | "wide" | "full";
    hasStickyActions?: boolean;
    density?: SconeDensity;
}

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    children?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface PageMainProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: false;
}

export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface PageStickyActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    align?: "start" | "center" | "end" | "between";
}

interface PageContextValue {
    hasStickyActions: boolean;
}

const PageContext = React.createContext<PageContextValue>({
    hasStickyActions: false,
});

const pageMaxWidthClassNames = {
    narrow: "max-w-3xl",
    content: "max-w-5xl",
    wide: "max-w-7xl",
    full: "max-w-none",
};

const pageDensityClassNames = {
    compact: "gap-sm p-sm",
    default: "gap-md p-md",
    comfortable: "gap-lg p-lg",
};

const stickyActionsAlignClassNames = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
};

function PageRoot({
    maxWidth = "content",
    hasStickyActions = false,
    density = "default",
    className,
    children,
    ...props
}: PageRootProps) {
    const contextValue = React.useMemo<PageContextValue>(
        () => ({ hasStickyActions }),
        [hasStickyActions],
    );

    return (
        <PageContext.Provider value={contextValue}>
            <div
                data-scone-pattern="page"
                data-max-width={maxWidth}
                data-density={density}
                data-has-sticky-actions={hasStickyActions || undefined}
                className={cn(
                    "relative mx-auto flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden",
                    pageMaxWidthClassNames[maxWidth],
                    pageDensityClassNames[density],
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </PageContext.Provider>
    );
}

function PageHeader({
    title,
    description,
    actions,
    className,
    children,
    ...props
}: PageHeaderProps) {
    return (
        <header
            data-scone-page-part="header"
            className={cn("flex shrink-0 flex-wrap items-start justify-between gap-sm", className)}
            {...props}
        >
            <div data-scone-page-header-content="" className="min-w-0 flex-1">
                {title ? (
                    <h1 className="text-2xl font-semibold tracking-normal text-foreground">
                        {title}
                    </h1>
                ) : null}
                {description ? (
                    <p className="mt-xs text-sm text-muted-foreground">{description}</p>
                ) : null}
                {children}
            </div>
            {actions ? (
                <div
                    data-scone-page-header-actions=""
                    className="flex shrink-0 flex-wrap items-center justify-end gap-sm"
                >
                    {actions}
                </div>
            ) : null}
        </header>
    );
}

function PageMain({ asChild = false, className, children, ...props }: PageMainProps) {
    const { hasStickyActions } = React.useContext(PageContext);
    void asChild;

    return (
        <main
            data-scone-page-part="main"
            data-inset-for-sticky-actions={hasStickyActions || undefined}
            className={cn(
                "min-h-0 min-w-0 flex-1 overflow-auto",
                hasStickyActions && "pb-24",
                className,
            )}
            {...props}
        >
            {children}
        </main>
    );
}

function PageContent({ className, children, ...props }: PageContentProps) {
    const { hasStickyActions } = React.useContext(PageContext);

    return (
        <div
            data-scone-page-part="content"
            data-inset-for-sticky-actions={hasStickyActions || undefined}
            className={cn(
                "min-h-0 min-w-0 flex-1 overflow-auto",
                hasStickyActions && "pb-24",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function PageStickyActions({
    align = "end",
    className,
    children,
    ...props
}: PageStickyActionsProps) {
    return (
        <div
            data-scone-page-part="sticky-actions"
            data-align={align}
            className={cn(
                "sticky bottom-0 z-20 flex shrink-0 flex-wrap items-center gap-sm border-t border-border bg-background/95 px-md py-sm backdrop-blur supports-[backdrop-filter]:bg-background/80",
                stickyActionsAlignClassNames[align],
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export const Page = {
    Root: PageRoot,
    Header: PageHeader,
    Main: PageMain,
    Content: PageContent,
    StickyActions: PageStickyActions,
};
