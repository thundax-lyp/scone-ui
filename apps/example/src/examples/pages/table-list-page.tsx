import * as React from "react";

import {
    DataTable,
    SconeButton,
    SconeInput,
    SconePagination,
    SconeTable,
    type SconePaginationState,
    type SconeTableColumn,
} from "scone-ui";

import { queryRuleBaseColumns, queryRuleRows } from "./page-data";
import { type QueryRuleRow } from "./page-types";

export const TableListPage = (): React.JSX.Element => {
    const [rows, setRows] = React.useState<QueryRuleRow[]>(queryRuleRows);
    const [pagination, setPagination] = React.useState<SconePaginationState>({
        page: 1,
        pageSize: 5,
        total: queryRuleRows.length,
    });
    const [selectedRuleIds, setSelectedRuleIds] = React.useState<string[]>([]);
    const [nextRuleNumber, setNextRuleNumber] = React.useState(100);
    const pageStart = (pagination.page - 1) * pagination.pageSize;
    const pageRows = rows.slice(pageStart, pageStart + pagination.pageSize);
    const pageRowIds = pageRows.map((row) => row.id);
    const selectedPageIds = pageRowIds.filter((id) => selectedRuleIds.includes(id));
    const allPageRowsSelected =
        pageRowIds.length > 0 && selectedPageIds.length === pageRowIds.length;
    const somePageRowsSelected = selectedPageIds.length > 0 && !allPageRowsSelected;
    const tableColumns = React.useMemo<Array<SconeTableColumn<QueryRuleRow>>>(
        () => [
            {
                key: "selection",
                title: (
                    <input
                        aria-label="选择当前页规则"
                        aria-checked={somePageRowsSelected ? "mixed" : allPageRowsSelected}
                        checked={allPageRowsSelected}
                        type="checkbox"
                        onChange={() => {
                            if (allPageRowsSelected) {
                                setSelectedRuleIds((currentIds) =>
                                    currentIds.filter((id) => !pageRowIds.includes(id)),
                                );
                                return;
                            }

                            setSelectedRuleIds((currentIds) =>
                                Array.from(new Set([...currentIds, ...pageRowIds])),
                            );
                        }}
                    />
                ),
                width: 44,
                render: (_value, record) => (
                    <input
                        aria-label={`选择 ${record.name}`}
                        checked={selectedRuleIds.includes(record.id)}
                        type="checkbox"
                        onChange={() => {
                            setSelectedRuleIds((currentIds) => {
                                if (currentIds.includes(record.id)) {
                                    return currentIds.filter((id) => id !== record.id);
                                }

                                return [...currentIds, record.id];
                            });
                        }}
                    />
                ),
            },
            ...queryRuleBaseColumns,
        ],
        [allPageRowsSelected, pageRowIds, selectedRuleIds, somePageRowsSelected],
    );

    const handlePaginationChange = (nextState: SconePaginationState) => {
        setPagination({
            ...nextState,
            total: rows.length,
        });
    };

    const handleCreateRule = () => {
        const nextRow: QueryRuleRow = {
            id: `trade-${nextRuleNumber}`,
            name: `TradeCode ${nextRuleNumber}`,
            description: "这是一段新增描述",
            callCount: "0万",
            status: "运行中",
            lastScheduledAt: "1970-01-01 00:00:00",
        };

        setRows((currentRows) => [nextRow, ...currentRows]);
        setSelectedRuleIds([]);
        setPagination((currentState) => ({
            ...currentState,
            page: 1,
            total: currentState.total + 1,
        }));
        setNextRuleNumber((currentNumber) => currentNumber + 1);
    };

    return (
        <div className="scone-example-table-list-page">
            <div className="scone-example-table-list-header">
                <div className="scone-example-table-list-breadcrumb">列表页 / 查询表格</div>
                <h2>查询表格</h2>
            </div>
            <DataTable.Root className="scone-example-table-list">
                <DataTable.FilterBar
                    className="scone-example-table-list-filter"
                    onApply={() => undefined}
                >
                    <div className="scone-example-table-list-filter-row">
                        <label className="scone-example-table-list-field">
                            <span>规则名称:</span>
                            <SconeInput defaultValue="" placeholder="请输入" />
                        </label>
                        <label className="scone-example-table-list-field">
                            <span>描述:</span>
                            <SconeInput defaultValue="" placeholder="请输入" />
                        </label>
                        <div className="scone-example-table-list-filter-actions">
                            <SconeButton
                                className="scone-example-table-list-reset"
                                variant="outline"
                            >
                                重 置
                            </SconeButton>
                            <SconeButton className="scone-example-table-list-submit">
                                查 询
                            </SconeButton>
                            <SconeButton
                                className="scone-example-table-list-expand"
                                variant="ghost"
                            >
                                展开
                            </SconeButton>
                        </div>
                    </div>
                </DataTable.FilterBar>
                <div className="scone-example-table-list-card">
                    <DataTable.Toolbar
                        className="scone-example-table-list-toolbar"
                        title="查询表格"
                        actions={[{ key: "new", label: "新建", onClick: handleCreateRule }]}
                    />
                    <SconeTable
                        ariaLabel="查询表格"
                        columns={tableColumns}
                        dataSource={pageRows}
                        rowKey="id"
                        scroll={{ x: 960 }}
                    />
                    <div data-scone-data-table-part="pagination" className="flex justify-end">
                        <SconePagination
                            state={pagination}
                            pageSizeOptions={[5, 10]}
                            onChange={handlePaginationChange}
                        />
                    </div>
                </div>
            </DataTable.Root>
        </div>
    );
};
