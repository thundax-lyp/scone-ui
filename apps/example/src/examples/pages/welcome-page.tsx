import type * as React from "react";

import { SconeButton, SconeCard, SconeDescriptions } from "scone-ui";

import { SconeAdminLogo } from "../layout/scone-admin-logo";

export const WelcomePage = (): React.JSX.Element => (
    <div className="grid gap-lg xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <SconeCard className="scone-example-hero-card">
            <div className="grid gap-md">
                <SconeAdminLogo size="lg" showWordmark />
                <div>
                    <h2 className="text-2xl font-semibold tracking-normal">
                        像后台产品一样展示组件
                    </h2>
                    <p className="mt-xs max-w-2xl text-sm text-muted-foreground">
                        The example behaves like a small admin console: menu, dashboard, forms,
                        lists, detail, result, exception and account pages.
                    </p>
                </div>
                <div className="flex flex-wrap gap-sm">
                    <SconeButton>查看分析页 / View Analysis</SconeButton>
                    <SconeButton variant="secondary">打开 API Guide / Open Guide</SconeButton>
                </div>
            </div>
        </SconeCard>
        <SconeCard className="scone-example-card">
            <SconeDescriptions
                bordered
                columns={1}
                title="示例边界 / Example boundary"
                items={[
                    { key: "entry", label: "公共入口 / Public entry", value: "scone-ui" },
                    { key: "theme", label: "主题 / Theme", value: "Scoped light and dark tokens" },
                    { key: "business", label: "业务 / Business", value: "No product contracts" },
                ]}
            />
        </SconeCard>
    </div>
);
