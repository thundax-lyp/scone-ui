import type * as React from "react";

import { DataTable, SconeCard, SconeDescriptions } from "scone-ui";

import { familyColumns, familyRows } from "./page-data";

export const BasicProfilePage = (): React.JSX.Element => (
    <div className="grid gap-lg">
        <SconeCard title="组件申请 / Component request" className="scone-example-card">
            <SconeDescriptions
                bordered
                items={[
                    { key: "id", label: "编号 / ID", value: "SCONE-2026-001" },
                    { key: "status", label: "状态 / Status", value: "已评审 / Reviewed" },
                    { key: "owner", label: "负责人 / Owner", value: "Design System" },
                    { key: "entry", label: "入口 / Entry", value: "scone-ui" },
                    { key: "scope", label: "范围 / Scope", value: "Reusable admin UI" },
                    { key: "runtime", label: "运行时 / Runtime", value: "No product API" },
                ]}
            />
        </SconeCard>
        <SconeCard title="退回项 / Returned items" className="scone-example-card">
            <DataTable.TableRegion
                ariaLabel="详情表格 / Profile table"
                columns={familyColumns}
                dataSource={familyRows.slice(0, 3)}
                rowKey="id"
            />
        </SconeCard>
    </div>
);
