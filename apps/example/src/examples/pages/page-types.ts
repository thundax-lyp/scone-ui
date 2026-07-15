export type ExampleKey =
    | "welcome"
    | "admin-sub-page"
    | "analysis"
    | "monitor"
    | "workplace"
    | "basic-form"
    | "step-form"
    | "advanced-form"
    | "search-articles"
    | "search-projects"
    | "search-applications"
    | "table-list"
    | "basic-list"
    | "card-list"
    | "basic-profile"
    | "advanced-profile"
    | "success"
    | "fail"
    | "exception-403"
    | "exception-404"
    | "exception-500"
    | "account-center"
    | "account-settings"
    | "chatbot";

export type ComponentRow = {
    id: string;
    component: string;
    family: string;
    status: "Stable" | "Draft";
    owner: string;
    purpose: string;
};

export type AdvancedMemberRow = {
    id: string;
    name: string;
    workId: string;
    department: string;
};

export type QueryRuleRow = {
    id: string;
    name: string;
    description: string;
    callCount: string;
    status: "异常" | "已上线" | "关闭" | "运行中";
    lastScheduledAt: string;
};

export type StandardListItem = {
    id: string;
    title: string;
    description: string;
    owner: string;
    startAt: string;
    progress?: number;
    avatarTone: "blue" | "red" | "cyan" | "green" | "orange";
    avatarText: string;
};

export type CardListItem = {
    id: string;
    title: string;
    description: string;
    avatarText: string;
    avatarTone: "blue" | "red" | "cyan" | "dark" | "purple" | "teal" | "green";
};

export type MetricCardProps = {
    title: string;
    value: string;
    description: string;
    tone?: "info" | "success" | "warning" | "neutral";
    children?: React.ReactNode;
};
