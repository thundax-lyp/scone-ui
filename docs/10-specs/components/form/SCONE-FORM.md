# SconeForm

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

表单语义容器。

| Prop           | 类型                                     | 说明                                  |
| -------------- | ---------------------------------------- | ------------------------------------- |
| `onSubmit`     | `React.FormEventHandler<HTMLFormElement>` | 原生 submit 或 adapter 映射后的提交。 |
| `onReset`      | `React.FormEventHandler<HTMLFormElement>` | 原生 reset 或 adapter 映射后的重置。  |
| `id`           | `string`                                 | 表单 id，用于外部按钮关联。            |
| `noValidate`   | `boolean`                                | 是否关闭原生校验。                     |
| `layout`       | `"vertical" \| "horizontal" \| "inline"` | 表单布局。                            |
| `disabled`     | `boolean`                                | 表单级禁用，可传播给字段。            |
| `readOnly`     | `boolean`                                | 表单级只读，可传播给字段。            |
| `requiredMark` | `boolean \| "optional"`                  | 必填标记策略。                        |
| `children`     | `ReactNode`                              | Field、FieldGroup、FormSection 等。   |
| `className`    | `string`                                 | 样式。                                |

## Usage

- 表单提交语义、布局和表单级 disabled/readOnly 使用 Form。
- 字段 label、说明、错误消息使用 Field，不直接放在 Form 上。

## Rules

- Form 不承载页面标题，标题使用 PageHeader 或 Section。
- `layout="inline"` 只用于 FilterBar 或紧凑筛选，不用于复杂编辑表单。
- 提交 loading、错误聚合和脏状态由调用方或 adapter 控制。
