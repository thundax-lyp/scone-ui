import { CheckCircle2Icon, SunIcon } from "lucide-react";
import type * as React from "react";

import { SconeAlert, SconeCard, SconeLoading, SconeProgress, SconeTimeline } from "scone-ui";

export const MonitorPage = (): React.JSX.Element => (
    <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-md">
            <SconeAlert
                tone="info"
                title="监控状态 / Monitor state"
                description="Status surfaces use existing tone tokens and stay scoped to reusable UI behavior."
            />
            <SconeCard title="运行指标 / Runtime metrics" className="scone-example-card">
                <div className="grid gap-md">
                    <SconeProgress value={88} showLabel label="构建稳定性 / Build stability" />
                    <SconeProgress
                        value={64}
                        showLabel
                        label="文档覆盖 / Docs coverage"
                        status="active"
                    />
                    <SconeProgress
                        value={24}
                        showLabel
                        label="待审示例 / Review queue"
                        status="idle"
                    />
                </div>
            </SconeCard>
            <SconeLoading type="skeleton" />
        </div>
        <SconeCard title="事件流 / Event stream" className="scone-example-card">
            <SconeTimeline
                items={[
                    {
                        key: "lint",
                        title: "Lint passed",
                        description: "No rule violations in example source.",
                        time: "09:30",
                        tone: "success",
                        icon: <CheckCircle2Icon className="size-3" />,
                    },
                    {
                        key: "theme",
                        title: "Theme checked",
                        description:
                            "Light and dark scoped variables render without global mutation.",
                        time: "10:10",
                        tone: "info",
                        icon: <SunIcon className="size-3" />,
                    },
                    {
                        key: "qa",
                        title: "Browser QA",
                        description:
                            "Desktop and mobile screenshots are part of the verification loop.",
                        time: "10:40",
                        tone: "warning",
                    },
                ]}
                pending="Full package check"
            />
        </SconeCard>
    </div>
);
