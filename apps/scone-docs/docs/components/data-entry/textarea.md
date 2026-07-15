---
title: SconeTextArea
sidebar_position: 20
---

# SconeTextArea

多行文本输入。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTextArea` |
| 分类 | 数据录入 |
| 导入 | `import { SconeTextArea } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTextArea } from "scone-ui";
import type { SconeTextAreaProps } from "scone-ui";
```

## 使用

多行文本输入。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                                                | 说明              |
| ------------------------ | --------------------------------------------------- | ----------------- |
| `value` / `defaultValue` | `string`                                            | 文本值。          |
| `onValueChange`          | `(value: string) => void`                           | 值变化。          |
| `rows`                   | `number`                                            | 默认行数。        |
| `autoSize`               | `boolean \| { minRows?: number; maxRows?: number }` | 自动高度。        |
| `maxLength`              | `number`                                            | 最大长度。        |
| `showCount`              | `boolean`                                           | 是否显示字数。    |
| `disabled`               | `boolean`                                           | 禁用。            |
| `readOnly`               | `boolean`                                           | 只读。            |
| `ariaLabel`              | `string`                                            | 无 label 时必填。 |
| `className`              | `string`                                            | 样式。            |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
