---
title: SconeTimeline
sidebar_position: 20
---

# SconeTimeline

事件时间线。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTimeline` |
| 分类 | 数据展示 |
| 导入 | `import { SconeTimeline } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTimeline } from "scone-ui";
import type { SconeTimelineProps } from "scone-ui";
```

## 使用

事件时间线。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                | 说明           |
| ------------- | ----------------------------------- | -------------- |
| `items`       | `SconeTimelineItem[]`               | 时间线项。     |
| `pending`     | `ReactNode`                         | 进行中项。     |
| `reverse`     | `boolean`                           | 是否倒序。     |
| `onItemClick` | `(item: SconeTimelineItem) => void` | 点击时间线项。 |
| `className`   | `string`                            | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
