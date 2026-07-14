import * as React from "react";

import { cn } from "@/lib/cn";

export interface AppShellRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface AppShellSidebarProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
}

export interface AppShellHeaderProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface AppShellMainProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export interface AppShellAsideProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
}

function AppShellRoot({ className, children, ...props }: AppShellRootProps) {
    return (
        <div
            data-scone-pattern="app-shell"
            className={cn("flex h-screen min-h-0 w-full min-w-0 bg-background", className)}
            {...props}
        >
            {children}
        </div>
    );
}

function AppShellSidebar({
    collapsed,
    defaultCollapsed = false,
    className,
    children,
    ...props
}: AppShellSidebarProps) {
    const effectiveCollapsed = collapsed ?? defaultCollapsed;

    return (
        <aside
            data-scone-app-shell-part="sidebar"
            data-collapsed={effectiveCollapsed ? "true" : undefined}
            className={cn(
                "flex min-h-0 shrink-0 flex-col border-r border-border bg-background transition-[width]",
                effectiveCollapsed ? "w-16" : "w-64",
                className,
            )}
            {...props}
        >
            {children}
        </aside>
    );
}

function AppShellHeader({ actions, className, children, ...props }: AppShellHeaderProps) {
    return (
        <header
            data-scone-app-shell-part="header"
            className={cn(
                "flex min-h-control-lg shrink-0 items-center justify-between gap-sm border-b border-border bg-background px-md",
                className,
            )}
            {...props}
        >
            <div data-scone-app-shell-header-content="" className="min-w-0 flex-1">
                {children}
            </div>
            {actions ? (
                <div
                    data-scone-app-shell-header-actions=""
                    className="flex shrink-0 items-center justify-end gap-sm"
                >
                    {actions}
                </div>
            ) : null}
        </header>
    );
}

function AppShellMain({ className, children, ...props }: AppShellMainProps) {
    return (
        <main
            data-scone-app-shell-part="main"
            className={cn("flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", className)}
            {...props}
        >
            {children}
        </main>
    );
}

function AppShellAside({
    open,
    defaultOpen = false,
    className,
    children,
    ...props
}: AppShellAsideProps) {
    const effectiveOpen = open ?? defaultOpen;

    return (
        <aside
            data-scone-app-shell-part="aside"
            data-open={effectiveOpen ? "true" : undefined}
            hidden={!effectiveOpen}
            className={cn(
                "min-h-0 w-80 shrink-0 border-l border-border bg-background",
                !effectiveOpen && "w-0 border-l-0",
                className,
            )}
            {...props}
        >
            {children}
        </aside>
    );
}

export const AppShell = {
    Root: AppShellRoot,
    Sidebar: AppShellSidebar,
    Header: AppShellHeader,
    Main: AppShellMain,
    Aside: AppShellAside,
};
