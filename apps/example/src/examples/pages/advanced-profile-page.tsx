import type * as React from "react";

import {
    SconeBadge,
    SconeButton,
    SconeCard,
    SconeDescriptions,
    SconeEmpty,
    SconeTable,
    SconeTabs,
    type SconeTableColumn,
} from "scone-ui";

type OperationLogRow = {
    id: string;
    type: string;
    operator: string;
    result: "成功" | "驳回";
    operatedAt: string;
    remark: string;
};

const operationLogs: OperationLogRow[] = [
    {
        id: "order-active",
        type: "订购关系生效",
        operator: "曲丽丽",
        result: "成功",
        operatedAt: "2017-10-03 19:23:12",
        remark: "-",
    },
    {
        id: "finance-review",
        type: "财务复审",
        operator: "付小小",
        result: "驳回",
        operatedAt: "2017-10-03 19:23:12",
        remark: "不通过原因",
    },
    {
        id: "department-review",
        type: "部门初审",
        operator: "周毛毛",
        result: "成功",
        operatedAt: "2017-10-03 19:23:12",
        remark: "-",
    },
    {
        id: "submit-order",
        type: "提交订单",
        operator: "林东东",
        result: "成功",
        operatedAt: "2017-10-03 19:23:12",
        remark: "很棒",
    },
    {
        id: "create-order",
        type: "创建订单",
        operator: "汗牙牙",
        result: "成功",
        operatedAt: "2017-10-03 19:23:12",
        remark: "-",
    },
];

const operationLogColumns: Array<SconeTableColumn<OperationLogRow>> = [
    {
        key: "type",
        title: "操作类型",
        dataIndex: "type",
        minWidth: 160,
    },
    {
        key: "operator",
        title: "操作人",
        dataIndex: "operator",
        width: 120,
    },
    {
        key: "result",
        title: "执行结果",
        dataIndex: "result",
        width: 112,
        render: (value) => (
            <SconeBadge
                className="scone-example-advanced-profile-log-badge"
                count={value as OperationLogRow["result"]}
                tone={value === "成功" ? "success" : "warning"}
            />
        ),
    },
    {
        key: "operatedAt",
        title: "操作时间",
        dataIndex: "operatedAt",
        width: 184,
    },
    {
        key: "remark",
        title: "备注",
        dataIndex: "remark",
        minWidth: 144,
    },
];

const AdvancedProfileTitle = (): React.JSX.Element => (
    <div className="scone-example-advanced-profile-title">
        <div>
            <div className="scone-example-advanced-profile-breadcrumb">详情页 / 高级详情页</div>
            <h2>单号：234231029431</h2>
        </div>
        <div className="scone-example-advanced-profile-actions">
            <SconeButton variant="secondary" size="sm">
                操作一
            </SconeButton>
            <SconeButton variant="secondary" size="sm">
                操作二
            </SconeButton>
            <SconeButton size="sm">主操作</SconeButton>
        </div>
    </div>
);

const AdvancedProfileSteps = (): React.JSX.Element => (
    <ol className="scone-example-advanced-profile-steps" aria-label="流程进度">
        {[
            { title: "创建项目", owner: "曲丽丽", time: "2016-12-12 12:32", state: "done" },
            { title: "部门初审", owner: "周毛毛", time: "催一下", state: "current" },
            { title: "财务复核", owner: "", time: "", state: "todo" },
            { title: "完成", owner: "", time: "", state: "todo" },
        ].map((step, index) => (
            <li key={step.title} data-state={step.state}>
                <span>{index + 1}</span>
                <div>
                    <strong>{step.title}</strong>
                    {step.owner ? <em>{step.owner}</em> : null}
                    {step.time ? <small>{step.time}</small> : null}
                </div>
            </li>
        ))}
    </ol>
);

