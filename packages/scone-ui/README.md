# scone-ui

React + Tailwind CSS admin UI component library.

[![npm version](https://img.shields.io/npm/v/scone-ui.svg)](https://www.npmjs.com/package/scone-ui)
[![npm downloads](https://img.shields.io/npm/dm/scone-ui.svg)](https://www.npmjs.com/package/scone-ui)
[![License](https://img.shields.io/npm/l/scone-ui.svg)](https://github.com/thundax-lyp/scone-ui/blob/main/LICENSE)
[![Docs](https://img.shields.io/badge/docs-scone--ui-1677ff.svg)](https://thundax-lyp.github.io/scone-ui/docs/)
[![Example](https://img.shields.io/badge/example-online-52c41a.svg)](https://thundax-lyp.github.io/scone-ui/example/)

[Docs](https://thundax-lyp.github.io/scone-ui/docs/) · [Example](https://thundax-lyp.github.io/scone-ui/example/) · [GitHub](https://github.com/thundax-lyp/scone-ui) · [npm](https://www.npmjs.com/package/scone-ui)

本文档是随 `scone-ui` 发布包分发的独立 AI 入口文档，仅用于指导 AI、IDE Agent 和代码生成器理解并使用本包。

`scone-ui` 是面向后台管理界面的 React + Tailwind CSS 组件库。它提供可复用的表单、数据展示、布局、反馈浮层、导航、媒体组件，以及后台页面 Pattern。

AI 必须把 `scone-ui` 当作组件包使用，而不是应用框架。路由、请求、权限、校验 schema、业务字段规则和产品文案都应留在调用方应用中。

## AI 使用目标

AI 读取本文档后，应能完成以下任务：

- 安装并引入 `scone-ui`。
- 只从公共包入口导入组件和类型。
- 根据界面需求选择正确的 `Scone*` 组件或后台 Pattern。
- 在不猜测 props 的情况下，定位当前安装包的类型权威。
- 避免导入内部 shadcn/Radix primitive、源码路径或未导出的子路径。

## 安装

```sh
pnpm add scone-ui
```

`react` 和 `react-dom` 是 peer dependencies：

```sh
pnpm add react react-dom
```

## 公开入口

- 文档地址：[https://thundax-lyp.github.io/scone-ui/docs/](https://thundax-lyp.github.io/scone-ui/docs/)
- 示例地址：[https://thundax-lyp.github.io/scone-ui/example/](https://thundax-lyp.github.io/scone-ui/example/)
- GitHub 代码地址：[https://github.com/thundax-lyp/scone-ui](https://github.com/thundax-lyp/scone-ui)
- npm 地址：[https://www.npmjs.com/package/scone-ui](https://www.npmjs.com/package/scone-ui)

## 样式

AI 生成调用方代码时，应在应用入口或组件预览入口引入一次包样式：

```tsx
import "scone-ui/styles.css";
```

`styles.css` 包含组件所需的主题变量、Tailwind 配置入口、shadcn 动画支持和 Geist 字体导入。不要在业务组件中重复引入该样式。

## 快速使用

下面示例展示推荐导入方式和基础表单组合方式：

```tsx
import "scone-ui/styles.css";

import { SconeButton, SconeField, SconeForm, SconeInput } from "scone-ui";

export function AccountForm() {
    return (
        <SconeForm onSubmit={(event) => event.preventDefault()}>
            <SconeField.Root name="email" required>
                <SconeField.Label>Email</SconeField.Label>
                <SconeField.Control>
                    <SconeInput type="email" ariaLabel="Email" />
                </SconeField.Control>
                <SconeField.Message />
            </SconeField.Root>
            <SconeButton type="submit">Save</SconeButton>
        </SconeForm>
    );
}
```

## 导入规则

AI 只能从包根入口导入公共组件、Pattern、service、hook、helper 和类型：

```tsx
import { DataTable, SconeButton, SconeDrawer, SconeTable } from "scone-ui";
import type { SconeButtonProps, SconeTableColumn } from "scone-ui";
```

AI 不得导入内部 shadcn/Radix primitive、源码路径或未导出的子路径：

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
import { Button } from "shadcn/ui";
```

## AI 读取顺序

AI、IDE Agent 或代码生成器必须按此顺序理解本包：

1. `scone-ui/dist/index.d.ts`：当前安装版本的 props、类型和导出权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界、wrapper 规则和 AI 生成规则。

当 README 或 AI Guide 与 `dist/index.d.ts` 不一致时，必须以当前安装包的 `dist/index.d.ts` 为准。

## 组件选择

AI 生成界面代码时，先按需求选择下表中的公共 API，不要先拼装底层 HTML 或内部 primitive。

| 需求                         | 优先使用                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| 普通按钮、提交按钮、加载按钮 | `SconeButton`                                                                        |
| 文本、数字、密码、搜索输入   | `SconeInput`、`SconeNumberInput`、`SconePasswordInput`、`SconeSearchInput`           |
| 下拉、组合搜索、单选、多选   | `SconeSelect`、`SconeCombobox`、`SconeRadioGroup`、`SconeCheckbox`                   |
| 表单结构                     | `SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` |
| 基础表格                     | `SconeTable`                                                                         |
| 管理页数据表、筛选、批量操作 | `DataTable` Pattern                                                                  |
| 页面骨架                     | `AppShell`、`Page`、`Section`                                                        |
| 筛选区域                     | `FilterBar` Pattern                                                                  |
| 详情字段列表                 | `SconeDescriptions`                                                                  |
| 弹窗确认                     | `SconeConfirm`                                                                       |
| 长表单编辑                   | `SconeDrawer` + form components                                                      |
| 空、错、加载、进度           | `SconeEmpty`、`SconeAlert`、`SconeLoading`、`SconeProgress`                          |
| 全局提示                     | `SconeToastProvider` + `toast`、`SconeNotificationProvider` + `notification`         |

## 公共 API 分组

- 表单：`SconeButton`、`SconeInput`、`SconeSelect`、`SconeCheckbox`、`SconeRadioGroup`、`SconeForm`、`SconeField` 及相关控件。
- 数据展示：`SconeTable`、`SconeDescriptions`、`SconeCard`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`、Typography 组件。
- 布局：`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeScrollArea`、`SconeSeparator`、`SconeSplitPane`。
- 反馈和浮层：`SconeAlert`、`SconeDialog`、`SconeDrawer`、`SconeConfirm`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- 导航和媒体：`SconeTabs`、`SconeDropdown`、`SconeMenu`、`SconeBreadcrumb`、`SconePagination`、`SconeTree`、`SconeCommand`、`SconeTooltip`、`SconeAvatar`、`SconeImage`。
- 后台 Pattern：`AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`。

精确 props、事件名、类型泛型和 compound component parts 必须以 `dist/index.d.ts` 为准。

## 包内 AI 文档

发布包只保证以下 AI 文档入口可用：

- `scone-ui/PACKAGE-AI-GUIDE.md`：面向 AI 的独立使用指南。

仓库内部 specs、设计文档、RUNBOOK、TODO、PR 记录和源码路径不是发布包 API，AI 不应依赖它们生成调用方代码。

## 包导出

- `scone-ui`：JS/CJS runtime 和 TypeScript declarations。
- `scone-ui/styles.css`：组件样式入口。
- `scone-ui/PACKAGE-AI-GUIDE.md`：独立 AI 指南。
- `scone-ui/package.json`：包元数据。

## 仓库开发验证

以下命令只适用于维护 `scone-ui` 仓库本身；调用方应用不需要执行这些命令。

```sh
pnpm install
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

## 许可证

Apache-2.0
