import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LibraryExampleLayout, type ExampleTheme } from "../layout/library-example-layout";
import {
    defaultExampleRoute,
    getExampleKeyFromPath,
    getExampleRoute,
    isExampleKey,
    pageMeta,
    renderExample,
} from "../pages/page-registry";
import {
    getActiveMenuOpenKeys,
    getActiveMenuRoot,
    markActiveMenuRoot,
    menuItems,
} from "./navigation";

import "../library-example.css";

export const LibraryExample = (): React.JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const activeKey = getExampleKeyFromPath(location.pathname) ?? "analysis";
    const [theme, setTheme] = React.useState<ExampleTheme>("light");
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [userOpenKeys, setUserOpenKeys] = React.useState<string[]>([]);
    const activeMeta = pageMeta[activeKey];
    const activeMenuRoot = getActiveMenuRoot(activeKey);
    const activeMenuOpenKeys = React.useMemo(() => getActiveMenuOpenKeys(activeKey), [activeKey]);
    const openKeys = React.useMemo(
        () => Array.from(new Set([...userOpenKeys, ...activeMenuOpenKeys])),
        [activeMenuOpenKeys, userOpenKeys],
    );
    const visibleMenuItems = React.useMemo(
        () => markActiveMenuRoot(menuItems, activeMenuRoot),
        [activeMenuRoot],
    );

    React.useEffect(() => {
        if (getExampleKeyFromPath(location.pathname)) {
            return;
        }
        navigate(defaultExampleRoute, { replace: true });
    }, [location.pathname, navigate]);

    return (
        <LibraryExampleLayout
            activeKey={activeKey}
            activeTitle={activeMeta.title}
            theme={theme}
            menuItems={visibleMenuItems}
            selectedKeys={[activeKey]}
            openKeys={openKeys}
            sidebarCollapsed={sidebarCollapsed}
            onThemeChange={setTheme}
            onSidebarCollapsedChange={setSidebarCollapsed}
            onMenuOpenChange={setUserOpenKeys}
            onMenuSelect={(key) => {
                if (isExampleKey(key)) {
                    navigate(getExampleRoute(key));
                }
            }}
        >
            {renderExample(activeKey)}
        </LibraryExampleLayout>
    );
};
