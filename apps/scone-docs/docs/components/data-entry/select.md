---
title: SconeSelect
sidebar_position: 20
---

# SconeSelect

单值选项选择。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSelect` |
| 分类 | 数据录入 |
| 导入 | `import { SconeSelect } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSelect } from "scone-ui";
import type { SconeSelectProps } from "scone-ui";
```

## 使用

单值选项选择。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                      | 说明                                     |
| ------------------------ | ------------------------- | ---------------------------------------- |
| `value` / `defaultValue` | `string`                  | 受控或非受控值。                         |
| `options`                | `SconeOption&lt;string&gt;[]`   | 简化选项 API。                           |
| `onValueChange`          | `(value: string) => void` | 值变化。                                 |
| `placeholder`            | `string`                  | 占位。                                   |
| `allowClear`             | `boolean`                 | 清空。                                   |
| `onClear`                | `() => void`              | 用户点击清空。                           |
| `open` / `defaultOpen`   | `boolean`                 | 下拉打开状态。                           |
| `onOpenChange`           | `(open: boolean) => void` | 下拉打开变化。                           |
| `disabled`               | `boolean`                 | 禁用。                                   |
| `readOnly`               | `boolean`                 | 只读，仅允许查看当前值，不打开选项列表。 |
| `size`                   | `"sm" \| "md" \| "lg"`    | 控件尺寸。                               |
| `ariaLabel`              | `string`                  | 无可见 label 时必填。                    |
| `className`              | `string`                  | 样式。                                   |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
