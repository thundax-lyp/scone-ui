import { SconeBadge, type SconeTableColumn, type SconeTreeNode } from "scone-ui";

import {
    type AdvancedMemberRow,
    type ComponentRow,
    type QueryRuleRow,
    type StandardListItem,
    type CardListItem,
} from "./page-types";

export const familyRows: ComponentRow[] = [
    {
        id: "form",
        component: "SconeForm",
        family: "Form",
        status: "Stable",
        owner: "Input",
        purpose: "Field wiring, validation states, disabled/readOnly",
    },
    {
        id: "table",
        component: "SconeTable",
        family: "Data display",
        status: "Stable",
        owner: "Display",
        purpose: "Columns, rowKey, empty/loading/error priority",
    },
    {
        id: "menu",
        component: "SconeMenu",
        family: "Navigation",
        status: "Stable",
        owner: "Navigation",
        purpose: "Nested menu, selected keys, keyboard movement",
    },
    {
        id: "datatable",
        component: "DataTable",
        family: "Pattern",
        status: "Stable",
        owner: "Pattern",
        purpose: "Filter bar, toolbar, table region, pagination",
    },
    {
        id: "feedback",
        component: "SconeAlert",
        family: "Feedback",
        status: "Draft",
        owner: "Feedback",
        purpose: "Tone, role mapping, recovery action placement",
    },
];

export const componentInventoryRows: ComponentRow[] = [
    ...familyRows,
    {
        id: "tabs",
        component: "SconeTabs",
        family: "Navigation",
        status: "Stable",
        owner: "Navigation",
        purpose: "Segmented page sections, active tab state, keyboard focus",
    },
    {
        id: "progress",
        component: "SconeProgress",
        family: "Feedback",
        status: "Stable",
        owner: "Feedback",
        purpose: "Progress percentage, status tone, compact dashboard metric",
    },
    {
        id: "descriptions",
        component: "SconeDescriptions",
        family: "Data display",
        status: "Stable",
        owner: "Display",
        purpose: "Read-only records, bordered layout, responsive label columns",
    },
    {
        id: "tree",
        component: "SconeTree",
        family: "Navigation",
        status: "Draft",
        owner: "Navigation",
        purpose: "Hierarchy browsing, checked keys, selected node feedback",
    },
    {
        id: "command",
        component: "SconeCommand",
        family: "Navigation",
        status: "Draft",
        owner: "Navigation",
        purpose: "Command palette, grouped actions, search-driven selection",
    },
    {
        id: "timeline",
        component: "SconeTimeline",
        family: "Data display",
        status: "Stable",
        owner: "Display",
        purpose: "Event stream, pending state, status marker semantics",
    },
    {
        id: "select",
        component: "SconeSelect",
        family: "Form",
        status: "Stable",
        owner: "Input",
        purpose: "Single choice, disabled option, form field composition",
    },
    {
        id: "number-input",
        component: "SconeNumberInput",
        family: "Form",
        status: "Draft",
        owner: "Input",
        purpose: "Numeric bounds, steppers, controlled and uncontrolled values",
    },
    {
        id: "loading",
        component: "SconeLoading",
        family: "Feedback",
        status: "Stable",
        owner: "Feedback",
        purpose: "Skeleton, spinner, and loading region presentation",
    },
    {
        id: "badge",
        component: "SconeBadge",
        family: "Data display",
        status: "Stable",
        owner: "Display",
        purpose: "Status count, tone mapping, compact list annotation",
    },
];

export const familyColumns: Array<SconeTableColumn<ComponentRow>> = [
    {
        key: "component",
        title: "组件 / Component",
        dataIndex: "component",
    },
    {
        key: "family",
        title: "分组 / Family",
        dataIndex: "family",
    },
    {
        key: "status",
        title: "状态 / Status",
        render: (_value, record) => (
            <SconeBadge
                count={record.status}
                tone={record.status === "Stable" ? "success" : "warning"}
            />
        ),
    },
    {
        key: "owner",
        title: "负责人 / Owner",
        dataIndex: "owner",
    },
    {
        key: "purpose",
        title: "用法 / Usage",
        dataIndex: "purpose",
    },
];

