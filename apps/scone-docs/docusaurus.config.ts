import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions } from "@docusaurus/preset-classic";

const config: Config = {
    title: "Scone UI Docs",
    tagline: "后台组件库帮助文档",
    favicon: "img/favicon.ico",
    url: "https://scone-ui.github.io",
    baseUrl: "/scone-ui/",
    organizationName: "scone-ui",
    projectName: "scone-ui",
    onBrokenLinks: "throw",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
    i18n: {
        defaultLocale: "zh-CN",
        locales: ["zh-CN"],
    },
    presets: [
        [
            "classic",
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.ts",
                    editUrl: "https://github.com/scone-ui/scone-ui/tree/main/apps/scone-docs/",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies PresetOptions,
        ],
    ],
    themeConfig: {
        navbar: {
            title: "Scone UI",
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docsSidebar",
                    position: "left",
                    label: "文档",
                },
                {
                    href: "https://scone-ui.github.io/scone-ui/example/",
                    label: "示例",
                    position: "left",
                },
                {
                    href: "https://github.com/scone-ui/scone-ui",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "文档",
                    items: [
                        {
                            label: "快速开始",
                            to: "/guide/quick-start",
                        },
                        {
                            label: "组件总览",
                            to: "/components/overview",
                        },
                    ],
                },
                {
                    title: "资源",
                    items: [
                        {
                            label: "示例站",
                            href: "https://scone-ui.github.io/scone-ui/example/",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/scone-ui/scone-ui",
                        },
                    ],
                },
            ],
            copyright: "Copyright © 2026 Scone UI.",
        },
        prism: {
            theme: {
                plain: {
                    color: "#1f2937",
                    backgroundColor: "#f8fafc",
                },
                styles: [],
            },
            darkTheme: {
                plain: {
                    color: "#f8fafc",
                    backgroundColor: "#111827",
                },
                styles: [],
            },
        },
    },
};

export default config;
