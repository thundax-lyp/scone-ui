---
title: SconeNumberInput
sidebar_position: 20
---

# SconeNumberInput

精确数字输入。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeNumberInput` |
| 分类 | 数据录入 |
| 导入 | `import { SconeNumberInput } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeNumberInput } from "scone-ui";
import type { SconeNumberInputProps } from "scone-ui";
```

## 使用

精确数字输入。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                              | 说明                                    |
| ------------------------ | --------------------------------- | --------------------------------------- |
| `value` / `defaultValue` | `number \| null`                  | 当前数值。                              |
| `onValueChange`          | `(value: number \| null) => void` | 数值变化。                              |
| `onValueCommit`          | `(value: number \| null) => void` | blur、Enter 或 stepper 完成后的提交值。 |
| `min` / `max`            | `number`                          | 数值范围。                              |
| `step`                   | `number`                          | 步进。                                  |
| `precision`              | `number`                          | 小数位约束。                            |
| `prefix` / `suffix`      | `ReactNode`                       | 单位或辅助符号。                        |
| `disabled` / `readOnly`  | `boolean`                         | 禁用或只读。                            |
| `invalid`                | `boolean`                         | 错误状态。                              |
| `ariaLabel`              | `string`                          | 可访问名称。                            |
| `className`              | `string`                          | 样式。                                  |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
