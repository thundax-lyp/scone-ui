---
title: SconeTypography
sidebar_position: 20
---

# SconeTypography

标题、文本和段落排版能力。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTypography` |
| 分类 | 通用 / 数据展示 |
| 导入 | `import { SconeTypography } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTypography } from "scone-ui";
import type { SconeTypographyProps } from "scone-ui";
```

## 使用

标题、文本和段落排版能力。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型                                                         | 说明             |
| ----------- | ------------------------------------------------------------ | ---------------- |
| `as`        | keyof JSX.IntrinsicElements                                  | 渲染标签。       |
| `size`      | `"sm" \| "md" \| "lg"`                                       | 文本尺寸。       |
| `weight`    | `"regular" \| "medium" \| "semibold"`                        | 字重。           |
| `tone`      | `"default" \| "muted" \| "danger" \| "success" \| "warning"` | 文本语义。       |
| `truncate`  | `boolean \| number`                                          | 单行或多行截断。 |
| `children`  | `ReactNode`                                                  | 内容。           |
| `className` | `string`                                                     | 样式。           |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
