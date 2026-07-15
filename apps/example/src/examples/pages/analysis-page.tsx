import * as React from "react";

import { DataTable, SconeBadge, SconeCard, SconeList, SconeProgress, SconeTabs } from "scone-ui";

import { componentInventoryRows, familyColumns, familyRows } from "./page-data";
import { ExampleChart, ExampleSparkline, MetricCard } from "./page-widgets";

export const AnalysisPage = (): React.JSX.Element => {
    const pageSize = 5;
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageCount = Math.ceil(componentInventoryRows.length / pageSize);
    const pageRows = componentInventoryRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-4">
                <MetricCard
                    title="总组件数 / Components"
                    value="42"
                    description="周同比 12% / WoW 12%"
                >
                    <ExampleSparkline />
                </MetricCard>
                <MetricCard
                    title="访问量 / Visits"
                    value="8,846"
                    description="日访问量 1,234"
                    tone="info"
                >
                    <ExampleSparkline />
                </MetricCard>
                <MetricCard
                    title="测试覆盖 / Tests"
                    value="293"
                    description="69 files passed"
                    tone="success"
                >
                    <ExampleChart compact />
                </MetricCard>
                <MetricCard
                    title="活跃效果 / Activity"
                    value="78%"
                    description="同比 12% / 环比 11%"
                    tone="warning"
                >
                    <SconeProgress value={78} showLabel />
                </MetricCard>
            </div>

            <SconeCard className="scone-example-card scone-example-analysis-card">
                <div className="scone-example-analysis-tabs">
                    <SconeTabs
                        ariaLabel="Trend tabs"
                        items={[
                            {
                                value: "components",
                                label: "组件 / Components",
                                content: null,
                            },
                            {
                                value: "visits",
                                label: "访问 / Visits",
                                content: null,
                            },
                        ]}
                    />
                    <div className="scone-example-analysis-filter" aria-hidden="true">
                        <span>今日</span>
                        <span>本周</span>
                        <span>本月</span>
                        <span>本年</span>
                    </div>
                </div>
                <div className="scone-example-analysis-content">
                    <div>
                        <ExampleChart />
                    </div>
                    <div className="scone-example-ranking">
                        <h2>组件热度排行 / Ranking</h2>
                        <SconeList
                            dataSource={familyRows.map((item, index) => ({
                                ...item,
                                rank: index + 1,
                            }))}
                            rowKey="id"
                            renderItem={(item) => (
                                <div className="flex items-center justify-between gap-sm">
                                    <div className="flex min-w-0 items-center gap-sm">
                                        <span className="scone-example-rank-index">
                                            {item.rank}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="font-medium text-foreground">
                                                {item.component}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {item.family}
                                            </div>
                                        </div>
                                    </div>
                                    <SconeBadge
                                        count={item.status}
                                        tone={item.status === "Stable" ? "success" : "warning"}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </SconeCard>

            <DataTable.Root>
                <DataTable.FilterBar
                    defaultSearchValue=""
                    searchPlaceholder="搜索组件 / Search components"
                    onApply={() => undefined}
                />
                <DataTable.Toolbar title="组件清单 / Component Inventory" />
                <DataTable.TableRegion
                    ariaLabel="组件发布队列 / Component release queue"
                    columns={familyColumns}
                    dataSource={pageRows}
                    rowKey="id"
                />
                <nav className="scone-example-pagination" aria-label="组件清单分页">
                    <span>
                        第 {currentPage} 页 / 共 {pageCount} 页
                    </span>
                    <div className="scone-example-pagination-controls">
                        <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        >
                            上一页
                        </button>
                        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                aria-current={page === currentPage ? "page" : undefined}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            disabled={currentPage >= pageCount}
                            onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                        >
                            下一页
                        </button>
                    </div>
                </nav>
            </DataTable.Root>
        </div>
    );
};