const AdvancedProfileInfoCard = (): React.JSX.Element => (
    <SconeCard className="scone-example-advanced-profile-card">
        <section className="scone-example-advanced-profile-section" aria-labelledby="user-info">
            <h3 id="user-info">用户信息</h3>
            <SconeDescriptions
                className="scone-example-advanced-profile-descriptions"
                columns={{ sm: 1, md: 2, lg: 3 }}
                items={[
                    { key: "name", label: "用户姓名", value: "付小小" },
                    { key: "member-card", label: "会员卡号", value: "32943898021309809423" },
                    { key: "id-card", label: "身份证", value: "3321944288191034921" },
                    { key: "phone", label: "联系方式", value: "18112345678" },
                    {
                        key: "address",
                        label: "联系地址",
                        value: "曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口",
                        span: 2,
                    },
                ]}
            />
        </section>

        <section className="scone-example-advanced-profile-section" aria-labelledby="info-group">
            <h3 id="info-group">信息组</h3>
            <SconeDescriptions
                className="scone-example-advanced-profile-descriptions"
                columns={{ sm: 1, md: 2, lg: 2 }}
                items={[
                    { key: "metric-a", label: "某某数据", value: "725" },
                    { key: "updated-a", label: "该数据更新时间", value: "2017-08-08" },
                    { key: "metric-b", label: "某某数据", value: "725" },
                    { key: "updated-b", label: "该数据更新时间", value: "2017-08-08" },
                ]}
            />
        </section>

        <section className="scone-example-advanced-profile-section" aria-labelledby="multi-info">
            <h3 id="multi-info">多层级信息组</h3>
            <div className="scone-example-advanced-profile-inner-card">
                <div className="scone-example-advanced-profile-inner-title">组名称</div>
                <SconeDescriptions
                    className="scone-example-advanced-profile-descriptions"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    items={[
                        { key: "owner", label: "负责人", value: "林东东" },
                        { key: "role", label: "角色码", value: "1234567" },
                        { key: "department", label: "所属部门", value: "XX公司 - YY部" },
                        { key: "expires", label: "过期时间", value: "2017-08-08" },
                        {
                            key: "description",
                            label: "描述",
                            value: "这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...",
                            span: 2,
                        },
                    ]}
                />
                <div className="scone-example-advanced-profile-divider" />
                <div className="scone-example-advanced-profile-inner-title">组名称</div>
                <SconeDescriptions
                    className="scone-example-advanced-profile-descriptions"
                    columns={1}
                    items={[
                        {
                            key: "scientific-name",
                            label: "学名",
                            value: "Citrullus lanatus (Thunb.) Matsum. et Nakai 一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗...",
                        },
                    ]}
                />
                <div className="scone-example-advanced-profile-divider" />
                <div className="scone-example-advanced-profile-inner-title">组名称</div>
                <SconeDescriptions
                    className="scone-example-advanced-profile-descriptions"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    items={[
                        { key: "owner-b", label: "负责人", value: "付小小" },
                        { key: "role-b", label: "角色码", value: "1234568" },
                    ]}
                />
            </div>
        </section>
    </SconeCard>
);

const renderOperationLogTable = (ariaLabel: string): React.JSX.Element => (
    <SconeTable
        ariaLabel={ariaLabel}
        className="scone-example-advanced-profile-table"
        columns={operationLogColumns}
        dataSource={operationLogs}
        density="default"
        rowKey="id"
        scroll={{ x: 760 }}
    />
);

export const AdvancedProfilePage = (): React.JSX.Element => (
    <div className="scone-example-advanced-profile-page">
        <header className="scone-example-advanced-profile-header">
            <AdvancedProfileTitle />
            <div className="scone-example-advanced-profile-summary">
                <SconeDescriptions
                    className="scone-example-advanced-profile-descriptions"
                    columns={{ sm: 1, md: 2, lg: 2 }}
                    items={[
                        { key: "creator", label: "创建人", value: "曲丽丽" },
                        { key: "product", label: "订购产品", value: "XX 服务" },
                        { key: "created-at", label: "创建时间", value: "2017-07-07" },
                        { key: "related", label: "关联单据", value: "12421" },
                        {
                            key: "effective",
                            label: "生效日期",
                            value: "2017-07-07 ~ 2017-08-08",
                        },
                        { key: "remark", label: "备注", value: "请于两个工作日内确认" },
                    ]}
                />
                <div className="scone-example-advanced-profile-aside" aria-label="订单状态">
                    <div>
                        <span>状态</span>
                        <strong>待审批</strong>
                    </div>
                    <div>
                        <span>订单金额</span>
                        <strong>¥568.08</strong>
                    </div>
                </div>
            </div>
            <SconeTabs
                ariaLabel="高级详情页视图"
                className="scone-example-advanced-profile-tabs"
                defaultValue="detail"
                items={[
                    { value: "detail", label: "详情", content: null },
                    { value: "rule", label: "规则", content: null },
                ]}
            />
        </header>

        <SconeCard className="scone-example-advanced-profile-card scone-example-advanced-profile-progress-card">
            <section className="scone-example-advanced-profile-section" aria-labelledby="progress">
                <h3 id="progress">流程进度</h3>
                <AdvancedProfileSteps />
            </section>
        </SconeCard>

        <AdvancedProfileInfoCard />

        <SconeCard className="scone-example-advanced-profile-card scone-example-advanced-profile-empty-card">
            <section
                className="scone-example-advanced-profile-section"
                aria-labelledby="call-record"
            >
                <h3 id="call-record">用户近半年来电记录</h3>
                <SconeEmpty title="暂无数据" className="scone-example-advanced-profile-empty" />
            </section>
        </SconeCard>

        <SconeCard className="scone-example-advanced-profile-card scone-example-advanced-profile-log-card">
            <SconeTabs
                ariaLabel="操作日志"
                className="scone-example-advanced-profile-log-tabs"
                defaultValue="log-one"
                items={[
                    {
                        value: "log-one",
                        label: "操作日志一",
                        content: renderOperationLogTable("操作日志一"),
                    },
                    {
                        value: "log-two",
                        label: "操作日志二",
                        content: renderOperationLogTable("操作日志二"),
                    },
                    {
                        value: "log-three",
                        label: "操作日志三",
                        content: renderOperationLogTable("操作日志三"),
                    },
                ]}
            />
        </SconeCard>
    </div>
);
