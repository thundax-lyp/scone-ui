import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions } from "@docusaurus/preset-classic";

const publicLinks = {
    docs: "https://thundax-lyp.github.io/scone-ui/docs/",
    example: "https://thundax-lyp.github.io/scone-ui/example/",
    github: "https://github.com/thundax-lyp/scone-ui",
    npm: "https://www.npmjs.com/package/scone-ui",
} as const;

const config: Config = {
    title: "Scone UI Docs",
    tagline: "后台组件库帮助文档",
    favicon: "img/favicon.ico",
    url: "https://thundax-lyp.github.io",
    baseUrl: "/scone-ui/docs/",
    organizationName: "thundax-lyp",
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
                    editUrl: "https://github.com/thundax-lyp/scone-ui/tree/main/apps/scone-docs/",
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
                    href: publicLinks.example,
                    label: "示例",
                    position: "left",
                },
                {
                    href: publicLinks.github,
                    label: "GitHub",
                    position: "right",
                },
                {
                    href: publicLinks.npm,
                    label: "npm",
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
                            href: publicLinks.example,
                        },
                        {
                            label: "文档站",
                            href: publicLinks.docs,
                        },
                        {
                            label: "GitHub",
                            href: publicLinks.github,
                        },
                        {
                            label: "npm",
                            href: publicLinks.npm,
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
