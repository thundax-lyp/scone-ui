import type * as React from "react";

import { SconeCard, SconeCommand, SconeSearchInput, SconeTree } from "scone-ui";

import { SconeAdminLogo } from "../layout/scone-admin-logo";
import { treeData } from "./page-data";

export const AccountPage = (): React.JSX.Element => (
    <div className="grid gap-lg xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <SconeCard className="scone-example-card">
            <div className="grid justify-items-center gap-sm text-center">
                <SconeAdminLogo size="lg" />
                <div>
                    <div className="font-semibold">组件维护者 / Maintainer</div>
                    <div className="text-sm text-muted-foreground">scone-ui admin example</div>
                </div>
            </div>
        </SconeCard>
        <SconeCard title="账户设置 / Account settings" className="scone-example-card">
            <div className="grid gap-md">
                <SconeSearchInput
                    ariaLabel="Search settings"
                    placeholder="搜索设置 / Search settings"
                />
                <SconeCommand
                    placeholder="搜索菜单 / Search menu"
                    items={[
                        { key: "theme", label: "主题偏好 / Theme preference", value: "theme" },
                        { key: "language", label: "双语菜单 / Bilingual menu", value: "language" },
                        { key: "docs", label: "文档入口 / Docs entry", value: "docs" },
                    ]}
                />
                <SconeTree
                    checkable
                    ariaLabel="设置树 / Settings tree"
                    treeData={treeData}
                    defaultExpandedKeys={["component-library", "patterns"]}
                    defaultCheckedKeys={["forms"]}
                />
            </div>
        </SconeCard>
    </div>
);
