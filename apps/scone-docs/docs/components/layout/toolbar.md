---
title: SconeToolbar
sidebar_position: 20
---

# SconeToolbar

组织工具栏空间。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeToolbar` |
| 分类 | 布局 |
| 导入 | `import { SconeToolbar } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeToolbar } from "scone-ui";
import type { SconeToolbarProps } from "scone-ui";
```

## 使用

组织工具栏空间。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型                     | 说明                                           |
| ----------- | ------------------------ | ---------------------------------------------- |
| `start`     | `ReactNode`              | 左侧内容，通常是筛选摘要、标题补充或批量状态。 |
| `end`       | `ReactNode`              | 右侧操作，通常是按钮组或更多操作。             |
| `children`  | `ReactNode`              | 完全自定义内容。                               |
| `density`   | `"compact" \| "default"` | 工具栏信息密度。                               |
| `className` | `string`                 | 样式。                                         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
