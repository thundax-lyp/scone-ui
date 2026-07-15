import * as React from "react";

import { LibraryExampleLayout, type ExampleTheme } from "../layout/library-example-layout";
import { isExampleKey, pageMeta, renderExample, type ExampleKey } from "../pages/page-registry";
import {
    getActiveMenuOpenKeys,
    getActiveMenuRoot,
    markActiveMenuRoot,
    menuItems,
} from "./navigation";

import "../library-example.css";

export const LibraryExample = (): React.JSX.Element => {
    const [activeKey, setActiveKey] = React.useState<ExampleKey>("analysis");
    const [theme, setTheme] = React.useState<ExampleTheme>("light");
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const activeMeta = pageMeta[activeKey];
    const activeMenuRoot = getActiveMenuRoot(activeKey);
    const activeMenuOpenKeys = getActiveMenuOpenKeys(activeKey);
    const visibleMenuItems = React.useMemo(
        () => markActiveMenuRoot(menuItems, activeMenuRoot),
        [activeMenuRoot],
    );

    return (
        <LibraryExampleLayout
            activeKey={activeKey}
            activeTitle={activeMeta.title}
            theme={theme}
            menuItems={visibleMenuItems}
            selectedKeys={[activeKey]}
            defaultOpenKeys={activeMenuOpenKeys}
            sidebarCollapsed={sidebarCollapsed}
            onThemeChange={setTheme}
            onSidebarCollapsedChange={setSidebarCollapsed}
            onMenuSelect={(key) => {
                if (isExampleKey(key)) {
                    setActiveKey(key);
                }
            }}
        >
            {renderExample(activeKey)}
        </LibraryExampleLayout>
    );
};