export const queryRuleRows: QueryRuleRow[] = [
    {
        id: "trade-99",
        name: "TradeCode 99",
        description: "这是一段描述",
        callCount: "805万",
        status: "异常",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-98",
        name: "TradeCode 98",
        description: "这是一段描述",
        callCount: "310万",
        status: "已上线",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-97",
        name: "TradeCode 97",
        description: "这是一段描述",
        callCount: "104万",
        status: "已上线",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-96",
        name: "TradeCode 96",
        description: "这是一段描述",
        callCount: "767万",
        status: "关闭",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-95",
        name: "TradeCode 95",
        description: "这是一段描述",
        callCount: "775万",
        status: "关闭",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-94",
        name: "TradeCode 94",
        description: "这是一段描述",
        callCount: "129万",
        status: "异常",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
    {
        id: "trade-93",
        name: "TradeCode 93",
        description: "这是一段描述",
        callCount: "664万",
        status: "运行中",
        lastScheduledAt: "1970-01-01 00:00:00",
    },
];

export const queryRuleBaseColumns: Array<SconeTableColumn<QueryRuleRow>> = [
    {
        key: "name",
        title: "规则名称",
        dataIndex: "name",
        width: 136,
        render: (_value, record) => (
            <a className="scone-example-table-link" href="#rule">
                {record.name}
            </a>
        ),
    },
    {
        key: "description",
        title: "描述",
        dataIndex: "description",
        width: 128,
    },
    {
        key: "call-count",
        title: "服务调用次数",
        dataIndex: "callCount",
        width: 148,
        sortable: true,
    },
    {
        key: "status",
        title: "状态",
        width: 92,
        render: (_value, record) => (
            <span className="scone-example-rule-status" data-status={record.status}>
                {record.status}
            </span>
        ),
    },
    {
        key: "last-scheduled-at",
        title: "上次调度时间",
        dataIndex: "lastScheduledAt",
        width: 198,
        sortable: true,
    },
    {
        key: "actions",
        title: "操作",
        width: 148,
        render: () => (
            <span className="scone-example-table-actions">
                <a href="#configure">配置</a>
                <a href="#subscribe">订阅警报</a>
            </span>
        ),
    },
];

export const treeData: SconeTreeNode[] = [
    {
        key: "component-library",
        title: "组件库 / Component library",
        children: [
            { key: "forms", title: "表单 / Forms" },
            { key: "display", title: "数据展示 / Data display" },
            { key: "navigation", title: "导航 / Navigation" },
        ],
    },
    {
        key: "patterns",
        title: "后台模式 / Admin patterns",
        children: [
            { key: "app-shell", title: "AppShell" },
            { key: "data-table", title: "DataTable" },
        ],
    },
];

export const initialAdvancedMemberRows: AdvancedMemberRow[] = [
    {
        id: "1",
        name: "Alex",
        workId: "00001",
        department: "组件平台",
    },
    {
        id: "2",
        name: "Taylor",
        workId: "00002",
        department: "设计系统",
    },
];

export const standardListItems: StandardListItem[] = [
    {
        id: "scone-shell",
        title: "Scone Shell",
        description: "那是一种内在的东西，他们到达不了，也无法触及的",
        owner: "付小小",
        startAt: "2026-07-14 17:55",
        progress: 92,
        avatarTone: "blue",
        avatarText: "S",
    },
    {
        id: "angular",
        title: "Angular",
        description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
        owner: "曲丽丽",
        startAt: "2026-07-14 19:05",
        avatarTone: "red",
        avatarText: "A",
    },
    {
        id: "scone-ui",
        title: "Scone UI",
        description: "生命就像一盒巧克力，结果往往出人意料",
        owner: "林东东",
        startAt: "2026-07-13 23:21",
        progress: 63,
        avatarTone: "cyan",
        avatarText: "◇",
    },
    {
        id: "scone-admin",
        title: "Scone Admin",
        description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
        owner: "周星星",
        startAt: "2026-07-11 01:45",
        progress: 91,
        avatarTone: "green",
        avatarText: "P",
    },
    {
        id: "bootstrap",
        title: "Bootstrap",
        description: "那时候我只会想自己想要什么，从不想自己拥有什么",
        owner: "吴加好",
        startAt: "2026-07-08 02:09",
        avatarTone: "orange",
        avatarText: "B",
    },
];

export const cardListItems: CardListItem[] = [
    {
        id: "scone-shell",
        title: "Scone Shell",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "S",
        avatarTone: "blue",
    },
    {
        id: "angular",
        title: "Angular",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "A",
        avatarTone: "red",
    },
    {
        id: "scone-ui",
        title: "Scone UI",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "UI",
        avatarTone: "cyan",
    },
    {
        id: "scone-admin",
        title: "Scone Admin",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "Ad",
        avatarTone: "dark",
    },
    {
        id: "bootstrap",
        title: "Bootstrap",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "B",
        avatarTone: "purple",
    },
    {
        id: "react",
        title: "React",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "R",
        avatarTone: "teal",
    },
    {
        id: "vue",
        title: "Vue",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式。",
        avatarText: "V",
        avatarTone: "green",
    },
];
