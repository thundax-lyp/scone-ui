import type * as React from "react";

import { SconeCard, SconeStatistic } from "scone-ui";

const realtimeStats = [
    { title: "今日交易总额", value: "124,543,233", suffix: "元" },
    { title: "销售目标完成率", value: "92", suffix: "%" },
    { title: "活动剩余时间", value: "48:32:10", suffix: "" },
    { title: "每秒交易总额", value: "234", suffix: "元" },
];

const activeData = [18, 36, 48, 42, 72, 86, 70, 94, 118, 108, 132, 148, 140, 168, 156, 182];

const mapPoints = [
    { x: 22, y: 38, size: 42, tone: "blue" },
    { x: 34, y: 55, size: 28, tone: "cyan" },
    { x: 48, y: 44, size: 52, tone: "violet" },
    { x: 61, y: 58, size: 34, tone: "blue" },
    { x: 72, y: 36, size: 46, tone: "violet" },
    { x: 82, y: 50, size: 24, tone: "cyan" },
];

const categoryRatios = [
    { label: "家用电器", value: 75, color: "#1677ff" },
    { label: "食用酒水", value: 48, color: "#52c41a" },
    { label: "个护健康", value: 33, color: "#faad14" },
];

const hotWords = [
    "Scone UI",
    "AppShell",
    "数据中台",
    "活动",
    "监控",
    "实时",
    "订单",
    "转化",
    "流量",
    "券核销",
    "运营",
    "趋势",
];

const MonitorMap = (): React.JSX.Element => (
    <div className="scone-monitor-map" aria-label="实时交易分布图">
        <div className="scone-monitor-map-grid" />
        {mapPoints.map((point) => (
            <span
                key={`${point.x}-${point.y}`}
                className="scone-monitor-map-point"
                data-tone={point.tone}
                style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: point.size,
                    height: point.size,
                }}
            />
        ))}
    </div>
);

const ActiveChart = (): React.JSX.Element => {
    const max = Math.max(...activeData);

    return (
        <div className="scone-monitor-active-chart">
            <SconeStatistic title="目标评估" value="有望达到预期" />
            <div className="scone-monitor-area-chart" aria-label="活动情况预测趋势">
                {activeData.map((value, index) => (
                    <span
                        key={`${value}-${index}`}
                        style={{ height: `${Math.max(14, (value / max) * 84)}%` }}
                    />
                ))}
                <div className="scone-monitor-dashed-line" />
                <div className="scone-monitor-dashed-line" />
            </div>
            <div className="scone-monitor-chart-legend">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:00</span>
            </div>
        </div>
    );
};

const Gauge = (): React.JSX.Element => (
    <div className="scone-monitor-gauge" aria-label="券核效率 80%">
        <div className="scone-monitor-gauge-ring">
            <span>优</span>
        </div>
    </div>
);

const DashboardProgress = ({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: string;
}): React.JSX.Element => (
    <div
        className="scone-monitor-dashboard-progress"
        style={{ "--monitor-progress": color } as React.CSSProperties}
    >
        <div
            className="scone-monitor-dashboard-ring"
            style={{ "--monitor-value": `${value}%` } as React.CSSProperties}
        >
            <span>{value}%</span>
        </div>
        <div>{label}</div>
    </div>
);

export const MonitorPage = (): React.JSX.Element => (
    <div className="scone-monitor-page">
        <div className="scone-monitor-row scone-monitor-row-top">
            <SconeCard
                title="活动实时交易情况"
                variant="plain"
                className="scone-monitor-card scone-monitor-realtime-card"
            >
                <div className="scone-monitor-stats">
                    {realtimeStats.map((item) => (
                        <SconeStatistic
                            key={item.title}
                            title={item.title}
                            value={item.value}
                            suffix={item.suffix || undefined}
                            className="scone-monitor-stat"
                        />
                    ))}
                </div>
                <MonitorMap />
            </SconeCard>

            <div className="scone-monitor-side-stack">
                <SconeCard
                    title="活动情况预测"
                    variant="plain"
                    className="scone-monitor-card scone-monitor-forecast-card"
                >
                    <ActiveChart />
                </SconeCard>
                <SconeCard
                    title="券核效率"
                    variant="plain"
                    className="scone-monitor-card scone-monitor-gauge-card"
                >
                    <Gauge />
                </SconeCard>
            </div>
        </div>

        <div className="scone-monitor-row scone-monitor-row-bottom">
            <SconeCard title="各品类占比" variant="plain" className="scone-monitor-card">
                <div className="scone-monitor-category-grid">
                    {categoryRatios.map((item) => (
                        <DashboardProgress key={item.label} {...item} />
                    ))}
                </div>
            </SconeCard>

            <SconeCard title="热门搜索" variant="plain" className="scone-monitor-card">
                <div className="scone-monitor-word-cloud">
                    {hotWords.map((word, index) => (
                        <span key={word} data-weight={(index % 4) + 1}>
                            {word}
                        </span>
                    ))}
                </div>
            </SconeCard>

            <SconeCard title="资源剩余" variant="plain" className="scone-monitor-card">
                <div className="scone-monitor-liquid" aria-label="资源剩余 35%">
                    <div />
                    <span>35%</span>
                </div>
            </SconeCard>
        </div>
    </div>
);
