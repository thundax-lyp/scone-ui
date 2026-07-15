import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoonIcon,
    SearchIcon,
    SettingsIcon,
    SunIcon,
} from "lucide-react";
import * as React from "react";

import { AppShell, Page, SconeButton, SconeMenu, type SconeNavigationItem } from "scone-ui";

import { type ExampleKey } from "../pages/page-registry";
import { SconeAdminLogo } from "./scone-admin-logo";

const apiGuideUrl = "https://thundax-lyp.github.io/scone-ui/docs/guide/ai-usage/";

export type ExampleTheme = "light" | "dark";

export type LibraryExampleLayoutProps = {
    activeKey: ExampleKey;
    activeTitle: string;
    theme: ExampleTheme;
    menuItems: SconeNavigationItem[];
    selectedKeys: string[];
    openKeys: string[];
    sidebarCollapsed: boolean;
    onThemeChange: (theme: ExampleTheme) => void;
    onSidebarCollapsedChange: (collapsed: boolean) => void;
    onMenuOpenChange: (keys: string[]) => void;
    onMenuSelect: (key: string) => void;
    children: React.ReactNode;
};

export const LibraryExampleLayout = ({
    activeKey,
    activeTitle,
    theme,
    menuItems,
    selectedKeys,
    openKeys,
    sidebarCollapsed,
    onThemeChange,
    onSidebarCollapsedChange,
    onMenuOpenChange,
    onMenuSelect,
    children,
}: LibraryExampleLayoutProps): React.JSX.Element => {
    const isDark = theme === "dark";

    return (
        <div
            className={isDark ? "scone-example dark" : "scone-example"}
            data-example-theme={theme}
            data-example-active={activeKey}
        >
            <AppShell.Root className="min-h-screen flex-col bg-transparent">
                <AppShell.Header
                    className="scone-example-header"
                    actions={
                        <>
                            <SconeButton variant="ghost" ariaLabel="搜索 / Search">
                                <SearchIcon className="size-4" />
                            </SconeButton>
                            <SconeButton
                                variant="ghost"
                                size="sm"
                                ariaLabel={
                                    isDark
                                        ? "切换浅色主题 / Use light theme"
                                        : "切换深色主题 / Use dark theme"
                                }
                                onClick={() => onThemeChange(isDark ? "light" : "dark")}
                            >
                                {isDark ? (
                                    <SunIcon className="size-4" />
                                ) : (
                                    <MoonIcon className="size-4" />
                                )}
                                {isDark ? "浅色 / Light" : "深色 / Dark"}
                            </SconeButton>
                            <SconeButton
                                asChild
                                variant="ghost"
                                size="sm"
                                className="scone-example-api-action"
                            >
                                <a href={apiGuideUrl} target="_blank" rel="noreferrer">
                                    API Guide
                                </a>
                            </SconeButton>
                            <div className="scone-example-user">
                                <SconeAdminLogo size="sm" />
                                <span>SconeUser</span>
                            </div>
                        </>
                    }
                >
                    <SconeAdminLogo size="md" showWordmark />
                </AppShell.Header>

                <div className="scone-example-body">
                    <AppShell.Sidebar
                        aria-label="Example navigation"
                        collapsed={sidebarCollapsed}
                        className="scone-example-sidebar max-h-72 w-full border-r-0 border-b md:max-h-none md:border-r md:border-b-0"
                    >
                        <SconeButton
                            className="scone-example-sidebar-toggle"
                            variant="secondary"
                            size="sm"
                            ariaLabel={
                                sidebarCollapsed
                                    ? "展开菜单 / Expand menu"
                                    : "收起菜单 / Collapse menu"
                            }
                            onClick={() => onSidebarCollapsedChange(!sidebarCollapsed)}
                        >
                            {sidebarCollapsed ? (
                                <ChevronRightIcon className="size-3" />
                            ) : (
                                <ChevronLeftIcon className="size-3" />
                            )}
                        </SconeButton>
                        <div className="min-h-0 flex-1 overflow-auto p-sm">
                            <SconeMenu
                                ariaLabel="组件示例 / Component examples"
                                items={menuItems}
                                selectedKeys={selectedKeys}
                                openKeys={openKeys}
                                collapsed={sidebarCollapsed}
                                onOpenChange={onMenuOpenChange}
                                onSelect={(key) => onMenuSelect(key)}
                            />
                        </div>
                    </AppShell.Sidebar>

                    <AppShell.Main className="bg-transparent">
                        <Page.Root
                            maxWidth="full"
                            density="comfortable"
                            className="scone-example-page"
                        >
                            <Page.Main aria-label="Scone UI component example">
                                <h1 className="sr-only">{activeTitle}</h1>
                                <div className="grid gap-6">{children}</div>
                            </Page.Main>
                        </Page.Root>
                    </AppShell.Main>
                </div>
            </AppShell.Root>
            <SconeButton className="scone-example-floating" ariaLabel="设置 / Settings">
                <SettingsIcon className="size-4" />
            </SconeButton>
        </div>
    );
};
