---
title: SconeSearchInput
sidebar_position: 20
---

# SconeSearchInput

搜索输入和显式查询提交。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSearchInput` |
| 分类 | 数据录入 |
| 导入 | `import { SconeSearchInput } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSearchInput } from "scone-ui";
import type { SconeSearchInputProps } from "scone-ui";
```

## 使用

搜索输入和显式查询提交。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                      | 说明                   |
| ------------------------ | ------------------------- | ---------------------- |
| `value` / `defaultValue` | `string`                  | 搜索文本。             |
| `onValueChange`          | `(value: string) => void` | 文本变化。             |
| `onSearch`               | `(value: string) => void` | 用户明确触发搜索。     |
| `placeholder`            | `string`                  | 输入对象提示。         |
| `allowClear`             | `boolean`                 | 是否允许清空。         |
| `onClear`                | `() => void`              | 用户点击清空按钮。     |
| `loading`                | `boolean`                 | 搜索提交或结果加载中。 |
| `size`                   | `"sm" \| "md" \| "lg"`    | 控件尺寸。             |
| `ariaLabel`              | `string`                  | 无可见 label 时必填。  |
| `className`              | `string`                  | 样式。                 |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
