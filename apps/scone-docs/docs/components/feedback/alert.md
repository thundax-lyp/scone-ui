---
title: SconeAlert
sidebar_position: 20
---

# SconeAlert

页内警告和状态提示。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeAlert` |
| 分类 | 反馈 |
| 导入 | `import { SconeAlert } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeAlert } from "scone-ui";
import type { SconeAlertProps } from "scone-ui";
```

## 使用

页内警告和状态提示。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型        | 说明                       |
| ------------- | ----------- | -------------------------- |
| `tone`        | SconeTone   | 语义色。                   |
| `title`       | `ReactNode` | 标题。                     |
| `description` | `ReactNode` | 说明。                     |
| `icon`        | `ReactNode` | 图标。                     |
| `action`      | `ReactNode` | 与提示直接相关的单个操作。 |
| `role`        | `AriaRole`  | 覆盖默认播报语义。         |
| `className`   | `string`    | 样式。                     |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
