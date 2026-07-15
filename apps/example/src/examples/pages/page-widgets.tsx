import type * as React from "react";

import { SconeCard, SconeStatistic } from "scone-ui";

import { type MetricCardProps } from "./page-types";

export const MetricCard = ({
    title,
    value,
    description,
    tone = "neutral",
    children,
}: MetricCardProps): React.JSX.Element => (
    <SconeCard className="scone-example-card scone-example-metric-card">
        <div className="grid h-full content-between gap-sm">
            <div className="scone-example-metric-title">{title}</div>
            <SconeStatistic
                className="scone-example-statistic"
                title={title}
                value={value}
                description={description}
                tone={tone}
            />
            {children}
        </div>
    </SconeCard>
);

export const ExampleChart = ({ compact = false }: { compact?: boolean }): React.JSX.Element => (
    <div
        className={
            compact ? "scone-example-bars scone-example-bars--compact" : "scone-example-bars"
        }
    >
        {[74, 52, 36, 92, 78, 89, 72, 96, 76, 43, 73, 68].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
        ))}
    </div>
);

export const ExampleSparkline = (): React.JSX.Element => (
    <div className="scone-example-sparkline" aria-hidden="true">
        {[28, 48, 36, 72, 54, 88, 44, 68].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
        ))}
    </div>
);
