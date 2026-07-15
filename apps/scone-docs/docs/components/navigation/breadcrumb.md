---
title: SconeBreadcrumb
sidebar_position: 20
---

# SconeBreadcrumb

展示当前位置路径。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeBreadcrumb` |
| 分类 | 导航 |
| 导入 | `import { SconeBreadcrumb } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeBreadcrumb } from "scone-ui";
import type { SconeBreadcrumbProps } from "scone-ui";
```

## 使用

展示当前位置路径。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                  | 说明         |
| ------------- | ------------------------------------- | ------------ |
| `items`       | `SconeBreadcrumbItem[]`               | 路径项。     |
| `separator`   | `ReactNode`                           | 分隔符。     |
| `maxItems`    | `number`                              | 折叠阈值。   |
| `onItemClick` | `(item: SconeBreadcrumbItem) => void` | 点击路径项。 |
| `ariaLabel`   | `string`                              | 可访问名称。 |
| `className`   | `string`                              | 样式。       |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
