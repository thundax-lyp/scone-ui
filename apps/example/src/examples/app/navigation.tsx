import {
    AlertTriangleIcon,
    CheckCircle2Icon,
    CrownIcon,
    FormInputIcon,
    HomeIcon,
    LayoutDashboardIcon,
    RocketIcon,
    SettingsIcon,
    Table2Icon,
    UserCircleIcon,
} from "lucide-react";

import { type SconeNavigationItem } from "scone-ui";

import { type ExampleKey } from "../pages/page-registry";

const renderMenuLabel = (children: string): React.ReactNode => (
    <span className="scone-example-menu-label">{children}</span>
);

export const menuItems: SconeNavigationItem[] = [
    {
        key: "welcome",
        label: renderMenuLabel("欢迎"),
        icon: <HomeIcon className="size-4" />,
    },
    {
        key: "admin",
        label: renderMenuLabel("管理页"),
        icon: <CrownIcon className="size-4" />,
        children: [
            {
                key: "admin-sub-page",
                label: renderMenuLabel("二级管理页"),
            },
        ],
    },
    {
        key: "dashboard",
        label: renderMenuLabel("Dashboard"),
        icon: <LayoutDashboardIcon className="size-4" />,
        children: [
            {
                key: "analysis",
                label: renderMenuLabel("分析页"),
            },
            {
                key: "monitor",
                label: renderMenuLabel("监控页"),
            },
            {
                key: "workplace",
                label: renderMenuLabel("工作台"),
            },
        ],
    },
    {
        key: "form",
        label: renderMenuLabel("表单页"),
        icon: <FormInputIcon className="size-4" />,
        children: [
            {
                key: "basic-form",
                label: renderMenuLabel("基础表单"),
            },
            {
                key: "step-form",
                label: renderMenuLabel("分步表单"),
            },
            {
                key: "advanced-form",
                label: renderMenuLabel("高级表单"),
            },
        ],
    },
    {
        key: "list",
        label: renderMenuLabel("列表页"),
        icon: <Table2Icon className="size-4" />,
        children: [
            {
                key: "search-list",
                label: renderMenuLabel("搜索列表"),
                children: [
                    {
                        key: "search-articles",
                        label: renderMenuLabel("搜索列表（文章）"),
                    },
                    {
                        key: "search-projects",
                        label: renderMenuLabel("搜索列表（项目）"),
                    },
                    {
                        key: "search-applications",
                        label: renderMenuLabel("搜索列表（应用）"),
                    },
                ],
            },
            {
                key: "table-list",
                label: renderMenuLabel("查询表格"),
            },
            {
                key: "basic-list",
                label: renderMenuLabel("标准列表"),
            },
            {
                key: "card-list",
                label: renderMenuLabel("卡片列表"),
            },
        ],
    },
    {
        key: "profile",
        label: renderMenuLabel("详情页"),
        icon: <UserCircleIcon className="size-4" />,
        children: [
            {
                key: "basic-profile",
                label: renderMenuLabel("基础详情页"),
            },
            {
                key: "advanced-profile",
                label: renderMenuLabel("高级详情页"),
            },
        ],
    },
    {
        key: "result",
        label: renderMenuLabel("结果页"),
        icon: <CheckCircle2Icon className="size-4" />,
        children: [
            {
                key: "success",
                label: renderMenuLabel("成功页"),
            },
            {
                key: "fail",
                label: renderMenuLabel("失败页"),
            },
        ],
    },
    {
        key: "exception",
        label: renderMenuLabel("异常页"),
        icon: <AlertTriangleIcon className="size-4" />,
        children: [
            {
                key: "exception-403",
                label: renderMenuLabel("403"),
            },
            {
                key: "exception-404",
                label: renderMenuLabel("404"),
            },
            {
                key: "exception-500",
                label: renderMenuLabel("500"),
            },
        ],
    },
    {
        key: "account",
        label: renderMenuLabel("个人页"),
        icon: <SettingsIcon className="size-4" />,
        children: [
            {
                key: "account-center",
                label: renderMenuLabel("个人中心"),
            },
            {
                key: "account-settings",
                label: renderMenuLabel("个人设置"),
            },
        ],
    },
    {
        key: "chatbot",
        label: renderMenuLabel("AI 助手"),
        icon: <RocketIcon className="size-4" />,
    },
];

export const getActiveMenuRoot = (activeKey: ExampleKey): string => {
    if (activeKey === "admin-sub-page") {
        return "admin";
    }
    if (activeKey === "analysis" || activeKey === "monitor" || activeKey === "workplace") {
        return "dashboard";
    }
    if (activeKey === "basic-form" || activeKey === "step-form" || activeKey === "advanced-form") {
        return "form";
    }
    if (
        activeKey === "search-articles" ||
        activeKey === "search-projects" ||
        activeKey === "search-applications" ||
        activeKey === "table-list" ||
        activeKey === "basic-list" ||
        activeKey === "card-list"
    ) {
        return "list";
    }
    if (activeKey === "basic-profile" || activeKey === "advanced-profile") {
        return "profile";
    }
    if (activeKey === "success" || activeKey === "fail") {
        return "result";
    }
    if (
        activeKey === "exception-403" ||
        activeKey === "exception-404" ||
        activeKey === "exception-500"
    ) {
        return "exception";
    }
    if (activeKey === "account-center" || activeKey === "account-settings") {
        return "account";
    }
    return activeKey;
};

export const getActiveMenuOpenKeys = (activeKey: ExampleKey): string[] => {
    if (
        activeKey === "search-articles" ||
        activeKey === "search-projects" ||
        activeKey === "search-applications"
    ) {
        return ["list", "search-list"];
    }
    const activeRoot = getActiveMenuRoot(activeKey);
    return activeRoot === activeKey ? [] : [activeRoot];
};

export const markActiveMenuRoot = (
    items: SconeNavigationItem[],
    activeRoot: string,
): SconeNavigationItem[] =>
    items.map((item) => ({
        ...item,
        className: item.key === activeRoot ? "scone-example-menu-root-active" : item.className,
        children: item.children ? markActiveMenuRoot(item.children, activeRoot) : item.children,
    }));
