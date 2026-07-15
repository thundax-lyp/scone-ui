---
title: SconeInput
sidebar_position: 20
---

# SconeInput

单行文本输入。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeInput` |
| 分类 | 数据录入 |
| 导入 | `import { SconeInput } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeInput } from "scone-ui";
import type { SconeInputProps } from "scone-ui";
```

## 使用

单行文本输入。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                                       | 说明                  |
| ------------------------ | ------------------------------------------ | --------------------- |
| `value` / `defaultValue` | `string`                                   | 受控或非受控值。      |
| `onValueChange`          | `(value: string) => void`                  | 值变化。              |
| `onChange`               | React.ChangeEventHandler&lt;HTMLInputElement&gt; | 可选原生事件透传。    |
| `placeholder`            | `string`                                   | 占位说明。            |
| `allowClear`             | `boolean`                                  | 清空按钮。            |
| `onClear`                | `() => void`                               | 用户点击清空按钮。    |
| `disabled`               | `boolean`                                  | 禁用。                |
| `readOnly`               | `boolean`                                  | 只读。                |
| `prefix` / `suffix`      | `ReactNode`                                | 装饰或辅助元素。      |
| `size`                   | `"sm" \| "md" \| "lg"`                     | 控件尺寸。            |
| `ariaLabel`              | `string`                                   | 无可见 label 时必填。 |
| `className`              | `string`                                   | 样式。                |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
