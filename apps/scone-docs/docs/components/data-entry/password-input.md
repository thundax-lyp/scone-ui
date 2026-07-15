---
title: SconePasswordInput
sidebar_position: 20
---

# SconePasswordInput

密码输入与可见性切换。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconePasswordInput` |
| 分类 | 数据录入 |
| 导入 | `import { SconePasswordInput } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconePasswordInput } from "scone-ui";
import type { SconePasswordInputProps } from "scone-ui";
```

## 使用

密码输入与可见性切换。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                         | 类型                         | 说明                  |
| ---------------------------- | ---------------------------- | --------------------- |
| `value` / `defaultValue`     | `string`                     | 密码值。              |
| `onValueChange`              | `(value: string) => void`    | 值变化。              |
| `visible` / `defaultVisible` | `boolean`                    | 密码是否可见。        |
| `onVisibleChange`            | `(visible: boolean) => void` | 可见状态变化。        |
| `placeholder`                | `string`                     | 占位说明。            |
| `autoComplete`               | `string`                     | 原生自动完成策略。    |
| `visibilityToggle`           | `boolean`                    | 是否允许显示/隐藏。   |
| `disabled`                   | `boolean`                    | 禁用。                |
| `readOnly`                   | `boolean`                    | 只读。                |
| `size`                       | `"sm" \| "md" \| "lg"`       | 控件尺寸。            |
| `ariaLabel`                  | `string`                     | 无可见 label 时必填。 |
| `className`                  | `string`                     | 样式。                |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
