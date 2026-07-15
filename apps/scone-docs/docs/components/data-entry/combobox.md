---
title: SconeCombobox
sidebar_position: 20
---

# SconeCombobox

大量选项的搜索选择。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeCombobox` |
| 分类 | 数据录入 |
| 导入 | `import { SconeCombobox } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeCombobox } from "scone-ui";
import type { SconeComboboxProps } from "scone-ui";
```

## 使用

大量选项的搜索选择。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                             | 说明                    |
| ------------------------ | -------------------------------- | ----------------------- |
| `options`                | `SconeOption&lt;string&gt;[]`          | 本地选项。              |
| `value` / `defaultValue` | `string`                         | 当前值。                |
| `onValueChange`          | `(value: string) => void`        | 值变化。                |
| `searchValue`            | `string`                         | 受控搜索文本。          |
| `defaultSearchValue`     | `string`                         | 默认搜索文本。          |
| `onSearchChange`         | `(value: string) => void`        | 搜索文本变化。          |
| `open` / `defaultOpen`   | `boolean`                        | 浮层打开状态。          |
| `onOpenChange`           | `(open: boolean) => void`        | 浮层打开变化。          |
| `onClear`                | `() => void`                     | 清空当前值。            |
| `loading`                | `boolean`                        | 选项加载中。            |
| `renderEmpty`            | `ReactNode \| (() => ReactNode)` | 无匹配结果。            |
| `placeholder`            | `string`                         | 占位文本。              |
| `disabled` / `readOnly`  | `boolean`                        | 禁用或只读。            |
| `invalid`                | `boolean`                        | 与 Field 错误状态联动。 |
| `ariaLabel`              | `string`                         | 无可见 label 时必填。   |
| `children`               | `ReactNode`                      | 可选 compound 内容。    |
| `className`              | `string`                         | 样式。                  |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
