---
title: SconeTooltip
sidebar_position: 20
---

# SconeTooltip

短辅助提示。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTooltip` |
| 分类 | 导航 |
| 导入 | `import { SconeTooltip } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTooltip } from "scone-ui";
import type { SconeTooltipProps } from "scone-ui";
```

## 使用

短辅助提示。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                   | 类型                                     | 说明           |
| ---------------------- | ---------------------------------------- | -------------- |
| `content`              | `ReactNode`                              | 短提示内容。   |
| `children`             | `ReactNode`                              | 触发元素。     |
| `open` / `defaultOpen` | `boolean`                                | 打开状态。     |
| `onOpenChange`         | `(open: boolean) => void`                | 打开状态变化。 |
| `side`                 | `"top" \| "right" \| "bottom" \| "left"` | 出现方向。     |
| `delay`                | `number`                                 | 出现延迟。     |
| `className`            | `string`                                 | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
