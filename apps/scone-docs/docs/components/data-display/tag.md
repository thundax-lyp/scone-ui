---
title: SconeTag
sidebar_position: 20
---

# SconeTag

标签和分类标记。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTag` |
| 分类 | 数据展示 |
| 导入 | `import { SconeTag } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTag } from "scone-ui";
import type { SconeTagProps } from "scone-ui";
```

## 使用

标签和分类标记。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型         | 说明           |
| ----------- | ------------ | -------------- |
| `tone`      | SconeTone    | 语义色。       |
| `closable`  | `boolean`    | 是否可关闭。   |
| `onClose`   | `() => void` | 用户关闭标签。 |
| `children`  | `ReactNode`  | 标签文本。     |
| `className` | `string`     | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
