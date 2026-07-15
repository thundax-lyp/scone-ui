---
title: SconeForm
sidebar_position: 20
---

# SconeForm

表单语义容器。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeForm` |
| 分类 | 数据录入 |
| 导入 | `import { SconeForm } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeForm } from "scone-ui";
import type { SconeFormProps } from "scone-ui";
```

## 使用

表单语义容器。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop           | 类型                                      | 说明                                  |
| -------------- | ----------------------------------------- | ------------------------------------- |
| `onSubmit`     | `React.FormEventHandler&lt;HTMLFormElement&gt;` | 原生 submit 或 adapter 映射后的提交。 |
| `onReset`      | `React.FormEventHandler&lt;HTMLFormElement&gt;` | 原生 reset 或 adapter 映射后的重置。  |
| `id`           | `string`                                  | 表单 id，用于外部按钮关联。           |
| `noValidate`   | `boolean`                                 | 是否关闭原生校验。                    |
| `layout`       | `"vertical" \| "horizontal" \| "inline"`  | 表单布局。                            |
| `disabled`     | `boolean`                                 | 表单级禁用，可传播给字段。            |
| `readOnly`     | `boolean`                                 | 表单级只读，可传播给字段。            |
| `requiredMark` | `boolean \| "optional"`                   | 必填标记策略。                        |
| `children`     | `ReactNode`                               | Field、FieldGroup、FormSection 等。   |
| `className`    | `string`                                  | 样式。                                |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
