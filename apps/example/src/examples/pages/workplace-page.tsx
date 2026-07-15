import type * as React from "react";

import { Section, SconeButton, SconeCard, SconeStatistic, SconeTag } from "scone-ui";

import { SconeAdminLogo } from "../layout/scone-admin-logo";
import { familyRows } from "./page-data";

export const WorkplacePage = (): React.JSX.Element => (
    <div className="grid gap-lg xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <div className="grid gap-md">
            <SconeCard className="scone-example-card">
                <div className="flex flex-wrap items-center justify-between gap-md">
                    <div className="flex items-center gap-md">
                        <SconeAdminLogo size="md" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                早安，组件维护者 / Good morning
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                这是一个用于组件库演示的工作台，不包含产品业务流。
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-md text-center">
                        <SconeStatistic title="项目 / Projects" value="12" />
                        <SconeStatistic title="排名 / Rank" value="8/24" />
                        <SconeStatistic title="访问 / Visits" value="2,223" />
                    </div>
                </div>
            </SconeCard>
            <Section.Root title="进行中的项目 / Active projects">
                <Section.Content>
                    <div className="grid gap-md md:grid-cols-2">
                        {familyRows.slice(0, 4).map((item) => (
                            <SconeCard
                                key={item.id}
                                title={item.component}
                                description={item.purpose}
                                footer={<SconeTag tone="info">{item.owner}</SconeTag>}
                                className="scone-example-card"
                            />
                        ))}
                    </div>
                </Section.Content>
            </Section.Root>
        </div>
        <SconeCard title="快捷开始 / Quick start" className="scone-example-card">
            <div className="grid gap-sm">
                <SconeButton variant="secondary">新增组件 / Add component</SconeButton>
                <SconeButton variant="secondary">生成清单 / Generate inventory</SconeButton>
                <SconeButton variant="secondary">打开规范 / Open specs</SconeButton>
            </div>
        </SconeCard>
    </div>
);
