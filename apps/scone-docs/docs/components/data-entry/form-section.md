---
title: SconeFormSection
sidebar_position: 20
---

# SconeFormSection

表单区块。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeFormSection` |
| 分类 | 数据录入 |
| 导入 | `import { SconeFormSection } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeFormSection } from "scone-ui";
import type { SconeFormSectionProps } from "scone-ui";
```

## 使用

表单区块。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型        | 说明           |
| ------------- | ----------- | -------------- |
| `title`       | `ReactNode` | 分区标题。     |
| `description` | `ReactNode` | 分区说明。     |
| `actions`     | `ReactNode` | 分区右侧操作。 |
| `children`    | `ReactNode` | 字段内容。     |
| `className`   | `string`    | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
