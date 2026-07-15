---
title: SconeSeparator
sidebar_position: 20
---

# SconeSeparator

视觉和语义分隔。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSeparator` |
| 分类 | 布局 |
| 导入 | `import { SconeSeparator } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSeparator } from "scone-ui";
import type { SconeSeparatorProps } from "scone-ui";
```

## 使用

视觉和语义分隔。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                         | 说明       |
| ------------- | ---------------------------- | ---------- |
| `orientation` | `"horizontal" \| "vertical"` | 分隔方向。 |
| `decorative`  | `boolean`                    | 是否装饰。 |
| `className`   | `string`                     | 样式。     |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
