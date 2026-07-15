---
title: SconeAccordion
sidebar_position: 20
---

# SconeAccordion

多区域折叠。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeAccordion` |
| 分类 | 导航 |
| 导入 | `import { SconeAccordion } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeAccordion } from "scone-ui";
import type { SconeAccordionProps } from "scone-ui";
```

## 使用

多区域折叠。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                                  | 说明         |
| ------------------------ | ------------------------------------- | ------------ |
| `type`                   | `"single" \| "multiple"`              | 展开模式。   |
| `value` / `defaultValue` | `string \| string[]`                  | 当前展开。   |
| `onValueChange`          | `(value: string \| string[]) => void` | 变化回调。   |
| `collapsible`            | `boolean`                             | 单项可收起。 |
| `items`                  | `SconeAccordionItem[]`                | 简单项。     |
| `className`              | `string`                              | 样式。       |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
