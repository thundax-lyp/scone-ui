---
title: AI 使用指南
sidebar_position: 2
---

# AI 使用指南

这是站点版 AI 使用规则。代码生成的权威仍是当前安装包：

1. `scone-ui/dist/index.d.ts`
2. `scone-ui/PACKAGE-AI-GUIDE.md`

如果本站、README、AI Guide 与 `dist/index.d.ts` 不一致，以当前安装包的 `dist/index.d.ts` 为准。

## 包定位

`scone-ui` 是后台 UI 组件库。把它当作可复用组件包，不要当作应用框架、路由框架、请求层或业务规则来源。

## 公共 API 形态

| 形态         | 示例                                                      | 使用规则                                                       |
| ------------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| 基础组件     | `SconeButton`、`SconeSelect`、`SconeTable`                | 组件名以 `Scone*` 为主，从 `"scone-ui"` 导入。                 |
| 后台 Pattern | `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`   | 使用命名空间对象，例如 `Page.Root`、`DataTable.TableRegion`。  |
| 反馈服务     | `toast`、`notification`                                   | 必须配套 `SconeToastProvider` 或 `SconeNotificationProvider`。 |
| 公共工具     | `cn`、`composeRefs`、`useControllableState`、ARIA helpers | 只在 wrapper 或库内组合需要时使用。                            |

## 代码生成规则

1. 所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入。
2. 包样式只在应用入口或组件预览入口引入一次：`import "scone-ui/styles.css";`。
3. 存在匹配的 `Scone*` 组件时优先使用组件库，不要先写原生 HTML。
4. 后台页面优先使用 `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`。
5. 封装组件时使用公共 props 类型，例如 `SconeButtonProps`。
6. 发明 props、事件名、枚举值或 compound component parts 前，必须读取 `dist/index.d.ts`。
7. 请求、路由、权限、mutation、校验 schema 和产品文案必须留在目标应用中。
8. 不要使用包内部路径、源码 alias、shadcn primitive 路径或未文档化子路径。
9. 不要发明新的导出名，例如不存在的 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid`。
10. 不要依赖仓库内部规格、设计文档、RUNBOOK、TODO、PR 记录或源码路径生成调用方代码。

## 样式和主题

`scone-ui/styles.css` 是零配置样式入口，已包含默认主题变量、组件样式、Tailwind bridge、shadcn 动画支持和字体导入。普通应用只导入这一项。

公开 CSS 入口：

| 入口                         | 用途                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `scone-ui/styles.css`        | 推荐入口。完整组件库样式，包含默认 theme。                                      |
| `scone-ui/default.theme.css` | 默认 token 文件。用于主题审阅、单独对比或高级构建拆分。普通应用不需要额外导入。 |
| `scone-ui/styles/theme.css`  | 兼容入口，转发默认 theme。新代码不要优先使用。                                  |

调用方覆盖主题时，必须在 `scone-ui/styles.css` 之后声明 token：

```css
@import "scone-ui/styles.css";

:root {
    --scone-color-primary: #1677ff;
    --scone-color-success: #52c41a;
}

.dark,
[data-theme="dark"] {
    --scone-color-primary: #69b1ff;
}
```

不要在普通应用中同时导入 `scone-ui/styles.css` 和 `scone-ui/default.theme.css`，因为 `styles.css` 已包含默认 theme。示例站 CSS 只服务在线 example 页面布局和演示视觉，不是发布包样式入口。

## Props 规则

具体字段以 `dist/index.d.ts` 为准。AI 不确定时必须读取公共 props type，不要套用其他库或原生元素的字段。

| 字段                     | 约定                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| `size`                   | 控件尺寸，通常是 `sm`、`md`、`lg`。                                |
| `density`                | 数据展示密度，通常是 `compact`、`default`、`comfortable`。         |
| `tone`                   | 语义色，通常是 `neutral`、`info`、`success`、`warning`、`danger`。 |
| `value` / `defaultValue` | 受控/非受控值。不要同时依赖二者作为单一真相。                      |
| `onValueChange`          | 组件值变化回调。不要猜成 `onChange`，除非 `.d.ts` 明确写出。       |
| `ariaLabel`              | 包装组件提供的人类可读标签字段，内部映射到 `aria-label`。          |
| `className`              | 作用在公共组件 root。不要依赖内部 DOM 结构选择器。                 |

## 最小提示词

```text
Use scone-ui as an installed React component package.
Import CSS once: import "scone-ui/styles.css".
Import every component, pattern, service, hook, helper, and type from "scone-ui".
Public components are Scone-prefixed.
Admin Patterns are AppShell, Page, Section, FilterBar, and DataTable.
Use Scone*Props public types when wrapping components.
For exact props and event names, read scone-ui/dist/index.d.ts first.
Do not import from scone-ui/components/ui, src paths, @/components/ui, shadcn/ui, or undocumented subpaths.
Do not import scone-ui/default.theme.css together with scone-ui/styles.css in ordinary apps; styles.css already includes the default theme.
Do not invent SconeDrawerForm, SconePopover, SconeLogo, SconeResult, SconeGrid, or other recipe names as public APIs.
```
