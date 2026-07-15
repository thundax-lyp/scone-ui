---
title: SconeInline
sidebar_position: 20
---

# SconeInline

水平排列内容。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeInline` |
| 分类 | 布局 |
| 导入 | `import { SconeInline } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeInline } from "scone-ui";
import type { SconeInlineProps } from "scone-ui";
```

## 使用

水平排列内容。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                  | 类型                                         | 说明                  |
| --------------------- | -------------------------------------------- | --------------------- |
| `gap`                 | SconeSpacingToken                            | 子项间距，默认 `sm`。 |
| `align`               | `"start" \| "center" \| "end" \| "baseline"` | 对齐方式。            |
| `wrap`                | `boolean`                                    | 是否换行。            |
| `split`               | `ReactNode`                                  | 可选分隔符。          |
| `children`            | `ReactNode`                                  | 子项。                |
| `className` / `style` | 通用                                         | 局部样式覆盖。        |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
