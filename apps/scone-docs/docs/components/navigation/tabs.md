---
title: SconeTabs
sidebar_position: 20
---

# SconeTabs

局部视图切换。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTabs` |
| 分类 | 导航 |
| 导入 | `import { SconeTabs } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTabs } from "scone-ui";
import type { SconeTabsProps } from "scone-ui";
```

## 使用

局部视图切换。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                             | 说明                  |
| ------------------------ | -------------------------------- | --------------------- |
| `value` / `defaultValue` | `string`                         | 当前 tab。            |
| `onValueChange`          | `(value: string) => void`        | 切换回调。            |
| `orientation`            | `"horizontal" \| "vertical"`     | 方向。                |
| `activationMode`         | `"automatic" \| "manual"`        | 激活方式。            |
| `items`                  | `SconeOption&lt;string&gt;[]`          | 简单场景 helper。     |
| `ariaLabel`              | `string`                         | 无可见 label 时必填。 |
| `children`               | `ReactNode`                      | compound parts。      |
| `className`              | `string`                         | 样式。                |
| root HTML props          | `HTMLAttributes&lt;HTMLDivElement&gt;` | 透传到 root DOM。     |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
