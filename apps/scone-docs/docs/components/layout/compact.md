---
title: SconeCompact
sidebar_position: 20
---

# SconeCompact

紧凑组合控件。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeCompact` |
| 分类 | 布局 |
| 导入 | `import { SconeCompact } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeCompact } from "scone-ui";
import type { SconeCompactProps } from "scone-ui";
```

## 使用

紧凑组合控件。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                         | 说明                        |
| ------------- | ---------------------------- | --------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | 排列方向，默认 horizontal。 |
| `size`        | `"sm" \| "md"`               | 子项协调尺寸。              |
| `children`    | `ReactNode`                  | 子项。                      |
| `className`   | `string`                     | 样式。                      |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
