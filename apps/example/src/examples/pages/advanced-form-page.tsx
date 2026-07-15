import * as React from "react";

import {
    SconeButton,
    SconeCard,
    SconeDatePicker,
    SconeField,
    SconeForm,
    SconeInput,
    SconeSelect,
    SconeTable,
    type SconeTableColumn,
} from "scone-ui";

import { initialAdvancedMemberRows } from "./page-data";
import { type AdvancedMemberRow } from "./page-types";

const AdvancedSectionCard = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}): React.JSX.Element => (
    <SconeCard className="scone-example-card scone-example-advanced-card">
        <div className="scone-example-advanced-card-title">{title}</div>
        <div className="scone-example-advanced-card-body">{children}</div>
    </SconeCard>
);

const AdvancedDateRange = (): React.JSX.Element => (
    <div className="scone-example-advanced-date-range">
        <SconeDatePicker
            ariaLabel="开始日期"
            placeholder="请选择"
            formatLabel={() => "2026-07-15"}
        />
        <span aria-hidden="true">→</span>
        <SconeDatePicker
            ariaLabel="结束日期"
            placeholder="请选择"
            formatLabel={() => "2026-07-31"}
        />
    </div>
);

export const AdvancedFormPage = (): React.JSX.Element => {
    const [memberRows, setMemberRows] =
        React.useState<AdvancedMemberRow[]>(initialAdvancedMemberRows);

    const handleAddMember = () => {
        setMemberRows((currentRows) => {
            const nextIndex = currentRows.length + 1;
            const nextWorkId = String(nextIndex).padStart(5, "0");

            return [
                ...currentRows,
                {
                    id: `member-${nextWorkId}`,
                    name: `成员 ${nextIndex}`,
                    workId: nextWorkId,
                    department: "组件治理",
                },
            ];
        });
    };

    const handleRemoveMember = (id: string) => {
        setMemberRows((currentRows) => currentRows.filter((row) => row.id !== id));
    };

    const advancedMemberColumns: Array<SconeTableColumn<AdvancedMemberRow>> = [
        {
            key: "name",
            title: "成员姓名",
            dataIndex: "name",
        },
        {
            key: "workId",
            title: "工号",
            dataIndex: "workId",
        },
        {
            key: "department",
            title: "所属部门",
            dataIndex: "department",
        },
        {
            key: "action",
            title: "操作",
            render: (_value, record) => (
                <SconeButton
                    type="button"
                    variant="link"
                    onClick={() => handleRemoveMember(record.id)}
                >
                    删除
                </SconeButton>
            ),
        },
    ];

    return (
        <SconeForm
            className="scone-example-advanced-form"
            requiredMark={false}
            onSubmit={(event) => event.preventDefault()}
        >
            <div className="scone-example-basic-form-page">
                <div className="scone-example-basic-form-header">
                    <div className="scone-example-basic-form-breadcrumb">表单页 / 高级表单</div>
                    <h2>高级表单</h2>
                    <p>高级表单常见于一次性输入和提交大批量数据的场景。</p>
                </div>

                <AdvancedSectionCard title="仓库管理">
                    <div className="scone-example-advanced-grid">
                        <SconeField.Root name="repoName" label="仓库名">
                            <SconeInput placeholder="请输入仓库名称" />
                        </SconeField.Root>
                        <SconeField.Root name="repoDomain" label="仓库域名">
                            <div className="scone-example-domain-input">
                                <span>http://</span>
                                <SconeInput ariaLabel="仓库域名" placeholder="请输入" />
                                <span>.com</span>
                            </div>
                        </SconeField.Root>
                        <SconeField.Root name="repoOwner" label="仓库管理员">
                            <SconeSelect
                                placeholder="请选择管理员"
                                options={[
                                    { value: "alex", label: "Alex" },
                                    { value: "taylor", label: "Taylor" },
                                ]}
                            />
                        </SconeField.Root>
                        <SconeField.Root name="repoReviewer" label="审批人">
                            <SconeSelect
                                placeholder="请选择审批员"
                                options={[
                                    { value: "lee", label: "Lee" },
                                    { value: "morgan", label: "Morgan" },
                                ]}
                            />
                        </SconeField.Root>
                        <SconeField.Root name="repoDate" label="生效日期">
                            <AdvancedDateRange />
                        </SconeField.Root>
                        <SconeField.Root name="repoType" label="仓库类型">
                            <SconeSelect
                                placeholder="请选择仓库类型"
                                options={[
                                    { value: "public", label: "公开仓库" },
                                    { value: "private", label: "私有仓库" },
                                ]}
                            />
                        </SconeField.Root>
                    </div>
                </AdvancedSectionCard>

                <AdvancedSectionCard title="任务管理">
                    <div className="scone-example-advanced-grid">
                        <SconeField.Root name="taskName" label="任务名">
                            <SconeInput placeholder="请输入" />
                        </SconeField.Root>
                        <SconeField.Root name="taskDescription" label="任务描述">
                            <SconeInput placeholder="请输入" />
                        </SconeField.Root>
                        <SconeField.Root name="taskOwner" label="执行人">
                            <SconeSelect
                                placeholder="请选择"
                                options={[
                                    { value: "alex", label: "Alex" },
                                    { value: "taylor", label: "Taylor" },
                                ]}
                            />
                        </SconeField.Root>
                        <SconeField.Root name="taskReviewer" label="责任人">
                            <SconeSelect
                                placeholder="请选择审批员"
                                options={[
                                    { value: "lee", label: "Lee" },
                                    { value: "morgan", label: "Morgan" },
                                ]}
                            />
                        </SconeField.Root>
                        <SconeField.Root name="taskDate" label="生效日期">
                            <SconeDatePicker placeholder="请选择" ariaLabel="任务生效日期" />
                        </SconeField.Root>
                        <SconeField.Root name="taskType" label="任务类型">
                            <SconeSelect
                                placeholder="请选择仓库类型"
                                options={[
                                    { value: "daily", label: "日常任务" },
                                    { value: "release", label: "发布任务" },
                                ]}
                            />
                        </SconeField.Root>
                    </div>
                </AdvancedSectionCard>

                <AdvancedSectionCard title="成员管理">
                    <SconeTable
                        ariaLabel="成员管理表格"
                        columns={advancedMemberColumns}
                        dataSource={memberRows}
                        rowKey="id"
                        density="default"
                        className="scone-example-advanced-table"
                    />
                    <SconeButton
                        type="button"
                        className="scone-example-advanced-add"
                        variant="outline"
                        onClick={handleAddMember}
                    >
                        添加一行数据
                    </SconeButton>
                </AdvancedSectionCard>
            </div>

            <div className="scone-example-advanced-footer">
                <span className="scone-example-advanced-footer-shadow" aria-hidden="true" />
                <div className="scone-example-advanced-footer-actions">
                    <SconeButton className="scone-example-advanced-reset" variant="secondary">
                        重 置
                    </SconeButton>
                    <SconeButton className="scone-example-advanced-submit">提 交</SconeButton>
                </div>
            </div>
        </SconeForm>
    );
};
