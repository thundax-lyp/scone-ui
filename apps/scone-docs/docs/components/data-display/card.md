---
title: SconeCard
sidebar_position: 20
---

# SconeCard

独立分组展示。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeCard` |
| 分类 | 数据展示 |
| 导入 | `import { SconeCard } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeCard } from "scone-ui";
import type { SconeCardProps } from "scone-ui";
```

## 使用

独立分组展示。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                  | 说明           |
| ------------- | ------------------------------------- | -------------- |
| `title`       | `ReactNode`                           | 标题。         |
| `description` | `ReactNode`                           | 说明。         |
| `actions`     | `ReactNode`                           | 标题右侧操作。 |
| `footer`      | `ReactNode`                           | 底部区域。     |
| `loading`     | `boolean`                             | 局部加载。     |
| `variant`     | `"plain" \| "outlined" \| "elevated"` | 视觉容器变体。 |
| `children`    | `ReactNode`                           | 内容。         |
| `className`   | `string`                              | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
