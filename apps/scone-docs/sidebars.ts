import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docsSidebar: [
        "index",
        {
            type: "category",
            label: "指南",
            items: ["guide/quick-start"],
        },
        {
            type: "category",
            label: "组件",
            items: ["components/overview"],
        },
    ],
};

export default sidebars;
