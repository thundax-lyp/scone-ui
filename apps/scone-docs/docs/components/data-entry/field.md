---
title: SconeField
sidebar_position: 20
---

# SconeField

标签、控件、说明和错误消息关联。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeField` |
| 分类 | 数据录入 |
| 导入 | `import { SconeField } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeField } from "scone-ui";
import type { SconeFieldProps } from "scone-ui";
```

## 使用

标签、控件、说明和错误消息关联。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型        | 说明                              |
| ------------- | ----------- | --------------------------------- |
| `name`        | `string`    | 字段名，用于 adapter 或 id 生成。 |
| `id`          | `string`    | 显式字段 id。                     |
| `label`       | `ReactNode` | 字段 label。                      |
| `description` | `ReactNode` | 说明。                            |
| `message`     | `ReactNode` | 错误或提示。                      |
| `invalid`     | `boolean`   | 校验错误状态。                    |
| `required`    | `boolean`   | 必填。                            |
| `disabled`    | `boolean`   | 禁用。                            |
| `readOnly`    | `boolean`   | 只读。                            |
| `hidden`      | `boolean`   | 隐藏字段区域。                    |
| `children`    | `ReactNode` | Control。                         |
| `className`   | `string`    | 样式。                            |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
