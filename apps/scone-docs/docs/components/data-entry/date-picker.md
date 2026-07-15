---
title: SconeDatePicker
sidebar_position: 20
---

# SconeDatePicker

日期选择。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeDatePicker` |
| 分类 | 数据录入 |
| 导入 | `import { SconeDatePicker } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeDatePicker } from "scone-ui";
import type { SconeDatePickerProps } from "scone-ui";
```

## 使用

日期选择。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                            | 说明               |
| ------------------------ | ------------------------------- | ------------------ |
| `value` / `defaultValue` | `Date \| null`                  | 当前值。           |
| `onValueChange`          | `(value: Date \| null) => void` | 值变化。           |
| `open` / `defaultOpen`   | `boolean`                       | 日历浮层打开状态。 |
| `onOpenChange`           | `(open: boolean) => void`       | 日历浮层打开变化。 |
| `onClear`                | `() => void`                    | 清空当前日期。     |
| `mode`                   | `"date" \| "date-time"`         | 输入模式。         |
| `min` / `max`            | `Date`                          | 可选范围。         |
| `disabledDate`           | `(date: Date) => boolean`       | 禁用日期。         |
| `placeholder`            | `string`                        | 占位文本。         |
| `disabled` / `readOnly`  | `boolean`                       | 禁用或只读。       |
| `invalid`                | `boolean`                       | 错误状态。         |
| `ariaLabel`              | `string`                        | 可访问名称。       |
| `className`              | `string`                        | 样式。             |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
