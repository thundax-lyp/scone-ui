# scone-ui

`scone-ui` 是面向后台管理界面的 React + Tailwind CSS 组件库。

它提供可复用的表单、数据展示、布局、反馈浮层、导航、媒体组件，以及后台页面 Pattern。它不是应用框架：路由、请求、权限、校验 schema、业务字段规则和产品文案都应留在调用方应用中。

## 安装

```sh
pnpm add scone-ui
```

`react` 和 `react-dom` 是 peer dependencies：

```sh
pnpm add react react-dom
```

## 样式

在应用入口或组件预览入口引入一次包样式：

```tsx
import "scone-ui/styles.css";
```

`styles.css` 包含组件所需的主题变量、Tailwind 配置入口、shadcn 动画支持和 Geist 字体导入。

## 快速使用

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

只从包根入口导入公共组件、Pattern、service、hook、helper 和类型：

```tsx
import { DataTable, SconeButton, SconeDrawer, SconeTable } from "scone-ui";
import type { SconeButtonProps, SconeTableColumn } from "scone-ui";
```

不要导入内部 shadcn/Radix primitive、源码路径或未导出的子路径：

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
import { Button } from "shadcn/ui";
```

## AI 读取顺序

AI、IDE Agent 或代码生成器应按此顺序理解本包：

1. `scone-ui/dist/index.d.ts`：当前安装版本的 props、类型和导出权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界、wrapper 规则和 AI 生成规则。
3. `scone-ui/docs/10-specs/FOUNDATIONS-SPEC.md`：共享类型、状态、尺寸、密度和可访问性词汇。
4. `scone-ui/docs/10-specs/COMPONENT-*.md` 与 `ADMIN-PATTERNS-SPEC.md`：补充组件语义和组合规则。

当 README、AI Guide、SPEC 与 `dist/index.d.ts` 不一致时，以当前安装包的 `dist/index.d.ts` 为准。

## 组件选择

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

精确 props、事件名、类型泛型和 compound component parts 以 `dist/index.d.ts` 为准。

## 包内文档

发布包包含以下文档入口：

- `scone-ui/PACKAGE-AI-GUIDE.md`：面向 AI 和调用方的独立使用指南。
- `scone-ui/docs/10-specs/`：组件规格、Pattern 规格、Recipe 和共享类型说明。

这些是包级 API 参考。仓库内部设计文档、RUNBOOK、TODO、PR 记录和源码路径不是发布包 API。

## Package Exports

- `scone-ui`：JS/CJS runtime 和 TypeScript declarations。
- `scone-ui/styles.css`：组件样式入口。
- `scone-ui/PACKAGE-AI-GUIDE.md`：独立 AI/调用方指南。
- `scone-ui/package.json`：包元数据。

## 开发验证

```sh
pnpm install
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

## License

Apache-2.0
