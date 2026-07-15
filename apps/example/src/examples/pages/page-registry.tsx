import * as React from "react";

import {
    AccountPage,
    AdvancedFormPage,
    AnalysisPage,
    BasicFormPage,
    BasicProfilePage,
    CardListPage,
    ExceptionPage,
    MonitorPage,
    StandardListPage,
    StepFormPage,
    SuccessPage,
    TableListPage,
    WelcomePage,
    WorkplacePage,
    type ExampleKey,
} from "./index";

export type { ExampleKey } from "./index";

export const pageMeta: Record<
    ExampleKey,
    { title: string; description: string; breadcrumb: string[] }
> = {
    welcome: {
        title: "欢迎 / Welcome",
        description: "一个用于展示 scone-ui 公共组件的 Pro 风格后台示例。",
        breadcrumb: ["首页 Home", "欢迎 Welcome"],
    },
    "admin-sub-page": {
        title: "二级管理页 / Sub-Page",
        description: "展示管理页菜单入口在组件库示例中的导航结构。",
        breadcrumb: ["管理页 Admin", "二级管理页 Sub-Page"],
    },
    analysis: {
        title: "分析页 / Analysis",
        description: "用统计卡片、图表、排行榜和列表展示组件在后台首页中的组合方式。",
        breadcrumb: ["仪表盘 Dashboard", "分析页 Analysis"],
    },
    monitor: {
        title: "监控页 / Monitor",
        description: "展示 loading、progress、alert、timeline 等状态组件如何组成监控视图。",
        breadcrumb: ["仪表盘 Dashboard", "监控页 Monitor"],
    },
    workplace: {
        title: "工作台 / Workplace",
        description: "展示工作区布局、快捷入口、项目列表和活动流。",
        breadcrumb: ["仪表盘 Dashboard", "工作台 Workplace"],
    },
    "basic-form": {
        title: "基础表单 / Basic Form",
        description: "展示 Field、Input、TextArea、Segmented 等表单组件的基础组合。",
        breadcrumb: ["表单页 Forms", "基础表单 Basic Form"],
    },
    "step-form": {
        title: "分步表单 / Step Form",
        description: "展示 Field、Input、Select、NumberInput 等表单组件如何组成分步任务。",
        breadcrumb: ["表单页 Forms", "分步表单 Step Form"],
    },
    "advanced-form": {
        title: "高级表单 / Advanced Form",
        description: "展示一次性输入和提交多组字段、表格成员和底部操作条的复杂表单。",
        breadcrumb: ["表单页 Forms", "高级表单 Advanced Form"],
    },
    "search-articles": {
        title: "搜索列表（文章） / Search List Articles",
        description: "展示搜索列表文章入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["列表页 Lists", "搜索列表 Search List", "文章 Articles"],
    },
    "search-projects": {
        title: "搜索列表（项目） / Search List Projects",
        description: "展示搜索列表项目入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["列表页 Lists", "搜索列表 Search List", "项目 Projects"],
    },
    "search-applications": {
        title: "搜索列表（应用） / Search List Applications",
        description: "展示搜索列表应用入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["列表页 Lists", "搜索列表 Search List", "应用 Applications"],
    },
    "table-list": {
        title: "查询表格 / Table List",
        description: "展示 FilterBar、Toolbar、TableRegion 和 Pagination 的列表页结构。",
        breadcrumb: ["列表页 Lists", "查询表格 Table List"],
    },
    "basic-list": {
        title: "标准列表 / Basic List",
        description: "对齐 Ant Design Pro 标准列表的统计卡片、筛选栏和列表项密度。",
        breadcrumb: ["列表页 Lists", "标准列表 Basic List"],
    },
    "card-list": {
        title: "卡片列表 / Card List",
        description: "对齐 Ant Design Pro 卡片列表的页面头、快捷链接、新增卡片和三列卡片网格。",
        breadcrumb: ["列表页 Lists", "卡片列表 Card List"],
    },
    "basic-profile": {
        title: "基础详情页 / Basic Profile",
        description: "展示 Descriptions、Table、Timeline 在详情页中的信息层级。",
        breadcrumb: ["详情页 Profile", "基础详情 Basic"],
    },
    "advanced-profile": {
        title: "高级详情页 / Advanced Profile",
        description: "展示高级详情入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["详情页 Profile", "高级详情 Advanced"],
    },
    success: {
        title: "成功页 / Result",
        description: "展示结果、下一步操作和相关信息。",
        breadcrumb: ["结果页 Result", "成功 Success"],
    },
    fail: {
        title: "失败页 / Fail",
        description: "展示失败反馈入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["结果页 Result", "失败 Fail"],
    },
    "exception-403": {
        title: "403",
        description: "展示异常状态、恢复操作和辅助说明。",
        breadcrumb: ["异常页 Exception", "403"],
    },
    "exception-404": {
        title: "404",
        description: "展示异常状态、恢复操作和辅助说明。",
        breadcrumb: ["异常页 Exception", "404"],
    },
    "exception-500": {
        title: "500",
        description: "展示异常状态、恢复操作和辅助说明。",
        breadcrumb: ["异常页 Exception", "500"],
    },
    "account-center": {
        title: "个人中心 / Account Center",
        description: "展示账户设置、偏好项和导航搜索。",
        breadcrumb: ["个人页 Account", "个人中心 Center"],
    },
    "account-settings": {
        title: "个人设置 / Account Settings",
        description: "展示账户设置、偏好项和导航搜索。",
        breadcrumb: ["个人页 Account", "个人设置 Settings"],
    },
    chatbot: {
        title: "AI 助手 / AI Assistant",
        description: "展示 AI 助手入口在 Ant Design Pro 菜单结构中的位置。",
        breadcrumb: ["AI 助手 AI Assistant"],
    },
};

export const renderExample = (activeKey: ExampleKey): React.ReactNode => {
    switch (activeKey) {
        case "welcome":
        case "admin-sub-page":
        case "chatbot":
            return <WelcomePage />;
        case "monitor":
            return <MonitorPage />;
        case "workplace":
            return <WorkplacePage />;
        case "basic-form":
            return <BasicFormPage />;
        case "step-form":
            return <StepFormPage />;
        case "advanced-form":
            return <AdvancedFormPage />;
        case "search-articles":
        case "search-projects":
        case "search-applications":
        case "table-list":
            return <TableListPage />;
        case "basic-list":
            return <StandardListPage />;
        case "card-list":
            return <CardListPage />;
        case "basic-profile":
        case "advanced-profile":
            return <BasicProfilePage />;
        case "success":
            return <SuccessPage />;
        case "fail":
        case "exception-403":
        case "exception-404":
        case "exception-500":
            return <ExceptionPage />;
        case "account-center":
        case "account-settings":
            return <AccountPage />;
        case "analysis":
        default:
            return <AnalysisPage />;
    }
};

export const isExampleKey = (key: string): key is ExampleKey => {
    return key in pageMeta;
};
