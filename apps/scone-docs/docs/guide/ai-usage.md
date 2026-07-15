---
title: AI 使用指南
sidebar_position: 2
---

# AI 使用指南

本文是 `scone-docs` 对随包文档 `scone-ui/PACKAGE-AI-GUIDE.md` 的站点版说明。真正用于代码生成的权威仍是当前安装包：

1. `scone-ui/dist/index.d.ts`
2. `scone-ui/PACKAGE-AI-GUIDE.md`

当本站、README、AI Guide 与 `dist/index.d.ts` 不一致时，以当前安装包的 `dist/index.d.ts` 为准。

## 包定位

`scone-ui` 是 React + Tailwind CSS 的后台 UI 组件库。AI 必须把它当作可复用组件包，而不是产品应用框架、路由框架、请求层或业务规则来源。

## 公共 API 形态

| 形态 | 示例 | 使用规则 |
| --- | --- | --- |
| 基础组件 | `SconeButton`、`SconeSelect`、`SconeTable` | 组件名以 `Scone*` 为主，从 `"scone-ui"` 导入。 |
| 后台 Pattern | `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` | 使用命名空间对象，例如 `Page.Root`、`DataTable.TableRegion`。 |
| 反馈服务 | `toast`、`notification` | 必须配套 `SconeToastProvider` 或 `SconeNotificationProvider`。 |
| 公共工具 | `cn`、`composeRefs`、`useControllableState`、ARIA helpers | 只在 wrapper 或库内组合需要时使用。 |

## 生成规则

1. 所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入。
2. 包样式只在应用入口或组件预览入口引入一次：`import "scone-ui/styles.css";`。
3. 存在匹配的 `Scone*` 组件时，优先使用 `Scone*`，不要先写原生 HTML。
4. 后台页面优先使用 `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`。
5. 封装组件时使用公共 props 类型，例如 `SconeButtonProps`。
6. 发明 props、事件名、枚举值或 compound component parts 前，必须读取 `dist/index.d.ts`。
7. 请求、路由、权限、mutation、校验 schema 和产品文案必须留在目标应用中。
8. 不要使用包内部路径、源码 alias、shadcn primitive 路径或未文档化子路径。
9. 不要发明新的导出名，例如不存在的 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid`。
10. 不要依赖仓库内部 specs、设计文档、RUNBOOK、TODO、PR 记录或源码路径生成调用方代码。

## Props 规则

具体字段以 `dist/index.d.ts` 为准。AI 不确定时必须读取公共 props type，不要猜 Ant Design、shadcn、HTML 或 Radix 的字段。

| 字段 | 约定 |
| --- | --- |
| `size` | 控件尺寸，通常是 `sm`、`md`、`lg`。 |
| `density` | 数据展示密度，通常是 `compact`、`default`、`comfortable`。 |
| `tone` | 语义色，通常是 `neutral`、`info`、`success`、`warning`、`danger`。 |
| `value` / `defaultValue` | 受控/非受控值。不要同时依赖二者作为单一真相。 |
| `onValueChange` | 组件值变化回调。不要猜成 `onChange`，除非 `.d.ts` 明确写出。 |
| `ariaLabel` | 包装组件提供的人类可读标签字段，内部映射到 `aria-label`。 |
| `className` | 作用在公共组件 root。不要依赖内部 DOM 结构选择器。 |

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
Do not invent SconeDrawerForm, SconePopover, SconeLogo, SconeResult, SconeGrid, or other recipe names as public APIs.
```
