---
title: SconeRadioGroup
sidebar_position: 20
---

# SconeRadioGroup

互斥选项组。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeRadioGroup` |
| 分类 | 数据录入 |
| 导入 | `import { SconeRadioGroup } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeRadioGroup } from "scone-ui";
import type { SconeRadioGroupProps } from "scone-ui";
```

## 使用

互斥选项组。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                         | 说明         |
| ------------------------ | ---------------------------- | ------------ |
| `options`                | `SconeOption&lt;string&gt;[]`      | 选项。       |
| `value` / `defaultValue` | `string`                     | 当前值。     |
| `onValueChange`          | `(value: string) => void`    | 状态变化。   |
| `orientation`            | `"horizontal" \| "vertical"` | 排列方向。   |
| `disabled`               | `boolean`                    | 整组禁用。   |
| `ariaLabel`              | `string`                     | 可访问名称。 |
| `className`              | `string`                     | 样式。       |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
