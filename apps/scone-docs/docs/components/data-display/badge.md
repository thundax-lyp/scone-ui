---
title: SconeBadge
sidebar_position: 20
---

# SconeBadge

状态点、计数和提示徽标。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeBadge` |
| 分类 | 数据展示 |
| 导入 | `import { SconeBadge } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeBadge } from "scone-ui";
import type { SconeBadgeProps } from "scone-ui";
```

## 使用

状态点、计数和提示徽标。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型               | 说明                           |
| ----------- | ------------------ | ------------------------------ |
| `count`     | `number \| string` | 计数。                         |
| `dot`       | `boolean`          | 点状状态。                     |
| `tone`      | SconeTone          | 语义色。                       |
| `overflow`  | `number`           | 数字溢出阈值，默认由实现定义。 |
| `ariaLabel` | `string`           | 无可读文本或 dot 状态时必填。  |
| `children`  | `ReactNode`        | 被标记对象。                   |
| `className` | `string`           | 样式。                         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
